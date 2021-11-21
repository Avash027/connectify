import { useState, useRef } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { profileUpdate } from "../../actions/client/profileAction";
import uploadPic from "../../utils/client/uploadImage";

const EditModal = ({ user, showEditModal, setShowEditModal }) => {
  const intputRef = useRef();

  const [bio, setBio] = useState(user.bio);
  const [name, setName] = useState(user.name);
  const [media, setMedia] = useState(user.profilePicUrl);
  const [mediaPreview, setMediaPreview] = useState(user.profilePicUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async () => {
    if (media === null) return setError("No image found");

    const res = await uploadPic(media);

    if (!res) return setError("Error uploading image");

    await profileUpdate(bio, name, setLoading, setError, res);
  };

  return (
    <Modal centered show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>Edit Changes</Modal.Header>
      <Modal.Body>
        <Form>
          <input
            type="file"
            style="image/*"
            ref={intputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
          />
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="textArea"
              placeholder="Bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>

          <div
            onClick={() => intputRef.current.click()}
            style={{
              height: "20rem",
              width: "20rem",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            {media === null ? (
              <Button variant="secondary">Browse Image</Button>
            ) : (
              <img
                style={{
                  height: "20rem",
                  width: "100%",
                  borderRadius: "50%",
                  marginLeft: "4rem",
                }}
                src={mediaPreview}
              ></img>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => setShowEditModal(false)}
        >
          Go back
        </Button>
        <Button disabled={loading} variant="primary" onClick={handleSubmit}>
          {loading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" />
              Loading...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
