import { useState } from "react";
import styles from "../../styles/Card.module.css";

import { Toast } from "react-bootstrap";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import CardModal from "./CardModal";
import DeleteModal from "./DeleteModal";
import LikeModal from "./LikeModal";
import { likePost } from "../../actions/client/postActions";

const Card = ({ post, user, setPosts }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes);
  const [showLikeModal, setShowLikeModal] = useState(false);

  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;

  const redirectToUserPage = (username) => {
    window.location.href = `/${username}`;
  };

  return (
    <>
      <Toast
        onClose={() => setMessage(false)}
        show={message}
        delay={2000}
        autohide
      >
        <Toast.Body>
          <strong>Post deleted successfully !!</strong>
        </Toast.Body>
      </Toast>

      <CardModal
        user={user}
        post={post}
        showModal={showModal}
        setShowModal={setShowModal}
        comments={comments}
        setComments={setComments}
        setLikes={setLikes}
        isLiked={isLiked}
      ></CardModal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setshowDeleteModal={setshowDeleteModal}
        postId={post._id}
        setPosts={setPosts}
        setMessage={setMessage}
      />

      <LikeModal
        showLikeModal={showLikeModal}
        setShowLikeModal={setShowLikeModal}
        postId={post._id}
        likes={likes}
      ></LikeModal>

      <div className={styles.card}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="Profile picture"
              src={post.user.profilePicUrl}
              className={styles.profileImage}
            ></img>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => redirectToUserPage(post.user.username)}
              className={styles.headerTitle}
            >
              {post.user.username}
            </div>

            <div className={styles.headerSubtitle}>
              {post.location && "@ " + post.location}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(user.role === "root" || post.user._id === user._id) && (
              <div
                style={{ cursor: "pointer", color: "red" }}
                className="fas fa-trash-alt"
                onClick={() => setshowDeleteModal(true)}
              ></div>
            )}
          </div>
        </div>

        <div>
          <img
            alt="Post Image"
            className={styles.postImage}
            src={post.picUrl}
            onClick={() => setShowModal(true)}
          ></img>
        </div>

        <div className={styles.postCaptionContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={isLiked ? "fas fa-heart" : "far fa-heart"}
              style={{ fontSize: "2rem", color: "red", cursor: "pointer" }}
              onClick={() => likePost(post._id, user._id, setLikes, !isLiked)}
            ></div>

            <div
              style={{
                marginLeft: "1rem",
                fontWeight: "200",
                color: "green",
                cursor: "pointer",
              }}
            >
              {" "}
              {likes.length > 0 && (
                <div onClick={() => setShowLikeModal(true)}>
                  {likes.length} {likes.length > 1 ? "Likes" : "Like"}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "10px" }}>
            <strong
              style={{ cursor: "pointer" }}
              onClick={() => redirectToUserPage(post.user.username)}
            >
              {post.user.username}
            </strong>
            {"    "}{" "}
            <p style={{ marginLeft: "10px", fontWeight: "200" }}>{post.text}</p>
          </div>

          <hr />

          {comments.length > 0 &&
            comments.map(
              (comment, idx) =>
                idx < 2 && (
                  <Comment
                    comment={comment}
                    user={user}
                    key={comment._id}
                    setComments={setComments}
                    postId={post._id}
                  ></Comment>
                )
            )}

          {comments.length === 0 && <p>Be the first one to comment</p>}
        </div>
        <CommentInput user={user} postId={post._id} setComments={setComments} />
      </div>
    </>
  );
};

export default Card;
