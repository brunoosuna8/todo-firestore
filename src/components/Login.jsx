import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import firebaseApp from "../credentials";
import handleErrors from "../utils/handleErrors.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect, //metodo para redireccionar a la pagina para acceder
  GoogleAuthProvider, //proovedor de ingreso que usa siginwithRedirect
  sendEmailVerification,
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const Login = ({ setEmailVerified, emailverified }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [msg, setMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    let userCredential;
    // const verify = async (user) => {
    //   if (user && user.emailVerified === false) {
    //     await sendEmailVerification(user);
    //     console.log("Email verification sent!");
    //   }
    // };
    try {
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential.user);
      }

      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        console.log("Email verification sent!");
      }
    } catch (error) {
      let res = handleErrors(error.message);
      setMsg(res);
      console.log(msg);
    }
  };
  const signInWithGoogle = async () => {
    return await signInWithRedirect(auth, googleProvider);
  };
  return (
    <Container
      style={{
        width: "480px",
        border: "2px solid #3981ec",
        borderRadius: "15px",
        padding: "15px 5px",
        margin: "5px",
      }}
    >
      <Stack
        gap={3}
        className={"d-flex justify-content-center align-items-center"}
      >
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        <Form onSubmit={submitHandler}>
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

          <Button variant="primary" type="submit">
            {isRegistering ? "Register" : "Login"}
          </Button>
        </Form>
        <h3 style={{ color: "red" }}>{msg ? msg : null}</h3>
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
