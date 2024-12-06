import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import { turnosService } from "/src/services/turnos.service";
import modalSINo from "../modales/mdlSiNO";

const mdlanulartodoslosturnos = ({
  show,
  handleClose,
  fecha,
  idprofesional,
  idusuario,
  apeynom,
  vienede,
  observaciones,
}) => {
  /* const [observaciones, SetObservaciones] = useState(null); */

  const [fechaForm, setFechaForm] = useState(fecha);

  const [mdlEstaSeguro, setMDLEstaSeguro] = useState(null);

  const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Está seguro de ANULAR los turnos?"
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "TURNOS - ANULAR por pedido del profesional"
  );

  const desactivarOpciones = ["pizarraturnos", "otraOpcion"];

  const handleFechaChange = (e) => {

    setFechaForm(e.target.value);
    
  };

  useEffect(() => {
     // Esto se ejecuta cuando `fechaForm` se actualiza
  }, [fechaForm]);

  const openMdlSiNo = () => {
    setMDLSiNo(true);
  };

  const closeMdlSiNo = () => {
    setMDLSiNo(false);
  };



  async function anularTurnos(sino) {

    if (sino) {


      const data = await turnosService.TurnosAnularPorPedidoProfesional(
        idprofesional,
        observaciones,
        fechaForm,
        idusuario
      );

    }
    handleClose;
    
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#ab0308",
            color: "white",
          }}
        >
          <Modal.Title style={{ textAlign: "center" }}>
            ANULAR TODOS LOS TURNOS DEL DÍA
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div>
              <h1> </h1>
            </div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ color: "black", width: "10%" }}>
                  Profesional:
                </InputGroup.Text>
                <InputGroup.Text
                  style={{
                    width: "90%",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {apeynom}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ color: "black", width: "10%" }}>
                  Fecha:
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar profesional"
                  aria-label="Buscar profesional"
                  aria-describedby="basic-addon2"
                  type="date"
                  onChange={handleFechaChange}
                  value={fechaForm}
                  disabled={desactivarOpciones.includes(vienede)} // Desactivado si `vieneDe` está en `desactivarOpciones`
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ width: "100%", color: "black", textAlign: "center" }}
                >
                  Por pedido del profesional se anulan los turnos con la fecha
                  indicada.
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <hr />
          <div>
            <InputGroup>
              <InputGroup.Text
                style={{ backgroundColor: "#b0c4de", color: "black" }}
              >
                Observaciones:
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
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              setMDLEstaSeguro(true);
            }}
          >
            APLICAR
          </Button>
          <Button variant="primary" onClick={handleClose}>
            CERRAR
          </Button>
        </Modal.Footer>
      </Modal>

      {mdlEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlSiNo}
          handleClose={handleClose}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo= {mdlMensajeCuerpo}
          enviaralpadre={anularTurnos}
       
        />
      )}
    </>
  );
};

export default mdlanulartodoslosturnos;
