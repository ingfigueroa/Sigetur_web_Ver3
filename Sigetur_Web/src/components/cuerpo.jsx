import React from "react";


import "../css/cuerpo.css";
import Quienessomostitulo from "./quienessomostitulo";
import Quienessomos from "./Quienessomos";
import Funcionalidades from "./Funcionalidades";
import Footer from "./Footer";

function cuerpo() {
  return (
    <div id="cuerpo">
     
      <div className="quienessomos"> 
     
        <h1 className="">Gestión de Turnos</h1>

        <h2 className="">para profesionales de la salud</h2>
        <br></br>

        <h5 className="h5home">te ayudamos a gestionar, organizar </h5>
        <h5 className="h5home"> los turnos de tu consultorio</h5>
        <h5 className="h5home"> y a administrar a tus</h5>
        <h5 className="h5home"> pacientes-profesionales. </h5>
        <br></br>
       
      
        

        
      </div>

      <div>
      
        <Footer />
      </div>
    </div>
  );
}

export default cuerpo;
