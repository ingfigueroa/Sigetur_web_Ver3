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

const asignarTurnoListadeEspera = ({
  show,
  handleClose,
  enviaralpadre,
}) => {
  const [FechaLarga, SetFechaLarga] = useState(null);
  const [Items, setItems] = useState(null);
  const [Estados, setEstados] = useState([]);
  const [idTurno, setIDTurno] = useState("")
 

 

    async function BuscarTurno() {
      try {
        console.log("Pasa por aca con el turno: ")
        setIDTurno("3679640")
        const data = await turnosService.TurnoID(idTurno);
        console.log(data)
        setItems(data);
      } catch (error) {
        console.error("Error al obtener detalles del turno:", error);
      }
    }


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
          backgroundColor: "#044f82",
          color: "white",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Modal.Title>LISTA DE ESPERA - ASIGNAR UN TURNO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <InputGroup className="mb-3">
              <Button
                size="sm"
                title="Buscar turno"
                variant="outline-secondary"
                style={{ height: "30px" }}
                 onClick={() => {BuscarTurno()}}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
              <h3
                style={{
                  fontSize: "25px",
                  color: "#044f82",
                  textAlign: "center",
                }}
              >
                . Generar Búsqueda.
              </h3>
             
            
            </InputGroup>
          </div>
          <h1
            style={{ fontSize: "50px", color: "#044f82", textAlign: "center" }}
          >
            {Items?.estado?.trim() ? Items.estado : "Esperando información"}
          </h1>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              backgroundColor: "white",
              textAlign: "center",
              width: "50%",
            }}
          >
            <h1 style={{ fontSize: "55px", color: "#044f82" }}>
              {Items?.hora || ""}
            </h1>
            <h1 style={{ fontSize: "25px", color: "#044f82" }}>{FechaLarga}</h1>
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
                    fontWeight: "bold",
                  }}
                  value={
                    Items?.paciente ? `${Items.paciente}\n${Items.nroDoc}` : ""
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
                    fontWeight: "bold",
                  }}
                  value={
                    Items?.paciente
                      ? `${Items.profesional}\n${Items.servicio}`
                      : ""
                  }
                />
              </InputGroup>

              {/*  <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Servicio"
                  variant="outline-secondary"
                  style={{ height: "25px" }}
                >
                  <i className="fa-solid fa-kit-medical"></i>
                </Button>
                <Form.Control
                  readOnly
                  style={{ textAlign: "center", fontSize: "12px" }}
                  value={Items?.servicio || ""}
                />
              </InputGroup> */}

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
                    fontWeight: "bold",
                  }}
                  value={Items?.obrasocial || ""}
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", marginTop: "10px" }}>
          <h6 style={{ textAlign: "left" }}>Observaciones</h6>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              readOnly
              style={{ textAlign: "left", fontSize: "12px", height: "50px" }}
              value={Items?.observaciones || ""}
            />
          </InputGroup>

          {/*         <h6 style={{ textAlign: "left" }}>Detalle de estados</h6>
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)", width: "200px" }}>Fecha</th>
                <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }}>Estado</th>
                <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }}>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {Estados.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {formatearFecha(item.fecha)}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.estado}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "10px" }}>
                    {item.observaciones}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default asignarTurnoListadeEspera;
