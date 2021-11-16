import { useState } from "react";

import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import {
  container,
  header,
  background,
  signUpText,
} from "../styles/Signup.module.css";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={background}></div>
      <div className={container}>
        <h3 className={header}>Singup</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="email" placeholder="Full name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <InputGroup className="mb-3">
              <FormControl placeholder="Username" type="text" />
              <InputGroup.Text>
                {/* <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> */}
                {/* <i className="far fa-times-circle" style={{ color: "red" }}></i> */}
                {/* <i
                  className="fas fa-check-circle"
                  style={{ color: "green" }}
                ></i> */}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
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

          <Button style={{ width: "100%" }} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className={signUpText}>
          Dont have an account a account ? <a href="/signup">Sign up instead</a>
        </div>
      </div>
    </>
  );
};

export default signup;
