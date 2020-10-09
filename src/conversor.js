import React, {useState} from "react";
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

import ListarMoedas from "./ListarMoedas"

function Conversor() {

  const [valor, setValor] = useState(1)
  const [moedaDe, setMoedaDe] = useState('BRL')
  const [moedaPara, setMoedaPara] = useState('USD')
  const [spinner, setPinner] = useState(false)
  const [formValidado, setFormValidado] = useState(false)

  function handleValor(event){
    const {value} = event.target
    return !isNaN(value) ? setValor(value) : setValor(valor)
  }

  function handleMoedaDe(event){
    const {value} = event.target
    return setMoedaDe(value)
  }

  function handleMoedaPara(event){
    const {value} = event.target
    return setMoedaPara(value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormValidado(true)
    if(event.currentTarget.checkValidity() === true){
      alert(process.env.REACT_APP_NOT_SECRET_CODE)
    }
  }

  return (
    <Container>
      <h1 className="text-center">Conversor de Moedas</h1>
      <Alert variant="danger" show={false} className="text-center">
        Erro ao realizar a conversão
      </Alert>
      <Jumbotron>
        <Form onSubmit={handleSubmit} noValidate validated={formValidado}>
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0" value={valor} onChange={handleValor} required />
            </Col>
            <Col sm="3">
              <Form.Control 
                as="select"
                value={moedaDe}
                onChange={handleMoedaDe}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
            <Form.Control 
                as="select"
                value={moedaPara}
                onChange={handleMoedaPara}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <span className={spinner ? null : "hidden"}><Spinner animation="border" size="sm" /></span>
                <span className={spinner ? "hidden" : null}>Converter</span>
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
