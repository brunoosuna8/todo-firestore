import React, { useEffect } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
import { useState } from "react";
import firebaseApp from "../credentials";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
const firestore = getFirestore(firebaseApp);

const AddToDo = ({ email, arrayTodos, setUserTasks }) => {
  const [newTask, setNewTask] = useState("");
  const addTask = async (e) => {
    e.preventDefault();

    const docRef = doc(firestore, `users/${email}`);
    const newId = uuidv4();
    let newArray = [...arrayTodos, { description: newTask, id: newId }];
    updateDoc(docRef, { tasks: [...newArray] });
    setUserTasks(newArray);
    setNewTask("");
  };
  const handleChange = (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };
  return (
    <Container>
      <Form onSubmit={(e) => addTask(e)}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="My new task is..."
              value={newTask}
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col>
            <Button type="submit" disabled={newTask === "" ? true : false}>
              Add ToDo
            </Button>
          </Col>
        </Row>
        <hr />
      </Form>
    </Container>
  );
};

export default AddToDo;
