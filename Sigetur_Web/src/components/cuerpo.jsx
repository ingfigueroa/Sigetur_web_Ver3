import React from "react";

import "../css/cuerpo.css";

import Funcionalidades1 from "./Funcionalidades1";
import Footer from "./Footer";
import Funcionalidades from "./Funcionalidades";
import Quienessomos from "./Quienessomos";


function cuerpo() {
  return (
    <div id="cuerpo">
       
     
    
      <div className="presentacion">
        <h1 className="">Gestión de Turnos</h1>

        <h2 className="">para profesionales de la salud</h2>
        <br></br>

        <h5 className="h5home">te ayudamos a gestionar, organizar </h5>
        <h5 className="h5home"> los turnos de tu consultorio</h5>
        <h5 className="h5home"> y a administrar a tus</h5>
        <h5 className="h5home"> pacientes-profesionales. </h5>

          <br />
          <br />
          <br />
          <h6>
            <a href="/Login">Mis Turnos</a>
          </h6>
        
          <h6>
            <a href="/Registrarconsultorio"> Registrar consultorio</a>
          </h6>
        
      </div>
      
        <Quienessomos />
      
      
      
        <Funcionalidades />
      
        <Funcionalidades1 />
      

      
        <Footer />
      
    </div>
  );
}

export default cuerpo;
