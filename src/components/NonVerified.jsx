import { sendEmailVerification } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";

const NonVerified = ({ user }) => {
  return (
    <div>
      <h2>Email Sent!</h2>
      <h3>
        If the email didn't arrive in your inbox, please check your spam folder.
        If not, please send it
      </h3>
      <Button
        onClick={async function () {
          await sendEmailVerification(user);
        }}
      >
        Again clicking here
      </Button>
      {console.log(user)}
    </div>
  );
};

export default NonVerified;
