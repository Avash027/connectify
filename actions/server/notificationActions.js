const UserModel = require("../../models/UserModel");
const NotificationModel = require("../../models/NotificationModel");

const setNotificationToUnread = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user.unreadNotifcation) {
      user.unreadNotification = true;
      await user.save();
    }

    return;
  } catch (e) {
    console.error(e);
  }
};

const newLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    const userToNotify = await NotificationModel.findOne({
      user: userToNotifyId,
    });

    const newNotification = {
      type: "newLike",
      user: userId,
      post: postId,
      date: Date.now(),
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
  } catch (e) {
    console.error(e);
  }
};

const removeLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newLike",
            user: userId,
            post: postId,
          },
        },
      }
    );
    return;
  } catch (e) {
    console.error(e);
  }
};

const newCommentNotification = async (
  postId,
  commentId,
  userId,
  userToNotifyId,
  text
) => {
  try {
    const userToNotify = await NotificationModel.findOne({
      user: userToNotifyId,
    });

    const newNotification = {
      type: "newComment",
      user: userId,
      post: postId,
      commentId,
      text,
      date: Date.now(),
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
  } catch (e) {
    console.error(e);
  }
};

const removeCommentNotification = async (
  postId,
  commentId,
  userId,
  userToNotifyId
) => {
  try {
    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newComment",
            user: userId,
            post: postId,
            commentId: commentId,
          },
        },
      }
    );
    return;
  } catch (e) {
    console.error(e);
  }
};

const newFollowerNotification = async (userId, userToNotifyId) => {
  try {
    const userToNotify = await NotificationModel.findOne({
      user: userToNotifyId,
    });

    const newNotification = {
      type: "newFollower",
      user: userId,
      date: Date.now(),
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
  } catch (e) {
    console.error(e);
  }
};

const removeFollowerNotification = async (userId, userToNotifyId) => {
  try {
    await NotificationModel.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: "newFollower",
            user: userId,
          },
        },
      }
    );
    return;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  newLikeNotification,
  removeLikeNotification,
  newCommentNotification,
  removeCommentNotification,
  newFollowerNotification,
  removeFollowerNotification,
};
