import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const mdlmensaje = ({ show, handleClose, modalMessage }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#ae2029", color: "white" }}
      >
        <Modal.Title>INFORMACIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center", color: "Black" }}>
        {modalMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlmensaje;
