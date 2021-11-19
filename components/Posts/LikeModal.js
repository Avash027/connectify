import { useState, useEffect } from "react";
import { Modal, Placeholder, Stack, Image } from "react-bootstrap";
import { getLikes } from "../../actions/client/postActions";

export default function LikeModal({
  showLikeModal,
  setShowLikeModal,
  postId,
  likes,
}) {
  const [loading, setLoading] = useState(true);
  const [likesList, setLikesList] = useState(likes);

  useEffect(() => {
    const getlikesUtil = async () => {
      await getLikes(postId, setLikesList, setLoading);
    };
    getlikesUtil();
  }, []);

  if (loading) {
    return (
      <Modal
        centered
        show={showLikeModal}
        onHide={() => setShowLikeModal(false)}
      >
        {[5, 2, 3].map((elem) => (
          <Placeholder
            animation="glow"
            style={{ marginTop: "2rem", marginLeft: "2rem" }}
            xs={elem}
          />
        ))}
      </Modal>
    );
  } else
    return (
      <Modal
        scrollable
        show={showLikeModal}
        onHide={() => setShowLikeModal(false)}
      >
        <Modal.Header closeButton>Likes</Modal.Header>
        <Modal.Body>
          {likesList.length > 0 &&
            likesList.map((like, index) => (
              <Stack
                direction="horizontal"
                gap={2}
                key={index}
                style={{ marginBottom: "1rem" }}
              >
                <Image
                  src={like.user.profilePicUrl}
                  roundedCircle
                  style={{ height: "40px" }}
                />
                <a
                  href={`/${like.user.username}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {like.user.username}
                </a>
              </Stack>
            ))}
        </Modal.Body>
      </Modal>
    );
}
