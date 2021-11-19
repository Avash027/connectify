import { useState, useEffect } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import cookie from "js-cookie";

import { FollowerPlaceHolder } from "../../utils/client/PlaceHolderGroup";
import { unfollowUser, followUser } from "../../actions/client/profileAction";

const FollowingModal = ({
  showFollowingModal,
  setShowFollowingModal,
  profileUserId,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/following/${profileUserId}`,
          { headers: { Authorization: cookie.get("token") } }
        );

        setFollowing(res.data);
      } catch (error) {
        alert(error);
      }

      setLoading(false);
    };

    getFollowing();
  }, []);

  const handleClick = async (isFollowing, ListUserId) => {
    setFollowLoading(ListUserId);
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
      show={showFollowingModal}
      size="lg"
      onHide={() => setShowFollowingModal(false)}
    >
      <Modal.Header closeButton>
        <strong>Following</strong>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <FollowerPlaceHolder />
        ) : following.length > 0 ? (
          following.map((following) => {
            const isFollowing =
              loggedUserFollowStats.following.length > 0 &&
              loggedUserFollowStats.following.filter(
                (curfollowing) => curfollowing.user === following.user._id
              ).length > 0;

            //TODO FIX CSS BUG IN THE DIV
            return (
              <div
                style={{
                  display: "flex",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={following.user._id}
                direction="horizontal"
              >
                <Image
                  src={following.user.profilePicUrl}
                  roundedCircle
                  style={{ height: "40px" }}
                ></Image>

                <div>
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href={`/${following.user.username}`}
                  >
                    {following.user.username}
                  </a>
                </div>

                {following.user._id !== user._id ? (
                  <Button
                    onClick={() => handleClick(isFollowing, following.user._id)}
                    disabled={followLoading === following.user._id}
                    variant={isFollowing ? "outline-dark" : "primary"}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                ) : (
                  <div></div>
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

export default FollowingModal;
