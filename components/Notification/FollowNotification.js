import { useState } from "react";
import { Stack, Image, Button, Spinner } from "react-bootstrap";
import { followUser, unfollowUser } from "../../actions/client/profileAction";

const FollowNotification = ({
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  notification,
}) => {
  const [disabled, setDisabled] = useState(false);
  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === notification.user._id
    ).length > 0;

  const handleClick = async () => {
    setDisabled(true);
    try {
      if (isFollowing)
        await unfollowUser(notification.user._id, setLoggedUserFollowStats);
      else await followUser(notification.user._id, setLoggedUserFollowStats);
    } catch (error) {
      console.error(error);
    }
    setDisabled(false);
  };

  return (
    <Stack direction="horizontal">
      <Image
        src={notification.user.profilePicUrl}
        roundedCircle
        style={{ height: "1.5rem", marginRight: "1rem" }}
      ></Image>
      <div>
        <strong>{notification.user.username}</strong> followed you
      </div>
      <Button
        className="border ms-auto"
        disabled={disabled}
        variant={isFollowing ? "outline-danger" : "primary"}
        onClick={handleClick}
      >
        {disabled ? (
          <>
            <Spinner animation="grow" size="sm" as="span"></Spinner>Loading..
          </>
        ) : isFollowing ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </Button>
    </Stack>
  );
};

export default FollowNotification;
