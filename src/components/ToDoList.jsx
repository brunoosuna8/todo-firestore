import React from "react";
import { Stack, Button, Col, Container, Row } from "react-bootstrap";

const ToDoList = ({ arrayTodos }) => {
  return (
    <Container>
      <Stack>
        {arrayTodos?.map((todo, index) => {
          return (
            <div key={index}>
              <Row>
                <Col>{todo.description}</Col>
                <Col>
                  <Button>See File</Button>
                </Col>
                <Col>
                  <Button>Delete</Button>
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
