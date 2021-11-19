const router = require("express").Router();
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length === 0)
    return res.status(401).send("Text must be atleast 1 character");

  try {
    const newPost = {
      user: req.userId,
      text,
    };

    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new PostModel(newPost).save();

    const postCreated = await PostModel.findById(post._id).populate("user");

    return res.status(200).json(postCreated);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//This is actually explore
router.get("/feed", authMiddleware, async (req, res) => {
  const { pageNumber } = req.query;
  const number = Number(pageNumber);
  const size = 2;
  const { userId } = req;
  let posts = [];
  try {
    if (number == 1) {
      posts = await PostModel.find({})
        .limit(size)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
    } else {
      posts = await PostModel.find({})
        .skip(size * (number - 1))
        .limit(size)
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
    }

    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//This is actually feed
router.get("/explore", authMiddleware, async (req, res) => {
  const { pageNumber } = req.query;
  const number = Number(pageNumber);
  const size = 2;
  const { userId } = req;

  try {
    const loggedUser = await FollowerModel.findOne({ user: userId }).select(
      "-followers"
    );

    let posts = [];

    if (number === 1) {
      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((Following) => Following.user),
            ],
          },
        })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      } else {
        posts = await PostModel.find({ user: userId })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    } else {
      const skips = size * (number - 1);
      if (loggedUser.following.length > 0) {
        posts = await PostModel.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((Following) => Following.user),
            ],
          },
        })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      } else {
        posts = await PostModel.find({ user: userId })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("comments.user");
      }
    }

    return res.status(201).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//delete post
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);

    if (!post) return res.status(400).send("Post not found");

    const user = await UserModel.findById(userId);

    if (post.user.toString() === userId || user.role === "root") {
      await post.delete();
      return res.status(200).send("Post deleted successfully");
    }

    res.status(401).send("Unauthorized");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//like on post
router.post("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);

    if (!post) res.status(401).send("No Post Found");

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;

    if (isLiked) return res.status(401).send("Post already liked");

    await post.likes.unshift({ user: userId });

    await post.save();

    // if (post.user.toString() !== userId) {
    //   await newLikeNotification(userId, postId, post.user.toString());
    // }

    return res.status(201).send("Post liked");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//unlike a post
router.post("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);

    if (!post) res.status(401).send("No Post Found");

    const isNotLiked =
      post.likes.filter((like) => like.user.toString() === userId).length === 0;

    if (isNotLiked) return res.status(401).send("Post not liked before");

    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(userId);

    await post.likes.splice(index, 1);

    await post.save();

    // if (post.user.toString() !== userId) {
    //   await removeLikeNotification(userId, postId, post.user.toString());
    // }

    return res.status(201).send("Post unliked");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//Get all likes
router.get("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId).populate("likes.user");

    if (!post) res.status(401).send("No Post Found");

    return res.status(201).json(post.likes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//Comment on a post
router.post("/comment/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (text.length === 0)
      return res.status(401).send("Comment should be atleast one character");

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("No post found");

    const newComment = {
      text,
      user: req.userId,
      date: Date.now(),
    };

    await post.comments.unshift(newComment);
    await post.save();

    // if (post.user.toString() !== req.userId) {
    //   await newCommentNotification(
    //     postId,
    //     post.comments[0]._id.toString(),
    //     req.userId,
    //     post.user.toString(),
    //     text
    //   );
    // }

    return res.status(201).send(post.comments[0]._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//delete Comment on a post
router.delete(
  "/comment/:postId/:commentId",
  authMiddleware,
  async (req, res) => {
    try {
      const { postId, commentId } = req.params;

      const { userId } = req;

      const post = await PostModel.findById(postId);
      if (!post) return res.status(404).send("No post found");

      const comment = post.comments.find(
        (comment) => comment._id.toString() === commentId
      );

      if (!comment) return res.status(404).send("No comment found");

      const user = await UserModel.findById(userId);

      if (comment.user.toString() === userId || user.role === "root") {
        const index = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(commentId);
        await post.comments.splice(index, 1);
        await post.save();

        // if (post.user.toString() !== userId) {
        //   await removeCommentNotification(
        //     postId,
        //     commentId,
        //     userId,
        //     post.user.toString()
        //   );
        // }

        return res.status(201).send("Comment deleted");
      }

      return res.status(401).send("UnAuthorized");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
