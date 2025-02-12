import React, { useState } from "react";
import "../css/sigetur.css";
import "../css/menu-hamburguesa.css";

import Button from "react-bootstrap/Button";

import Image from "react-bootstrap/Image";

import PizarradeTurnos from "./turnos/pizarradeturnos";

import ObrasSociales from "./obrassociales/obrassociales";

import Profesionales from "./profesionales/profesionales";

import Pacientes from "./pacientes/pacientes";

import AgendaSemanal from "./profesionales/agendasemanal";

export default function sigetur() {
  const [mostrarProfesional, setMostrarProfesional] = useState(false);

  const [mostrarObraSocial, setMostrarObraSocial] = useState(false);

  const [mostrarPaciente, setMostrarPaciente] = useState(false);

  const [mostrarPizarradeTurnos, setMostrarPizarradeTurnos] = useState(false);

  const [mostrarAgendaSemanal, setMostrarAgendaSemanal] = useState(false);


  const MostrarObraSocial = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(true);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
  };

  const MostrarProfesionales = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarProfesional(true);
    setMostrarAgendaSemanal(false);
  };

  const MostrarPacientes = () => {
    setMostrarPizarradeTurnos(false);
    setMostrarPaciente(true);
    setMostrarObraSocial(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
  };

  const MostrarPizarradeTurnos = () => {
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(true);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(false);
  };

  
  const MostrarAgendaSemanal = () => {
    setMostrarPaciente(false);
    setMostrarObraSocial(false);
    setMostrarPizarradeTurnos(false);
    setMostrarProfesional(false);
    setMostrarAgendaSemanal(true)
  };

  const varpaciente = "FIGUEROA, RODOLFO";

  return (
    <>
      <div className="sigetur">
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "60px",
            backgroundColor: "#2980B9",
          }}
        >
         
          <div
            style={{
              width: "65%",
              backgroundColor: "#2980B9",
              marginLeft: "25px",
            }}
          >
            <a href="/">
              <img
                src="./assets/Logo_2022_resolucion.jpg"
                alt=""
                style={{ margin: "20px 20px" }}
              />
            </a>
          </div>

          <div
            style={{
              width: "10%",
              textAlign: "right",
              backgroundColor: "",
              padding: "10px auto",
              margin: "20px auto",
            }}
          >
            <button
              title="Ayuda"
              className="btn btn-sm btn-light btn-outline-primary"
              style={{ marginRight: "30px" }}
            >
              <i class="fa-regular fa-circle-question"></i>
            </button>
            <Image
              style={{ margin: "0 auto", width: "30px", height: "30px" }}
              src="assets/sinfoto.png"
              roundedCircle
            />
          </div>
          <div
            style={{
              width: "25%",
              textAlign: "left",
              backgroundColor: "",
              color: "white",
              margin: "0px auto",
            }}
          >
            <h6>
              Usuario: <br></br> {varpaciente}
            </h6>
          </div>
        </div>

        <div
          style={{ display: "flex", width: "100%", backgroundColor: "white" }}
        >
          <div
            style={{
              width: "10%",

              marginRight: "5px",
              marginLeft: "5px",
              marginTop: "10px",
              backgroundColor: "white",
              height: "auto",
              fontSize: "25px"
            }}
          >
            <Button 
            style={{
              width: "100%",
              height: "60px"
            }}
            variant="outline-primary"
             onClick={MostrarPizarradeTurnos

             }>
              Pizarra de turnos
            </Button>
            <h1></h1>
            <Button 
            style={{
              width: "100%",
              height: "60px"
            }}
            variant="outline-primary"
             onClick={MostrarAgendaSemanal}>
             Agenda semanal
            </Button>
            <h1></h1>
            <Button
           style={{
            width: "100%",
            height: "60px"
          }}
            variant="outline-primary" onClick={MostrarProfesionales}>
              Profesionales
            </Button>
            <h1></h1>

            <Button
            style={{
              width: "100%",
              height: "60px"
            }}
            variant="outline-primary" onClick={MostrarPacientes}>
              Pacientes
            </Button>
            <h1></h1>

            <Button
          style={{
            width: "100%",
            height: "60px"
          }}
            variant="outline-primary" onClick={MostrarObraSocial}>
              Obras sociales
            </Button>
            <h1></h1>

            <Button
            style={{
              width: "100%",
              height: "60px"
            }}
            variant="outline-primary">Consultas</Button>
          </div>

          {mostrarProfesional && <Profesionales />}
          {mostrarPaciente && <Pacientes />}
          {mostrarPizarradeTurnos && <PizarradeTurnos />}
          {mostrarObraSocial && <ObrasSociales />}
          {mostrarAgendaSemanal && <AgendaSemanal />}
        </div>
      </div>
    </>
  );
}
