import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { Form, Button, Alert, Toast, Spinner } from "react-bootstrap";
import baseUrl from "../../utils/client/baseUrl";
import logErrors from "../../utils/client/logErrors";
import axios from "axios";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [error, setError] = useState(null);

  //TODO ADD SUCCESS ALERT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormLoading(true);

    try {
      await axios.post(`${baseUrl}/api/reset`, { email });
      setEmailChecked(true);
    } catch (err) {
      setError(logErrors(err));
    }

    setFormLoading(false);
  };

  return (
    <>
      <div className={styles.background}>
        <Toast
          show={error !== null}
          onClose={() => setError(null)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <span
              className="fas fa-times-circle"
              style={{ color: "red", marginRight: "1rem" }}
            ></span>{" "}
            An error occured
          </Toast.Header>

          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </div>

      <div className={styles.container} style={{ paddingTop: "6rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Reset password
        </h2>
        {emailChecked ? (
          <Alert variant="success">
            <span
              className="fas fa-check-circle"
              style={{ color: "darkgreen", marginRight: "1rem" }}
            ></span>{" "}
            An email has been sent
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ width: "100%", marginTop: "3rem" }}
              variant="primary"
              type="submit"
              disabled={formLoading}
            >
              {formLoading ? (
                <>
                  {" "}
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading..{" "}
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        )}
      </div>
    </>
  );
};

export default Reset;
