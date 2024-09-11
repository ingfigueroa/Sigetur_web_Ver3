import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const mdlAnular = ({show, handleClose, enviarAlPadre, mensaje}) => {



  const seleccionarSi = () => {
    enviarAlPadre();
    handleClose() // Envía el id al componente padre
  };
  
  return (
    <Modal show={show} onHide={(handleClose)} centered>
        <Modal.Header closeButton style={{backgroundColor: 'white', color: 'white'}}>
          <Modal.Title>Transacción en proceso</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center', color: 'black'}}>
         

          <strong>{mensaje}</strong>
         
            
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={seleccionarSi}>
          Sí
        </Button>
      </Modal.Footer>
      </Modal>
  );
}; 

export default mdlAnular;
