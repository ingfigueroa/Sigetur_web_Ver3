import React, { useState } from "react";
import "../css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "../css/tablapizaturnos.css";
import MdlAltaTurno from "./mdlaltaturno";
import MdlTurnoDetalle from "./mdlturnodetalle";
import Mdlanularturno from "./mdlanularturno";
import Mdlturnoregistrarcobro from "./mdlturnoregistrarcobro";

import Mdlhorarioprofesional from "./mdlhorarioprofesional";
import Mdllistaespera from "./mdlListaEspera";

function tablapizarradeturnos() {
  const data = [
    { Estado: "LIB", Hora: "08:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    {
      Estado: "PRE-COB",
      Hora: "10:00",
      Paciente: "FIGUEROA, FLORENCIA PAULA",
      DNI: 40662065,
      Obra_social: "PARTICULAR",
    },
    {
      Estado: "PEN",
      Hora: "10:30",
      Paciente: "FIGUEROA, MATIAS NICOLAS",
      DNI: 40662065,
      Obra_social: "PARTICULAR",
    },
    {
      Estado: "ASA",
      Hora: "11:00",
      Paciente: "FIGUEROA, MATIAS NICOLAS",
      DNI: 40662065,
      Obra_social: "UNIVERSIDAD TECNOLOGICA NACIONAL",
    },
    
    
    {
      Estado: "ACA",
      Hora: "11:30",
      Paciente: "FIGUEROA, CAROLINA",
      DNI: 40662065,
      Obra_social: "DASUTEN",
    },
    
    { Estado: "LIB", Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    {
      Estado: "PRE-NCOB",
      Hora: "10:00",
      Paciente: "FIGUEROA, CAROLINA",
      DNI: 40662065,
      Obra_social: "DASPU",
    },
    { Estado: "LIB", Hora: "10:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: "LIB", Hora: "11:00", Paciente: "", DNI: "", Obra_social: "" },
  ];

  const [mdlAltaTurno, setModalAltaTurno] = useState(false);

  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEspera, setModalListaEspera] = useState(false);
  const [mdlBuscarObjetos, setModalBuscarObjetos] = useState(false);

  const openMdlHoraProfe = () => {
    setModalHoraProfe(true);
  };

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlListaEspera = () => {
    setModalListaEspera(true);
  };

  const closeMdlListaEspera = () => {
    setModalListaEspera(false);
  };

  const openMdlBuscarObjetos = () => {
    setModalBuscarObjetos(true);
  };

  const closeMdlBuscarObjetos = () => {
    setModalBuscarObjetos(false);
  };
  const openMdlAltaTurno = () => {
    setModalAltaTurno(true);
  };

  const closeMdlAltaTurno = () => {
    setModalAltaTurno(false);
  };

  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);

  const openMdlTurnoDetalle = () => {
    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };

  const [mdlAnularTurno, setModalAnularTurno] = useState(false);

  const openMdlAnularTurno = () => {
    setModalAnularTurno(true);
  };

  const closeMdlAnularTurno = () => {
    setModalAnularTurno(false);
  };

  const [mdlturnoregistrarcobro, setmModalTurnoRegistrarCobro] =
    useState(false);

  const openMdlurnoRegistrarCobro = () => {
    setmModalTurnoRegistrarCobro(true);
  };

  const closeMdlurnoRegistrarCobro = () => {
    setmModalTurnoRegistrarCobro(false);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          width: "100%",
          margin: "15px 15px",
          backgroundColor: "white",
        }}
      >
        <div className="acomodarencabezadopizaturnos">
          <div style={{ width: "70%", textAlign: "center", color: "black" }}>
            <h3>Pizarra de turnos</h3>
          </div>
          <div style={{ width: "30%", textAlign: "right" }}>
            <button
              title="Email a todos los turnos a toda la grilla"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
            >
              <i class="fa-solid fa-at"></i>
            </button>
            <button
              title="Agenda Semanal"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
            >
              <i class="fa-solid fa-calendar-days"></i>
            </button>

            <button
              title="Horarios del profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlHoraProfe}
            >
              <i class="fa-solid fa-clock"></i>
            </button>
            <button
              title="Lista de espera"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlListaEspera}
            >
              <i class="fa-solid fa-book-open-reader"></i>
            </button>
          </div>
        </div>

        <div className="acomodarencabezadopizaturnos">
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              Fecha
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar profesional"
              aria-label="Buscar profesional"
              aria-describedby="basic-addon2"
              type="date"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              Profesional
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar profesional"
              aria-label="Buscar profesional"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon1"
              style={{ backgroundColor: "#002d38", height: "38px" }}
              color="white"
              onClick={openMdlBuscarObjetos}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "38px",
              }}
            >
              Especialidad
            </InputGroup.Text>
            <Form.Control
              placeholder="Profesión"
              aria-label="Profesión"
              aria-describedby="basic-addon2"
              style={{ marginght: "20px" }}
            />
          </InputGroup>
        </div>
        <div className="acomodartabla">
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width:"270px"
                  }}
                >
                  Estado
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="2">
                  Paciente
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="3"
                >
                  DNI
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="4">
                  Obra social
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="8"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td style={{ textAlign: "center", fontSize:"12px" }}>
                    {item.Estado === "LIB" ? (
                      <Button variant="success" size="sm" style={{width:"60%"}}>
                        libre
                      </Button>
                    ) : item.Estado === "PRE-COB" ? (
                      <Button variant="primary" size="sm" style={{width:"60%"}}>
                        presente cobrado
                      </Button>
                     ) : item.Estado === "PRE-NCOB" ? (
                      <Button variant="danger" size="sm" style={{width:"60%"}}>
                        presente no cobrado
                      </Button>
                     ) : item.Estado === "PEN" ? (
                      <Button variant="warning" size="sm" style={{width:"60%"}}>
                        pendiente
                      </Button>
                     ) : item.Estado === "ACA" ? (
                      <Button variant="secondary" size="sm" style={{width:"60%"}}>
                        ausente c/aviso
                      </Button>
                     ) : item.Estado === "ASA" ? (
                      <Button variant="secondary" size="sm" style={{width:"60%"}}>
                        ausente s/aviso
                      </Button>
                    
                    ) : (
                      <Button variant="outline-danger" size="sm" style={{width:"60%"}}>
                        Estado no es LIB ni OTRA_OPCION
                      </Button>
                    )}
                  </td>
                  <td style={{ textAlign: "center", fontSize:"12px" }}>{item.Hora}</td>
                  <td style={{ textAlign: "center", fontSize:"12px" }}>{item.Paciente}</td>
                  <td style={{ textAlign: "center", fontSize:"12px" }}>{item.DNI}</td>
                  <td style={{ textAlign: "center", fontSize:"12px" }}>{item.Obra_social}</td>

                  <td style={{ textAlign: "center", fontSize:"12px" }}>
                    <button
                      title="Registrar Turno"
                      className="btn btn-sm btn-light btn-primary"
                      onClick={openMdlAltaTurno}
                    >
                      <i class="fa-solid fa-up-right-from-square"></i>
                    </button>
                    <button
                      title="Anular turno"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={openMdlAnularTurno}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      title="Detalle del turno"
                      className="btn btn-sm btn-light btn-success"
                      onClick={openMdlTurnoDetalle}
                    >
                      <i class="fa-solid fa-file-invoice-dollar"></i>
                    </button>
                    <button
                      title="Registrar cobro"
                      className="btn btn-sm btn-light btn-success"
                      variant="outline-secondary"
                      onClick={openMdlurnoRegistrarCobro}
                    >
                      <i class="fa-solid fa-dollar-sign"></i>
                    </button>
                  </td>
                </tr>
                //<TableRow item={item} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {mdlAltaTurno && (
        <MdlAltaTurno show={openMdlAltaTurno} handleClose={closeMdlAltaTurno} />
      )}

      {mdlTurnoDetalle && (
        <MdlTurnoDetalle
          show={openMdlTurnoDetalle}
          handleClose={CloseMdlTurnoDetalle}
        />
      )}

      {mdlAnularTurno && (
        <Mdlanularturno
          show={openMdlAnularTurno}
          handleClose={closeMdlAnularTurno}
        />
      )}
      {mdlturnoregistrarcobro && (
        <Mdlturnoregistrarcobro
          show={openMdlurnoRegistrarCobro}
          handleClose={closeMdlurnoRegistrarCobro}
        />
      )}
      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
        />
      )}

      {mdlListaEspera && (
        <Mdllistaespera
          show={openMdlListaEspera}
          handleClose={closeMdlListaEspera}
        />
      )}

      {mdlBuscarObjetos && (
        <MdlBuscarObjetos
          show={openMdlBuscarObjetos}
          handleClose={closeMdlBuscarObjetos}
        />
      )}
    </>
  );
}

export default tablapizarradeturnos;
