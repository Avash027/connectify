import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/client/baseUrl";
import { Alert } from "react-bootstrap";
import cookie from "js-cookie";

import styles from "../styles/Notification.module.css";

import LikeNotification from "../components/Notification/LikeNotification";
import CommentNotification from "../components/Notification/CommentNotification";
import FollowNotification from "../components/Notification/FollowNotification";

const notifications = ({
  notifications,
  errorLoading,
  user,
  userFollowStats,
}) => {
  if (errorLoading) return <Alert variant="danger">Something went wrong</Alert>;

  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);

  useEffect(() => {
    const notificationRead = async () => {
      try {
        const token = cookie.get("token");
        const res = await axios.post(
          `${baseUrl}/api/notifications`,
          {},
          {
            headers: { Authorization: token },
          }
        );
      } catch (e) {
        console.error(e);
      }
    };

    notificationRead();
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        {notifications.map((notification) => (
          <div style={{ margin: "2rem" }} key={notification._id}>
            {notification.type === "newLike" && notification.post != null && (
              <LikeNotification user={user} notification={notification} />
            )}

            {notification.type === "newComment" &&
              notification.post != null && (
                <CommentNotification user={user} notification={notification} />
              )}

            {notification.type === "newFollower" && (
              <FollowNotification
                loggedUserFollowStats={loggedUserFollowStats}
                setLoggedUserFollowStats={setLoggedUserFollowStats}
                notification={notification}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token },
    });

    return { props: { notifications: res.data } };
  } catch (error) {
    console.error(error);
    return { props: { errorLoading: true } };
  }
}

export default notifications;
