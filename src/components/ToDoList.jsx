import React, { useState } from "react";
import { Stack, Button, Col, Container, Row } from "react-bootstrap";
import firebaseApp from "../credentials";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);
const ToDoList = ({ userEmail, arrayTodos, setUserTasks }) => {
  const deleteTask = async (idTask) => {
    let newArray = arrayTodos.filter((e) => e.id !== idTask);
    const docRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docRef, { tasks: [...newArray] });
    setUserTasks(newArray);
  };
  return (
    <Container>
      <Stack>
        {arrayTodos?.map((todo, index) => {
          return (
            <div key={index}>
              <Row>
                <Col>{todo.description}</Col>

                <Col>
                  <Button onClick={() => deleteTask(todo.id)}>Delete</Button>
                </Col>
              </Row>
              <hr />
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ToDoList;
