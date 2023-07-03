import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import firebaseApp from "./credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);
function App() {
  let [globalUser, setGlobalUser] = useState(null);
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
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
  });

  return (
    <div>
      {globalUser ? (
        <Home name={userName} email={globalUser.email} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
