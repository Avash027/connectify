import { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Toast,
  Spinner,
} from "react-bootstrap";
import {
  container,
  header,
  background,
  signUpText,
} from "../styles/Login.module.css";

import { loginUser } from "../actions/client/authUser";

const login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    await loginUser(user, setError);
    setFormLoading(false);
  };

  return (
    <>
      <div className={background}>
        {" "}
        <Toast
          className="p-3"
          position="top-left"
          bg="light"
          onClose={() => setError(null)}
          delay={3000}
          autohide
          show={error !== null}
        >
          <Toast.Header>
            <strong className="me-auto">Connectify</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </div>
      <div className={container}>
        <h3 className={header}>Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </InputGroup.Text>
            </InputGroup>
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
        <div className={signUpText}>
          Dont have an account? <a href="/signup">Sign up instead</a>
        </div>
        <div className={signUpText}>
          <a href="/reset">Forgot password ? </a>
          <br></br>
          <p>Test email: test@gmail.com</p>
          <p>Password : test123</p>
        </div>
      </div>
    </>
  );
};

export default login;
