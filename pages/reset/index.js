import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { Form, Button } from "react-bootstrap";
import baseUrl from "../../utils/client/baseUrl";
import axios from "axios";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  //TODO ADD SUCCESS ALERT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormLoading(true);

    try {
      await axios.post(`${baseUrl}/api/reset`, { email });
      setEmailChecked(true);
    } catch (err) {
      alert(err);
    }

    setFormLoading(false);
  };

  return (
    <>
      <div className={styles.background}></div>

      <div className={styles.container} style={{ paddingTop: "9rem" }}>
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
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Reset;
