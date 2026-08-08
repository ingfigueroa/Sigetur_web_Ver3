import React from "react";
import Button from "react-bootstrap/Button";

import "../css/cuerpo.css";

import { Link } from "react-router-dom";

import Funcionalidades1 from "./Funcionalidades1";
import Footer from "./Footer";
import Funcionalidades from "./funcionalidades";
import Quienessomos from "./Quienessomos";
/* import Funcionalidades from "./home/funcionalidades"; */


function cuerpo() {
  return (
    <div id="cuerpo">
       
     
     
      <div className="presentacion">
{/*         <h1 className="">Sistema de Gestión de Turnos</h1>

        <h2 className="">para profesionales de la salud</h2> */}

        <h1 className="">La plataforma integral para la administración</h1>
        

        <h1 className="">de consultorios y centros de salud.</h1>

        <br></br>

        <h5 className="h5home">te ayudamos a gestionar, organizar </h5>
        <h5 className="h5home"> los turnos de tu consultorio</h5>
        <h5 className="h5home"> y a administrar a tus</h5>
        <h5 className="h5home"> pacientes-profesionales. </h5>

          <br />
          <br />
          <br />
          
            <Link to="/login">
           <Button variant="outline-primary" className="text-white" size="lg">
                Iniciar sesión
              </Button>
            </Link>
       
            <Link to="/crearcuentapasouno"> 
            <Button variant="outline-primary" className="text-white" size="lg">
            Registrarse
            </Button>
            </Link>
          
        
      </div>
      
        <Quienessomos />
      
       
      
        <Funcionalidades />
      
        <Funcionalidades1 /> 
      

      
        <Footer />
      
    </div>
  );
}

export default cuerpo;
