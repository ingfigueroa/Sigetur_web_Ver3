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
        <br></br>
      </div>
     <div>

      <Quienessomos />

     </div>
      <div id="quienessomos">
        <div className="quienessomostexto">
        
          <h4 className="">
            Somos una empresa de software que ha desarrollado{" "}
          </h4>
          <br></br>
          <h4>
            <strong>SIGETUR <br></br>  Sistema de Gestión de Turnos</strong>
          </h4>
          <br></br>
          <h5>
            Un software que administra y organiza los turnos para profesionales
            de la salud.
            <br />
            <br />
            Nuestro propósito es facilitar un Software como Servicio -SaaS -, en donde el cliente podrá registrar
            consultorios o clinicas y empezar a utilizarlo, cargando
            profesionales, pacientes y registrando turnos entre otras cosas.
          </h5>
        </div>
        <div className="quienessomosimg">

            <img src="../assets/login2.jpg" alt="" />
        </div>
      </div>
      <div>

        <Funcionalidades />
      </div>
      <div>
        <Funcionalidades1 />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default cuerpo;
