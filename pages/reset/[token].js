import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import baseUrl from "../../utils/client/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "../../styles/Login.module.css";

//TODO Create error alerts
const ResetToken = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { field1, field2 } = newPassword;

  const handleChange = (e) => {
    const { name, value } = e;

    console.log(name, value);

    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (field1 !== field2) throw new Error("Password do not match");

      await axios.post(`${baseUrl}/api/reset/token`, {
        password: field1,
        token: router.query.token,
      });

      setSuccess(true);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.background}></div>

      <div className={styles.container} style={{ paddingTop: "5rem" }}>
        {success && (
          <Alert variant="success">
            Password change successful
            <Alert.Link href="/login">Sing in</Alert.Link>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="field1"
              value={field1}
              onChange={(e) =>
                setNewPassword((prev) => ({
                  ...newPassword,
                  field1: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              name="field2"
              value={field2}
              onChange={(e) =>
                setNewPassword((prev) => ({
                  ...newPassword,
                  field2: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Button
            style={{ width: "100%", marginTop: "3rem" }}
            variant="primary"
            type="submit"
            disabled={loading || field1 === "" || field2 === ""}
          >
            Change password
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ResetToken;
