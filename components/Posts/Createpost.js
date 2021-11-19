import { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

import { submitNewPost } from "../../actions/client/postActions";
import uploadPic from "../../utils/client/uploadImage";

const Createpost = ({ show, setShowModal, setPosts, modalPictureUpload }) => {
  const intputRef = useRef();

  const [newPost, setNewPost] = useState({
    text: "",
    location: "",
  });
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    let picUrl;

    picUrl = await uploadPic(media);
    if (!picUrl) {
      setloading(false);
      return setError("Error uploading image");
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setMedia(null);
    setMediaPreview(null);

    setloading(false);
    setShowModal(false);
  };

  useEffect(() => {
    if (error !== null) setTimeout(() => setError(null), 3000);
  }, [error]);

  return (
    <Modal show={show} centered onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>An interesting post !!</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
              placeholder="Caption"
              name="text"
              value={newPost.text}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="location"
              name="location"
              value={newPost.location}
              onChange={handleChange}
            />
          </Form.Group>

          <div
            className={modalPictureUpload}
            onClick={() => intputRef.current.click()}
            style={{ backgroundColor: highlighted ? "blue" : "white" }}
          >
            {media === null ? (
              <Button variant="secondary">Browse Image</Button>
            ) : (
              <img
                style={{ height: "20rem", width: "100%", borderRadius: "5px" }}
                src={mediaPreview}
              ></img>
            )}
          </div>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", marginTop: "2rem" }}
              disabled={newPost.text === "" || loading || media === null}
            >
              {loading ? "Loading" : "Post"}
            </Button>
          </Form.Group>
        </Form>

        {error !== null && (
          <Alert variant="danger" style={{ marginTop: "1rem" }}>
            {error}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Createpost;
