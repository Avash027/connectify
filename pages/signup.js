import { useState, useEffect } from "react";
import axios from "axios";
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
} from "../styles/Signup.module.css";
import baseUrl from "../utils/client/baseUrl";
import { registerUser } from "../actions/client/authUser";

let cancel;

const signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Make form disabled
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState("");
  const [usernameLoading, setusernameLoading] = useState(false);
  const [usernameAvailable, setusernameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    await registerUser(user, setError, setFormLoading);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkUserName = async () => {
    setusernameLoading(true);
    try {
      cancel && cancel();

      const { CancelToken } = axios;

      const res = await axios.get(`${baseUrl}/api/auth/username/${username}`, {
        cancelToken: new CancelToken((canceler) => (cancel = canceler)),
      });
      if (res.data === "Available") {
        setusernameAvailable(true);
        if (errorMessage === "User Name not available") setErrorMessage(null);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (err) {
      setErrorMessage("User Name not available");
      setusernameAvailable(false);
    }
    setusernameLoading(false);
  };

  useEffect(() => {
    if (username === "") setusernameAvailable(false);
    else checkUserName();
  }, [username]);

  return (
    <>
      <div className={background}>
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
        <h3 className={header}>Singup</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
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
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Username"
                type="text"
                value={username}
                isInvalid={
                  !usernameAvailable &&
                  !usernameLoading &&
                  username.length !== 0
                }
                onChange={(e) => setusername(e.target.value)}
              />
              <InputGroup.Text>
                {usernameLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : usernameAvailable ? (
                  <i
                    className="fas fa-check-circle"
                    style={{ color: "green" }}
                  ></i>
                ) : (
                  <i
                    className="far fa-times-circle"
                    style={{ color: "red" }}
                  ></i>
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
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
            style={{ width: "100%" }}
            variant="primary"
            type="submit"
            loading={formLoading}
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
          Already have an account a account ?{" "}
          <a href="/login">Log in instead</a>
        </div>
      </div>
    </>
  );
};

export default signup;
