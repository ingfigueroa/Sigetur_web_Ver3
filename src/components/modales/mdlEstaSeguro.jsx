import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import InputGroup from "react-bootstrap/InputGroup";

const mdlEstaSeguro = ({
  show,
  handleClose,
  mensajetitulo,
  mensajecuerpo,
  enviaralpadre,
}) => {
  const [seleccionoSI, setSeleccionoSI] = useState(false);

  const seleccionarSi = () => {
    enviaralpadre(true);
    handleClose(); // Envía el id al componente padre
  };

  const seleccionarNO = () => {
    enviaralpadre(false);
    handleClose(); // Envía el id al componente padre
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#ffc107 ", color: "black" }}
      >
        <Modal.Title>{mensajetitulo}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#6c757d", color: "white" }}
              >
                <span dangerouslySetInnerHTML={{ __html: mensajecuerpo }} />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={seleccionarSi}>
          SI
        </Button>
        <Button variant="secondary" onClick={seleccionarNO}>
          NO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlEstaSeguro;
