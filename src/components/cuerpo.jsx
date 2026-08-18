import React from "react";
import Button from "react-bootstrap/Button";

import "../css/cuerpo.css";

import { Link } from "react-router-dom";

import Funcionalidades1 from "./funcionalidades1";
import Footer from "./Footer";
import Funcionalidades from "./funcionalidades";
import Quienessomos from "./Quienessomos";
/* import Funcionalidades from "./home/funcionalidades"; */


function cuerpo() {
  return (
    <>
    <div id="cuerpo">
       
     
     
      <div className="presentacion">


        <h2 className="">La plataforma integral para la administración</h2>
        

        <h2 className="">de consultorios y centros de salud.</h2>

        <br></br>
         <h5>   </h5>



<div></div>
<br />
          <br />
          <br />
          <br />
          <br />
          <br />
        <h5 className="h5home">Te ayudamos a organizar los turnos de tu consultorio, </h5>
        <h5 className="h5home"> así como a gestionar los datos</h5>
        
        <h5 className="h5home"> de tus pacientes y profesionales. </h5>

          <br />
          <br />
          <br />
          
            <Link to="/login">
           <Button variant="outline-primary" className="" size="lg">
                Iniciar sesión
              </Button>
            </Link>
       
            <Link to="/crearcuentapasouno"> 
            <Button variant="outline-primary" className="" size="lg">
            Registrarse
            </Button>
            </Link>
          
        
      </div>
      
      {/*   <Quienessomos />
      
       
      
        
      
        <Funcionalidades1 />  */}
      
<Funcionalidades />
      
        
      
    </div>
    <Footer />
    </>
  );
}

export default cuerpo;
