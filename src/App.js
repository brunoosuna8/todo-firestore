import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import firebaseApp from "./credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
const auth = getAuth(firebaseApp);
function App() {
  let [globalUser, setGlobalUser] = useState(null);
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log(firebaseUser);
          setGlobalUser(firebaseUser);
          setUserEmail(firebaseUser.email);

          let userNickName;
          firebaseUser.displayName
            ? (userNickName = firebaseUser.displayName)
            : (userNickName = firebaseUser.email.split("@")[0]);
          setUserName(userNickName);
        } else {
          setGlobalUser(null);
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {globalUser ? (
        <Home name={userName} email={globalUser.email} user={globalUser} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
