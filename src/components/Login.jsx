import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import firebaseApp from "../credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect, //metodo para redireccionar a la pagina para acceder
  GoogleAuthProvider, //proovedor de ingreso que usa siginwithRedirect
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    let user;
    if (isRegistering) {
      user = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      user = await signInWithEmailAndPassword(auth, email, password);
    }
    console.log(user);
  };
  const signInWithGoogle = async () => {
    return await signInWithRedirect(auth, googleProvider);
  };
  return (
    <Container>
      <Stack gap={3}>
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Form>
        <Button
          onClick={() => {
            setIsRegistering(!isRegistering);
          }}
          variant="primary"
          type="submit"
          className="bg-dark"
        >
          {isRegistering
            ? "Do you alread have an account ? Login!"
            : "Don't you have an account ? Register!"}
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Login with Google
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
