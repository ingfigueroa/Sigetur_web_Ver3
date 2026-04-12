import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MdlMensaje = ({ show, handleClose, modalMessage }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#BFD4C4", color: "Black" }}
      >
        <Modal.Title>INFORMACIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center", color: "Black" }}>
        {modalMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: "#BFD4C4 ", color: "black" }} onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MdlMensaje;
