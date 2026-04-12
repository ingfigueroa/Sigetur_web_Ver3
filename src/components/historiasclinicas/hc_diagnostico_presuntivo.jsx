import React, { useState } from "react";
import { Form, Card, Row, Button, Table } from "react-bootstrap";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";
import AbrirMDLMensaje from "../modales/mdlMensaje";

import { historiaclinicaService } from "../../services/historiaclinica.service";

import {formatearFechaLargaConelAnio} from "../utils/fecha"

function DiagnosticoPresuntivo({ data, idpaciente, idprofesional, idusuario }) {
  console.log(data);
  const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Desea grabar el diágnostico?",
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "HISTORIA CLINICA - DIAGNOSTICO- IMPRESION CLINICA",
  );

  const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const [diagnostico, setDiagnostico] = useState("");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
  };

  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
    //setShowMDLMensaje(true)
  };

  async function grabarDiagnostico() {
    try {
      const data = await historiaclinicaService.CreateHCDiagnostico(
        idpaciente,
        idprofesional,
        idusuario,
        diagnostico,
      );

      setMensaje("Se dió de alta el diagnostico.");
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      console.log("por error");

      return;
    }
  }

  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar

      closeMdlEstaSeguro();

      grabarDiagnostico();
      setMensaje("Se grabó el diágnostico del paciente.");
      openMdlMensaje();
    } else {
      setMensaje("Se canceló la grabación del diánostico del paciente.");
      openMdlMensaje();
    }
  };

  return (
    <>
      <Card>
        <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
          <Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="success"
                style={{
                  height: "26px", // más alto
                  fontSize: "10px", // texto más grande
                  padding: "0px 20px", // más espacio interno
                  whiteSpace: "nowrap",
                }}
                onClick={(event) => {
                  openMdlEstaSeguro();
                  event.preventDefault();
                }}
              >
                GRABAR - DIAGNOSTICO
              </Button>
            </div>
          </Row>

          <Form.Group>
            <hr />
            <Form.Label><strong> Historial</strong></Form.Label>
            
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Ej: Gingivitis crónica localizada en sector anterior inferior..."
              value={data[0]?.map(
                  (item) =>
                    `fecha: ${formatearFechaLargaConelAnio(item.fecha)} - Profesional: ${item.apellido} ${item.nombres}\n${item.diagnostico}
                  -------------------------------------------------------------------------------------`
                ).join("\n\n")}
              style={{ textTransform: "uppercase" }}
            />
            <hr />
            <Form.Label><strong>Diagnóstico/Impresión clínica</strong></Form.Label>
                
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Ej: Gingivitis crónica localizada en sector anterior inferior..."
              value={diagnostico}
              style={{ textTransform: "uppercase" }}
              onChange={(e) => setDiagnostico(e.target.value.toUpperCase())}
            />
          </Form.Group>
          <hr /> 
 <Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="success"
                style={{
                  height: "26px", // más alto
                  fontSize: "10px", // texto más grande
                  padding: "0px 20px", // más espacio interno
                  whiteSpace: "nowrap",
                }}
                onClick={(event) => {
                  openMdlEstaSeguro();
                  event.preventDefault();
                }}
              >
                GRABAR - DIAGNOSTICO
              </Button>
            </div>
          </Row>
        </Card.Body>
        
      </Card>
      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo={mdlMensajeCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}

      {showMDLMensaje && (
        <AbrirMDLMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mensaje}
        />
      )}
    </>
  );
}

export default DiagnosticoPresuntivo;
