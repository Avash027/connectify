import styles from "../../styles/Card.module.css";

import { Modal } from "react-bootstrap";

import Comment from "./Comment";
import CommentInput from "./CommentInput";

import { likePost } from "../../actions/client/postActions";

const CardModal = ({
  showModal,
  setShowModal,
  post,
  user,
  comments,
  setComments,
  setLikes,
  isLiked,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      scrollable={true}
      size="lg"
    >
      <Modal.Body>
        <div className={styles.modalContainer}>
          <div>
            <img src={post.picUrl} className={styles.modalImage}></img>
          </div>

          <div>
            <div className={styles.postCaptionContainer}>
              <div
                className={isLiked ? "fas fa-heart" : "far fa-heart"}
                style={{ fontSize: "2rem", color: "red", cursor: "pointer" }}
                onClick={() => likePost(post._id, user._id, setLikes, !isLiked)}
              ></div>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <strong>{post.user.username}</strong>
                {"    "}{" "}
                <p style={{ marginLeft: "10px", fontWeight: "200" }}>
                  {post.text}
                </p>
              </div>
            </div>

            <hr />

            <CommentInput
              user={user}
              postId={post._id}
              setComments={setComments}
            />
            <br />

            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  comment={comment}
                  user={user}
                  key={comment._id}
                  setComments={setComments}
                  postId={post._id}
                ></Comment>
              ))}

            {comments.length === 0 && <p>Be the first one to comment</p>}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CardModal;
