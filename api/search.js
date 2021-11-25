const router = require("express").Router();
const UserModel = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:username", authMiddleware, async (req, res) => {
  try {
    const usernames = await UserModel.find({
      username: { $regex: req.params.username.toLowerCase(), $options: "i" },
    });
    res.status(201).json(usernames);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
