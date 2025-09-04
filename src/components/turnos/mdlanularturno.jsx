import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";

const mdlanularturno = ({ show, handleClose, enviarAlPadre, fila }) => {
  const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Está seguro de ANULAR un TURNO ya asignado?"
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "TURNOS - ANULAR un TURNO"
  );

  const [observaciones, SetObservaciones] = useState(null);

  const fechaLarga = format(
    new Date(fila.fecha),
    "EEEE, d 'de' MMMM 'de' yyyy",
    { locale: es }
  );

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar
      enviarAlPadre(observaciones);

      handleClose();
    } else {
      console.log("Usuario canceló la operación");
    }
  };

  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
   
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#ab0308", color: "white" }}
        >
          <Modal.Title>TURNO - ANULAR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h1> </h1>
            </div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#b0c4de", color: "black" }}
                >
                  ¿Realmente quiere ANULAR el turno con el siguiente detalle?
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Estado:
                </InputGroup.Text>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  value={fila.estado}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Fecha:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fechaLarga}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Hora:
                </InputGroup.Text>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fila.desde}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Paciente:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fila.apenompaciente}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Obra social:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fila.os}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Profesional:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fila.apenomprof}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Servicio:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value={fila.servicio}
                  style={{ backgroundColor: "#d5dbdb" }}
                />
              </InputGroup>
            </div>
          </div>
          <hr />
          <div>
            <InputGroup>
              <InputGroup.Text
                style={{ backgroundColor: "#b0c4de", color: "black" }}
              >
                ¿Desea agregar un comentario u observación?
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onChange={(e) => SetObservaciones(e.target.value.toUpperCase())}
                value={observaciones}
              />
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowMDLEstaSeguro(true)}>
            Aplicar
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={setShowMDLEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo={mdlMensajeCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}
    </>
  );
};

export default mdlanularturno;
