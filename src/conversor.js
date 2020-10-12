import React, { useState } from 'react';
import './conversor.css';
import {
  Jumbotron,
  Button,
  Container,
  Form,
  Col,
  Spinner,
  Alert,
  Modal,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

import ListarMoedas from './ListarMoedas';

function Conversor() {
  const [valor, setValor] = useState(1);
  const [moedaDe, setMoedaDe] = useState('BRL');
  const [moedaPara, setMoedaPara] = useState('USD');
  const [spinner, setPinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState('');
  const [exibirMsgErro, setExibirMsgErro] = useState(false);

  const FIXER_URL =
    'http://data.fixer.io/api/latest?access_key=dfa106e6d00b0cf9028b46fd0033919b';

  function handleValor(event) {
    const { value } = event.target;
    return !isNaN(value) ? setValor(value) : setValor(valor);
  }

  function handleMoedaDe(event) {
    const { value } = event.target;
    return setMoedaDe(value);
  }

  function handleMoedaPara(event) {
    const { value } = event.target;
    return setMoedaPara(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormValidado(true);
    setPinner(true);
    setExibirMsgErro(false);
    if (event.currentTarget.checkValidity() === true) {
      return Axios.get(FIXER_URL)
        .then((res) => {
          const cotacao = obterCotacao(res.data);
          if (cotacao) {
            setResultadoConversao(
              `${valor} ${moedaDe} = ${cotacao} ${moedaPara}`
            );
            setPinner(false);
            return setExibirModal(true);
          }
          return exibirErro();
        })
        .catch((e) => exibirErro());
    } else {
      return null;
    }
  }

  function obterCotacao(props) {
    if (!props || props.success !== true) return false;
    const cotacaoDe = props.rates[moedaDe];
    const cotacaoPara = props.rates[moedaPara];
    const cotacao = (1 / cotacaoDe) * cotacaoPara * valor;
    return cotacao.toFixed(2);
  }

  function exibirErro() {
    setExibirMsgErro(true);
    setPinner(false);
  }

  function handleFecharModal() {
    setValor('1');
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setPinner(false);
    return setExibirModal(false);
  }

  return (
    <Container>
      <h1 className="text-center">Conversor de Moedas</h1>
      <Alert variant="danger" show={exibirMsgErro} className="text-center">
        Erro ao realizar a conversão
      </Alert>
      <Jumbotron>
        <Form onSubmit={handleSubmit} noValidate validated={formValidado}>
          <Form.Row>
            <Col sm="3">
              <Form.Control
                placeholder="0"
                value={valor}
                onChange={handleValor}
                required
              />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={moedaDe}
                onChange={handleMoedaDe}
              >
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={moedaPara}
                onChange={handleMoedaPara}
              >
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <span className={spinner ? null : 'hidden'}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={spinner ? 'hidden' : null}>Converter</span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conversor de Moedas</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultadoConversao}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Nova Conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </Container>
  );
}

export default Conversor;
