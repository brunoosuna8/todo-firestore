import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import firebaseApp from "./credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";
// import "./App.css";
const auth = getAuth(firebaseApp);

function App() {
  let [globalUser, setGlobalUser] = useState(null);
  let [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log(firebaseUser);
          setGlobalUser(firebaseUser);

          let userNickName;
          firebaseUser.displayName
            ? (userNickName = firebaseUser.displayName)
            : (userNickName = firebaseUser.email.split("@")[0]);
          setUserName(userNickName);
        } else {
          setGlobalUser(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false); // Set loading to false in case of an error
      }
    });
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {loading ? (
        <Loading /> // Display the loading component while fetching user information
      ) : globalUser ? (
        <Home name={userName} email={globalUser.email} user={globalUser} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
