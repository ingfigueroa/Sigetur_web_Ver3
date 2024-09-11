import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const mdlAltaExitosa = ({show, handleClose, varMensaje, varMensajeTitulo}) => {
  if (!show) return null;
  return (
    <Modal show={show} onHide={(handleClose)} centered>
        <Modal.Header closeButton style={{backgroundColor: '#ae2029', color: 'white'}}>
          <Modal.Title>{varMensajeTitulo} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}><strong>{varMensaje}</strong></Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={(handleClose)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default mdlAltaExitosa;