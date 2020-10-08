import React from "react";
import "./conversor.css";
import {
  Jumbotron,
  Button,
  Container,
  Form,
  Col,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

function Conversor() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
  }

  return (
    <Container>
      <h1 className="text-center">Conversor de Moedas</h1>
      <Alert variant="danger" show={false} className="text-center">
        Erro ao realizar a conversão
      </Alert>
      <Jumbotron>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0" value={1} required />
            </Col>
            <Col sm="3">
              <Form.Control as="select"></Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control as="select"></Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <Spinner animation="border" size="sm" />
                Converter
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Conversor de Moedas</Modal.Title>
          </Modal.Header>
          <Modal.Body>Resultado da conversão</Modal.Body>
          <Modal.Footer>
            <Button variant="success">Nova Conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </Container>
  );
}

export default Conversor;
