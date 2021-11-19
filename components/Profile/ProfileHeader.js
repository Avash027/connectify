import { useState } from "react";

import { Stack, Image, Button, Spinner } from "react-bootstrap";
import { followUser, unfollowUser } from "../../actions/client/profileAction";
import styles from "../../styles/Profile.module.css";

import FollowerModal from "./FollowerModal";
import FollowingModal from "./FollowingModal";

//TODO : when following someone it is not added to following list unless re rendered
//Please kill me

const ProfileHeader = ({
  profile,
  followersLength,
  followingLength,
  postsLength,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  ownAccount,
  user,
}) => {
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === profile.user._id
    ).length > 0;

  const followersCount = ownAccount
    ? loggedUserFollowStats.followers.length > 0
      ? loggedUserFollowStats.followers.length
      : 0
    : followersLength;

  const followingCount = ownAccount
    ? loggedUserFollowStats.following.length > 0
      ? loggedUserFollowStats.following.length
      : 0
    : followingLength;

  const handlefollowUser = async () => {
    setFollowLoading(true);
    await followUser(profile.user._id, setLoggedUserFollowStats);
    setFollowLoading(false);
  };

  const handleUnfollowUser = async () => {
    setFollowLoading(true);
    await unfollowUser(profile.user._id, setLoggedUserFollowStats);
    setFollowLoading(false);
  };

  return (
    <>
      <FollowerModal
        user={user}
        showFollowerModal={showFollowerModal}
        setShowFollowerModal={setShowFollowerModal}
        profileUserId={profile.user._id}
        loggedUserFollowStats={loggedUserFollowStats}
        setLoggedUserFollowStats={setLoggedUserFollowStats}
      />

      <FollowingModal
        user={user}
        showFollowingModal={showFollowingModal}
        setShowFollowingModal={setShowFollowingModal}
        profileUserId={profile.user._id}
        loggedUserFollowStats={loggedUserFollowStats}
        setLoggedUserFollowStats={setLoggedUserFollowStats}
      />

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={profile.user.profilePicUrl}
            className={styles.image}
            roundedCircle
          ></Image>
        </div>
        <div style={{ display: "flex" }}>
          <Stack style={{ display: "flex", justifyContent: "center" }} gap={2}>
            <h2 style={{ fontWeight: "200" }}>{profile.user.username}</h2>
            {ownAccount && (
              <Button variant="outline-dark" className={styles.button}>
                Edit Profile
              </Button>
            )}
            {!ownAccount && !isFollowing && (
              <Button
                onClick={handlefollowUser}
                disabled={followLoading}
                variant="primary"
                className={styles.button}
              >
                {followLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                    />
                    Loading...
                  </>
                ) : (
                  "Follow"
                )}
              </Button>
            )}

            {!ownAccount && isFollowing && (
              <Button
                disabled={followLoading}
                onClick={handleUnfollowUser}
                variant="outline-danger"
                className={styles.button}
              >
                {followLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                    />
                    Loading...
                  </>
                ) : (
                  "Unfollow"
                )}
              </Button>
            )}
          </Stack>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          {" "}
          <h3>{profile.user.name}</h3>
          <h5 style={{ fontWeight: "300" }}>{profile.user.bio}</h5>
        </div>
        <div></div>
      </div>

      <hr></hr>
      <div className={styles.userStats}>
        <Stack className={styles.statsTab} gap={2}>
          <strong>{postsLength}</strong>
          <p style={{ fontWeight: "200" }}>Posts</p>
        </Stack>

        <Stack className={styles.statsTab} gap={2}>
          <strong>{followersCount}</strong>
          <p
            onClick={() => setShowFollowerModal(true)}
            className={styles.link}
            style={{ fontWeight: "200" }}
          >
            Followers
          </p>
        </Stack>

        <Stack className={styles.statsTab} gap={2}>
          <strong>{followingCount}</strong>
          <p
            onClick={() => setShowFollowingModal(true)}
            className={styles.link}
            style={{ fontWeight: "200" }}
          >
            Following
          </p>
        </Stack>
      </div>
      <hr />
    </>
  );
};

export default ProfileHeader;
