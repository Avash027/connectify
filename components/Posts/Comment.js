import React from "react";

import { deleteComment } from "../../actions/client/postActions";

const Comment = ({ comment, user, setComments, postId }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      <strong>
        <a
          href={`/${comment.user.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {comment.user.username}
        </a>
      </strong>
      <div style={{ marginLeft: "10px", fontWeight: "200" }}>
        {comment.text}
      </div>
      {(user._id === comment.user._id || user.role === "root") && (
        <div
          className="fas fa-trash-alt"
          style={{
            color: "red",
            marginLeft: "20%",
            cursor: "pointer",
            position: "absolute",
            right: "0%",
          }}
          onClick={() => deleteComment(postId, comment._id, setComments)}
        ></div>
      )}
    </div>
  );
};

export default Comment;
