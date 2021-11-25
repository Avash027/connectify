const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const NotificationModel = require("../models/NotificationModel");
const UserModel = require("../models/UserModel");

//Get all user notifications
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await NotificationModel.findOne({ user: userId })
      .populate("notifications.user")
      .populate("notifications.post");

    return res.status(200).json(user.notifications);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

//Changes unread notifications to false
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await UserModel.findById(userId);

    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }

    return res.status(200).send("Updated");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
