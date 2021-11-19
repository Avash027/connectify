import { useState } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

import { postComment } from "../../actions/client/postActions";

const CommentInput = ({ postId, user, setComments }) => {
  const [comment, setComment] = useState("");

  return (
    <>
      <InputGroup>
        <FormControl
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() =>
            postComment(postId, user, comment, setComments, setComment)
          }
        >
          Post
        </Button>
      </InputGroup>
    </>
  );
};

export default CommentInput;
