import React, { useState } from "react";
import '../css/sigetur.css';

import Button from "react-bootstrap/Button";


import Image from "react-bootstrap/Image";

import PizarradeTurnos from "./pizarradeturnos";


import RegistrarObraSocial from "./registrarobrasocial";
import ListarProfesionales from "./listarprofesionales";
import ListarPacientes from "./listarpacientes";
import ListarObrasSociales from './listarobrassociales';



export default function sigetur() {

  const [listarObraSocial, setListarObraSocial] = useState(false);

  const MostrarObraSocial = () => {
   
    setMostrarPizarradeTurnos(false);
    setMostrarListadoPaciente(false);
    setListarObraSocial(true);
    setMostrarListarProfesional(false);
  };


  
  const [mostrarlistarProfesional, setMostrarListarProfesional] =
  useState(false);

const MostrarListarProfesional = () => {
  
  setMostrarPizarradeTurnos(false);
  setMostrarListadoPaciente(false);
  setListarObraSocial(false);
  setMostrarListarProfesional(true);
};


  
  const [mostrarListadoPaciente, setMostrarListadoPaciente] = useState(false);

  const MostrarListadoPaciente = () => {
    setMostrarListadoPaciente(true);
    setMostrarPizarradeTurnos(false);
   
    setListarObraSocial(false);
    setMostrarListarProfesional(false);
  };

  const [mostrarPizarradeTurnos, setMostrarPizarradeTurnos] = useState(true);

  const MostrarPizarradeTurnos = () => {
   
    setMostrarListadoPaciente(false);
    setListarObraSocial(false);
    setMostrarPizarradeTurnos(true);
    setMostrarListarProfesional(false);
  };


  const varpaciente = 'FIGUEROA, RODOLFO'

  return (
    <>
      <div className="sigetur" >
        <div
          style={{ display: "flex", width: "100%", height:"60px", backgroundColor: "#2980B9" }}
        >
          <div style={{ width: "65%", backgroundColor: "#2980B9" }}>
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
              padding:"10px auto",
              margin:"20px auto"
            }}
          >
            
            <button
              title="Ayuda"
              className="btn btn-sm btn-light btn-outline-primary"
              style={{marginRight:"30px"}}

            >
             <i class="fa-regular fa-circle-question"></i>
            </button>
            <Image
              style={{ margin: "0 auto", width:"30px", height:"30px" }}
              src="assets/sinfoto.png"
              roundedCircle 
              
            />

          </div>
          <div
            style={{
              width: "25%",
              textAlign: "left",
              backgroundColor: "",
              color:"white",
              margin:"0px auto"
            }}
          >
           <h6>Usuario: <br></br> {varpaciente}</h6>
            
           
          </div>
        </div>

        <div
          style={{ display: "flex", width: "100%", backgroundColor: "#F5EEF8" }}
        >
          <div
            style={{
              width: "10%",

              marginRight: "5px",
              marginLeft: "5px",
              marginTop:"10px",
              backgroundColor: "white",
              height: "auto",
            }}
          >
            <Button variant="outline-primary" onClick={MostrarPizarradeTurnos}>
              Pizarra de turnos
            </Button>
            <h1></h1>
            <Button
              variant="outline-primary"
              onClick={MostrarListarProfesional}
            >
              Mis Profesionales
            </Button>
            <h1></h1>

            <Button variant="outline-primary" onClick={MostrarListadoPaciente}>
              Mis Pacientes
            </Button>
            <h1></h1>

            <Button variant="outline-primary" onClick={MostrarObraSocial}>
              Mis Obras sociales
            </Button>
            <h1></h1>

            <Button variant="outline-primary">Visualizar Consultas</Button>
          </div>
          
          {mostrarlistarProfesional && <ListarProfesionales />}

          {mostrarListadoPaciente && <ListarPacientes />}

          {mostrarPizarradeTurnos && <PizarradeTurnos />}

         

          {listarObraSocial && <ListarObrasSociales />}

         
        </div>
      </div>
    </>
  );
}
