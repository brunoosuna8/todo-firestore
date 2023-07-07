import React, { useEffect, useState } from "react";
import firebaseApp from "../credentials";
import { getAuth, signOut } from "firebase/auth";
import { Container, Button } from "react-bootstrap";
import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import { getFirestore, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import NonVerified from "./NonVerified";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
let fakeData = [
  { id: 1, description: "fake tarea 1" },
  { id: 2, description: "fake tarea 2" },
  { id: 3, description: "fake tarea 3" },
];

const Home = ({ name, email, user }) => {
  let [userTasks, setUserTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let tasks = await getDocOrCreateDoc(email);

      setUserTasks(tasks);
    };
    fetchData();
  }, []);

  const getDocOrCreateDoc = async (idDoc) => {
    const docuRef = doc(firestore, `users/${idDoc}`);
    // buscar documento
    const consulta = await getDoc(docuRef);
    // revisar si existe
    if (consulta.exists()) {
      // si sí existe
      const infoDocu = consulta.data();

      return infoDocu.tasks;
    } else {
      // si no existe
      await setDoc(docuRef, { tasks: [...fakeData] });
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.tasks;
    }
  };

  return (
    <>
      {user.emailVerified === true ? (
        <Container
          style={{ alignItems: "start", position: "absolute", top: "0" }}
        >
          <h1
            style={{
              padding: "10px",
            }}
          >
            Hello {name ? name : ""}
          </h1>
          {userTasks && (
            <AddToDo
              email={email}
              arrayTodos={userTasks}
              setUserTasks={setUserTasks}
            ></AddToDo>
          )}

          {userTasks ? (
            <ToDoList
              arrayTodos={userTasks}
              setUserTasks={setUserTasks}
              userEmail={email}
            ></ToDoList>
          ) : null}
          <Button
            onClick={() => {
              signOut(auth);
            }}
          >
            Sign Out
          </Button>
        </Container>
      ) : (
        <NonVerified user={user} />
      )}
    </>
  );
};

export default Home;
