import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import InputGroup from "react-bootstrap/InputGroup";

const mdlEstaSeguro = ({ show, handleClose, mensajetitulo, mensajecuerpo, enviaralpadre }) => {

  const [seleccionoSI, setSeleccionoSI] = useState(false)
  const seleccionarSi = () => {
    setSeleccionoSI(true)
    enviaralpadre(true);
    handleClose() // Envía el id al componente padre
  };

  const seleccionarNO = () => {
    setSeleccionoSI(false)
    enviaralpadre(seleccionoSI);
    handleClose() // Envía el id al componente padre
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#c91010ff ", color: "white" }}
      >
        <Modal.Title>{mensajetitulo}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#b0c4de", color: "black" }}
              >
                {mensajecuerpo}
              </InputGroup.Text>
            </InputGroup>

           
            
          </div>
        </div>
        
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={seleccionarSi}
        
        >
          SI
        </Button>
        <Button variant="success" onClick={seleccionarNO}>
          NO
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlEstaSeguro;
