import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const mdlMensajeBackend = ({show, handleClose, modalMessage}) => {

  return (
    <Modal show={show} onHide={(handleClose)} centered>
        <Modal.Header closeButton style={{backgroundColor: '#ae2029', color: 'white'}}>
          <Modal.Title>Transacción en proceso</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center', color: 'black'}}>
          <strong>{modalMessage}</strong>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={(handleClose)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  );
}; 

export default mdlMensajeBackend;