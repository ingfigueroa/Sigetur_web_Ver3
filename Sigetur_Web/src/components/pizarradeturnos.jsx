import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "../css/pizarradeturnos.css";

import Tabla from "./tablapizarradeturnos";
import Mdlhorarioprofesional from "./mdlhorarioprofesional";

import Mdllistaespera from "./mdlListaEspera";
import MdlBuscarObjetos from "./mdlbuscarobjetos";

export default function pizarradeturnos() {
  /*  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);*/
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

  return (
    <>
       

      <div style={{ display: "flex", width: "100%" }}> 
        <div
          style={{
            width: "10%",

            marginRight: "5px",
            marginLeft: "5px",
            
            
          }}
        >
          <ButtonGroup vertical>
            <DropdownButton
              as={ButtonGroup}
              title="Consultas"
              id="bg-vertical-dropdown-1"
              variant="outline-primary"
            >
              <Dropdown.Item eventKey="1">Profesionales</Dropdown.Item>
              <Dropdown.Item eventKey="2">Pacientes</Dropdown.Item>
              <Dropdown.Item eventKey="1">Turnos</Dropdown.Item>
              <Dropdown.Item eventKey="2">Obras sociales</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <Button variant="outline-primary"
          >Registrar Profesionales</Button>
          <h1></h1>
          <Button variant="outline-primary">Registrar Pacientes</Button>
          <h1></h1>
          <Button variant="outline-primary">Registrar Turnos</Button>
          <h1></h1>
          <Button variant="outline-primary">Registrar Obras sociales</Button>
          <h1></h1>
        </div>
        <div style={{ display: "grid", width: "100%", backgroundColor:"#2499c7"  }}>
          <div style={{ display: "flex", width: "100%", marginBottom:"30px"}}>
            <div style={{  width: "20%", textAlign:"center"}}>
              <a href="/">
                <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
              </a>
            </div>
           

            <div style={{  width: "50%", textAlign:"center"}} >
              <h1>Pizarra de turnos</h1>
            </div>
            <div style={{  width: "30%", textAlign:"right",backgroundColor:""}}>
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

          
          <div style={{ marginBottom:"30px", display: "flex" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
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
                  style={{ backgroundColor: "#679bb9", color: "white" }}
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
                  style={{ backgroundColor: "#002d38" }}
                  color="white"
                  onClick={openMdlBuscarObjetos}
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Profesión
                </InputGroup.Text>
                <Form.Control
                  placeholder="Profesión"
                  aria-label="Profesión"
                  aria-describedby="basic-addon2"
                  style={{ marginght: "20px" }}
                />
              </InputGroup>
            </div>
          
        
          <div style={{ width: "100%" }}>
            <Tabla />
          </div>
        </div>
      </div>

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
