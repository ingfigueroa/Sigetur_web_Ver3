import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MdlMensaje = ({ show, handleClose, modalMessage }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#e6b31c", color: "Black" }}
      >
        <Modal.Title>INFORMACIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center", color: "Black" }}>
        {modalMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button   onClick={handleClose}
        style={{ backgroundColor: "#e6b31c", color: "black"}}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MdlMensaje;
