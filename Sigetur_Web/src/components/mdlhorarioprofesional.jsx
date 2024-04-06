import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


 const mdlhorarioprofesional = ({show, handleClose}) => {
  return (
    

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Horarios profesional</Modal.Title>
      </Modal.Header>
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

export default mdlhorarioprofesional;
