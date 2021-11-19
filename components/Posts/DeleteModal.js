import { Modal, Button } from "react-bootstrap";

import { deletePost } from "../../actions/client/postActions";

export default function DeleteModal({
  showDeleteModal,
  setshowDeleteModal,
  postId,
  setPosts,
  setMessage,
}) {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setshowDeleteModal(false)}
      centered
      size="sm"
    >
      <Modal.Header closeButton>Are you sure</Modal.Header>
      <Modal.Body>Delete this post ?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setshowDeleteModal(false)}>
          Go back
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => deletePost(postId, setPosts, setMessage)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
