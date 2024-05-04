import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


 const mdlbuscarobjetos = ({show, handleClose}) => {
  return (
    

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{backgroundColor: '#0277bd', color: 'white'}}>
        <Modal.Title>Buscar....profesional</Modal.Title>
      </Modal.Header >
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlbuscarobjetos;
