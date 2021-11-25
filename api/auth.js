const router = require("express").Router();
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");
const NotificationModel = require("../models/NotificationModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

router.get("/username/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length === 0) return res.status(401).send("Invalid");
    if (!regexUserName.test(username)) return res.status(401).send("Invalid");

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) res.status(401).send("Username already taken");
    else res.status(201).send("Available");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send("Email already registered");

    user = new UserModel({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      profilePicUrl: userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileField = {
      user: user._id,
      bio: "Hello world",
    };

    await new ProfileModel(profileField).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();

    const payload = {
      userId: user._id,
    };
    await new NotificationModel({ user: user._id, notifications: [] }).save();

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid email");

  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) return res.status(401).send("Invalid credentials");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(401).send("Invalid credentials");

    const payload = {
      userId: user._id,
    };

    const notification = await NotificationModel.findOne({ user: user._id });

    if (!notification)
      await new NotificationModel({ user: user._id, notifications: [] }).save();

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);
    const userFollowStats = await FollowerModel.findOne({ user: userId });

    res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal server error");
  }
});

module.exports = router;
