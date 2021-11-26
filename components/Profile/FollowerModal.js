import { useState, useEffect } from "react";
import { Button, Image, Stack, Modal } from "react-bootstrap";
import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import cookie from "js-cookie";

import { FollowerPlaceHolder } from "../../utils/client/PlaceHolderGroup";
import { followUser, unfollowUser } from "../../actions/client/profileAction";

const FollowerModal = ({
  showFollowerModal,
  setShowFollowerModal,
  profileUserId,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followLoading, setFollowLoading] = useState("");

  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/followers/${profileUserId}`,
          { headers: { Authorization: cookie.get("token") } }
        );

        setFollowers(res.data);
      } catch (error) {
        alert(error);
      }

      setLoading(false);
    };

    getFollowers();
  }, []);

  const handleClick = async (isFollowing, ListUserId) => {
    setFollowLoading(ListUserId);
    console.log(isFollowing);
    try {
      if (isFollowing) await unfollowUser(ListUserId, setLoggedUserFollowStats);
      else await followUser(ListUserId, setLoggedUserFollowStats);
    } catch (e) {
      alert(e);
    }
    setFollowLoading("");
  };

  return (
    <Modal
      centered
      scrollable
      show={showFollowerModal}
      size="lg"
      onHide={() => setShowFollowerModal(false)}
    >
      <Modal.Header closeButton>
        <strong>Followers</strong>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <FollowerPlaceHolder />
        ) : followers.length > 0 ? (
          followers.map((follower) => {
            const isFollowing =
              loggedUserFollowStats.following.length > 0 &&
              loggedUserFollowStats.following.filter(
                (following) => following.user === follower.user._id
              ).length > 0;

            return (
              <div
                style={{
                  display: "flex",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={follower.user._id}
                direction="horizontal"
              >
                <Image
                  alt="Profile picture"
                  src={follower.user.profilePicUrl}
                  roundedCircle
                  style={{ height: "40px" }}
                ></Image>

                <div>
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href={`/${follower.user.username}`}
                  >
                    {follower.user.username}
                  </a>
                </div>

                {follower.user._id !== user._id && (
                  <Button
                    onClick={() => handleClick(isFollowing, follower.user._id)}
                    disabled={followLoading === follower.user._id}
                    variant={isFollowing ? "outline-dark" : "primary"}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ height: "100%", width: "100%", textAlign: "center" }}>
            Wow! Such empty!!
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FollowerModal;
