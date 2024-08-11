import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import Mdlhorarioprofesional from "./mdlhorarioprofesional"
import Mdllistaespera from "../mdlListaEspera"
import MdlListarProfesional from "./mdllistarprofesionales"


import "/src/css/registrarprofesional.css";
const registrarprofesional = ({ show, handleClose }) => {



  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEspera, setModalListaEspera] = useState(false);
  const [mdllistarprofesionales, setModalListarProfesional] = useState(false);

  const openMdlListarProfesional = () =>{
        setModalListarProfesional(true);
  };

const closeMdlListarProfesional = () =>{
        setModalListarProfesional(false);
  }

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


  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
       <Modal.Header closeButton style={{backgroundColor: '#0277bd', color: 'white'}} >
        <Modal.Title>ADMINISTRAR PROFESIONAL</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{width: '600px'}}

      >
      <div style={{ display: "grid", width: "100%", margin:"15px 15px", backgroundColor:"white"  }}>
        <div className="acomodarencabezadoprofesional">
         

          <div style={{ width: "70%", textAlign: "center", color: "black" }}>
            <h2>ADMINISTRAR PROFESIONAL</h2>
          </div>
          <div style={{ width: "30%", textAlign: "right" }}>
          <button
              title="Listar profesionales"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlListarProfesional}
            >
              <i class="fa-solid fa-calendar-days"></i>
            </button>
            <button
              title="Agenda Semanal"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlHoraProfe}
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
        <div style={{ display: "flex", width: "100%", backgroundColor:"white" }}>
          <div
            style={{ width: "20%", margin:"0 auto"}}
          >
            <Image style={{ display:"block", margin: "0 auto" }} src="assets/sinfoto.png" fluid />
            <InputGroup className="mb-3"
              
            >
            
              <Button
                variant="outline-secondary"
                id="button-addon1"
                title="Agregar imágen"
                color="white"
                style={{justifyContent:"right", margin:"0 15px"}}
              >
               <i class="fa-solid fa-plus"></i>
              </Button>
              <Button
                variant="outline-secondary"
                id="button-addon1"
                title="Eliminar imágen"
                color="white"
                style={{justifyContent:"right", margin:"0 5px"}}
              >
            <i class="fa-solid fa-xmark"></i>
              </Button>
            </InputGroup>
          </div>
          <div style={{ width: "70%"}}>
          <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Tipo documento
              </InputGroup.Text>
              <select>
                <option value="someOption">D.N.I.</option>
                <option value="otherOption">PASAPORTE</option>
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Nro.
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar número de documento"
                aria-label="Ingresar nro de documento"
                aria-describedby="basic-addon2"
                type="text"
              />
               <Button
                variant="outline-secondary"
                id="button-addon1"
               
                color="white"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
                
                </Button>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Apellido
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar apellido"
                aria-label="Ingresar apellido"
                aria-describedby="basic-addon2"
                type="text"
                style={{ width: "60%" }}
              />
             
             
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Nombres
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar nombres"
                aria-label="Ingresar nombres"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>

          

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Correo electrónico
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar correo electrónico"
                aria-label="Ingresar correo electrónico"
                aria-describedby="basic-addon2"
                type="mail"
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Celular
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar número de celular"
                aria-label="Ingresar número de celular"
                aria-describedby="basic-addon2"
                type="text"
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                CUIT/CUIL
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar CUIT/CUIL"
                aria-label="Ingresar CUIT/CUIL"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Fecha de nacimiento
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar fecha de nacimiento"
                aria-label="Ingresar fecha de nacimiento"
                aria-describedby="basic-addon2"
                type="date"
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Sexo
              </InputGroup.Text>
              <select>
                <option value="someOption">MASCULINO</option>
                <option value="otherOption">FEMENINO</option>
              </select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Profesión
              </InputGroup.Text>
              <select style={{ width: "60%" }}>
                <option value="someOption">ODONTOLOGÍA</option>
                <option value="otherOption">MEDICINA</option>
                <option value="someOption">PSICOLOGÍA</option>
                <option value="otherOption">FISIOTERAPIA</option>
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                MATRICULA
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar matrícula"
                aria-label="Ingresar matrícula"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>
          </div>
        </div>
        <div style={{ width: "100%",  backgroundColor:"white"  }}>
          <h4 style={{ width: "100%", backgroundColor:"#D6EAF8", textAlign:"center"}}>Domicilio del profesional</h4>
          <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Calle
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar calle"
                aria-label="Ingresar calle"
                aria-describedby="basic-addon2"
                type="text"
                
              />
              
           
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Número
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar número"
                aria-label="Ingresar número"
                aria-describedby="basic-addon2"
                type="text"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white"}}
              >
                Localidad
              </InputGroup.Text>
              <Form.Control
                placeholder="Ingresar localidad"
                aria-label="Ingresar localidad"
                aria-describedby="basic-addon2"
                type="text"
                sytle={{width:"50%"}}
                
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Provincia
              </InputGroup.Text>
              <select>
                <option value="someOption">CÓRDOBA</option>
                <option value="otherOption">BUENOS AIRES</option>
                <option value="someOption">SANTA FE</option>
                <option value="otherOption">SAN LUIS</option>
              </select>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                País
              </InputGroup.Text>
              <select>
                <option value="someOption">ARGENTINA</option>
               
              </select>
            </InputGroup>
           
        </div>
        <div style={{
            width: "100%",
            margin: "0 auto",
            backgroundColor: "white",
            textAlign: "right",
          }}>
        
        <ButtonGroup className="mb-2">
            <Button variant="success">Grabar</Button>
            <Button variant="primary">Limpiar</Button>
            <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
          </ButtonGroup>
             
        </div>
      </div>
    </Modal.Body>
    </Modal>
  );
};

export default registrarprofesional;
