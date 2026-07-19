import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import * as tz from "date-fns-tz";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { turnosService } from "/src/services/turnos.service";
import "/src/css/personalizar-modales.css";

const mdlturnodetalle_Ver1 = ({ show, handleClose, idturno }) => {
  const [FechaLarga, SetFechaLarga] = useState(null);
  const [Items, setItems] = useState({});
  const [prestacionesItems, setPrestacionesItems] = useState([]);
  const [sobreTurno, setSobreTurno] = useState(null);
  const [loading, setLoading] = useState(true);

  
  
 useEffect(() => {
  if (!idturno) return;

  async function fetchDataTurno() {
    try {
      setLoading(true);

      const response = await turnosService.TurnoIDDetalle(idturno);

      setItems(response.turno);
      setPrestacionesItems(response.prestaciones);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchDataTurno();
}, [idturno]); 
/* 
useEffect(() => {
  if (!idturno) return;

  setPrestacionesItems([]);

  async function getTurnoIDPrestaciones() {
    try {
      const data = await turnosService.TurnoIDPrestaciones(idturno);
      setPrestacionesItems(data || []);
    } catch (error) {
      console.error(error);
      setPrestacionesItems([]);
    }
  }

  getTurnoIDPrestaciones();
}, [idturno]);
 */
useEffect(() => {
    if (Items?.fecha) {
        SetFechaLarga(handleFechaChange(Items.fecha));
        
    }

 
}, [Items]);

  const handleFechaChange = (fecha) => {
    const fechaISO = fecha;

    // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
    const fechaObj = new Date(fechaISO);

    // Ajustar la fecha al UTC manualmente
    const fechaLocal = new Date(
      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
    );

    // Formatear usando toLocaleString o date-fns como prefieras
    const fechaLarga = fechaLocal.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return fechaLarga;
  };
  if (loading) {
    return ;
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="personalizar-modales"
      centered
    >
      <Modal.Header
        closeButton 
        style={{
         backgroundColor: "#198754",
          color: "white",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Modal.Title>TURNO - DETALLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div style={{ width: "100%" }}>
  <h1
    style={{ fontSize: "30px", color: "#044f82", textAlign: "center" }}
  >
    {Items?.estado || ""}
  </h1>

  {Items?.sobre && (
    <p
      style={{
        fontSize: "20px",
        color: "red",
        textAlign: "center",
        margin: 0
      }}
    >
      SOBRETURNO
    </p>
  )}
</div>

        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              backgroundColor: "white",
              textAlign: "center",
              width: "50%",
            }}
          >
            <h1 style={{ fontSize: "35px", color: "#044f82" }}>
              {Items?.hora || ""}
            </h1>
            <h1 style={{ fontSize: "15px", color: "#044f82" }}>{FechaLarga}</h1>
          </div>
          <div
            style={{
              fontSize: "12px",
              textAlign: "left",
              color: "#044f82",
              width: "50%",
              marginTop: "20px",
            }}
          >
            <div style={{ width: "100%", display: "grid" }}>
              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Paciente"
                  variant="outline-secondary"
                  style={{ height: "50px" }}
                >
                  <i className="fa-solid fa-hospital-user"></i>
                </Button>
                <Form.Control
                  as="textarea"
                  readOnly
                  rows={2}
                  style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "50px",
                    fontWeight: "bold"
                  }}
                  value={
                    Items?.paciente
                      ? `${Items.paciente}\n${Items.nroDoc}`
                      : ""
                  }
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Profesional"
                  variant="outline-secondary"
                  style={{ height: "50px" }}
                >
                  <i className="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  as="textarea"
                  readOnly
                  rows={2}
                  style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "50px",
                    fontWeight: "bold"
                  }}
                  value={
                    Items?.paciente
                      ? `${Items.profesional}\n${Items.servicio}`
                      : ""
                  }
                />
              </InputGroup>

             

              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Obra Social"
                  variant="outline-secondary"
                  style={{ height: "50px" }}
                >
                  <i className="fa-solid fa-house-medical-flag"></i>
                </Button>
                <Form.Control
                  readOnly
                 style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "50px",
                    fontWeight: "bold"
                  }}
                  value={Items?.obrasocial || ""}
                />
              </InputGroup>
            </div>
          </div>
        </div>

 <div style={{ width: "100%", marginTop: "0px" }}>
          <h4 style={{ textAlign: "left" }}>Observaciones</h4>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              readOnly
              style={{ textAlign: "left", fontSize: "12px", height: "60px" }}
              value={Items?.observaciones || ""}
            />
          </InputGroup>


        </div>

        <div style={{ width: "100%", marginTop: "0px" }}>
          <h4 style={{ textAlign: "left" }}>Prestaciones cargadas</h4>
             <Table striped bordered hover size="sm">
            <thead style={{ fontWeight: "normal" }}>
              <tr className="">
                <th style={{ textAlign: "center",  width: "200px", fontWeight: "normal" }}>Prestación</th>
                <th style={{ textAlign: "center", fontWeight: "normal"  }}>Observaciones</th>
                <th style={{ textAlign: "center", fontWeight: "normal"  }}>Precio</th>
                <th style={{ textAlign: "center", fontWeight: "normal"  }}>Cobrar paciente</th>
                <th style={{ textAlign: "center", fontWeight: "normal"  }}>Cobrar obra social</th>
              </tr>
            </thead>
            <tbody>
              {prestacionesItems?.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.prestacion}
                  </td>
                  
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.observaciones}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.costo}
                  </td>
                   <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.cobrarapaciente}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.cobraraobrasocial}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}
        style={{backgroundColor: "#198754"}}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlturnodetalle_Ver1;
