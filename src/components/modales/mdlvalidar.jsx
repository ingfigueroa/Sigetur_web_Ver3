import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const mdlvalidar = ({show, handleClose, modalMessage}) => {

  return (
    <Modal show={show} onHide={(handleClose)} centered>
        <Modal.Header closeButton style={{backgroundColor: '#DC3545', color: 'black'}}>
          <Modal.Title>Faltan datos requeridos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center', color: 'black'}}>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(handleClose)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  );
}; 

export default mdlvalidar;
