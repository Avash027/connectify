const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const authMiddleware = require("../middleware/authMiddleware");
//TODO
const {
  newFollowerNotification,
  removeFollowerNotification,
} = require("../actions/server/notificationActions");

//GET PROFILE
router.get("/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (!user) return res.status(401).send("No user found");

    const profile = await ProfileModel.findOne({ user: user._id }).populate(
      "user"
    );
    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.status(201).json({
      profile,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,

      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

//Get user posts
router.get("/posts/:username", authMiddleware, async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (!user) return res.status(401).send("No user found");

    const posts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

//Get all followers

router.get("/followers/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "followers.user"
    );

    res.status(201).json(user.followers);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

//Get all following

router.get("/following/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId }).populate(
      "following.user"
    );

    res.status(201).json(user.following);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

//Follow a user

router.post("/follow/:userToFollowId", authMiddleware, async (req, res) => {
  const { userId } = req;
  const { userToFollowId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });

    if (!user || !userToFollow) return res.status(404).send("User not found");

    const isAlreadyFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToFollowId
      ).length > 0;

    if (isAlreadyFollowing) return res.status(401).send("User already follows");

    await user.following.unshift({ user: userToFollowId });
    await user.save();

    await userToFollow.followers.unshift({ user: userId });
    await userToFollow.save();

    //TODO
    await newFollowerNotification(userId, userToFollowId);

    return res.status(201).send("Success");
  } catch (e) {
    console.error(e);
    res.status(501).send("Internal server error");
  }
});

//Unfollow a user
router.put("/unfollow/:userToUnFollowId", authMiddleware, async (req, res) => {
  const { userId } = req;
  const { userToUnFollowId } = req.params;

  try {
    const user = await FollowerModel.findOne({ user: userId });
    const userToUnFollow = await FollowerModel.findOne({
      user: userToUnFollowId,
    });

    if (!user || !userToUnFollow) return res.status(404).send("User not found");

    const isAlreadyFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToUnFollowId
      ).length > 0;

    if (!isAlreadyFollowing)
      return res.status(401).send("User is not following");

    const removeFollowing = user.following
      .map((following) => following.user.toString())
      .indexOf(userToUnFollowId);

    await user.following.splice(removeFollowing, 1);
    await user.save();

    const removeFollowers = userToUnFollow.followers
      .map((follower) => follower.user.toString())
      .indexOf(userId);

    await userToUnFollow.followers.splice(removeFollowers, 1);
    await userToUnFollow.save();

    await removeFollowerNotification(userId, userToUnFollowId);

    return res.status(200).send("Success");
  } catch (e) {
    console.error(e);
    res.status(501).send("Internal server error");
  }
});

//update profile
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const { bio, profilePicUrl, name } = req.body;

    let profileField = {
      user: userId,
      bio,
    };

    await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: profileField },
      { new: true }
    );

    const user = await UserModel.findById(userId);
    if (profilePicUrl) {
      user.profilePicUrl = profilePicUrl;
    }
    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).send("success");
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

//update password

router.post("/settings/password", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(userId).select("+password");

    const isPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isPassword) return res.status(401).send("Invalid password");

    if (newPassword.length < 6)
      return res.status(401).send("Password must be atleast 6 character");

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(201).send("Updated");
  } catch (e) {
    console.error(e);
    res.status(501).send("Internal server error");
  }
});

module.exports = router;
