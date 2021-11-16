import { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import {
  container,
  header,
  background,
  signUpText,
} from "../styles/Login.module.css";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={background}></div>
      <div className={container}>
        <h3 className={header}>Login</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
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
                show
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

export default login;
