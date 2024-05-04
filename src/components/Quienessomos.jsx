import React, { Component } from "react";

import "../css/cuerpo.css";
const Quienessomos = () => {
  return (
    <div id="quienessomostitulo">
      <div id="quienessomos">
        <div className="quienessomostexto">
          <h4 className="">
            Somos una empresa de software que ha desarrollado{" "}
          </h4>
          <br></br>
          <h4>
            <strong>
              SIGETUR <br></br> Sistema de Gestión de Turnos
            </strong>
          </h4>
          <br></br>
          <h5>
            Un software que administra y organiza los turnos para profesionales
            de la salud.
            <br />
            <br />
            Nuestro propósito es facilitar un Software como Servicio -SaaS -, en
            donde el cliente podrá registrar consultorios o clinicas y empezar a
            utilizarlo, cargando profesionales, pacientes y registrando turnos
            entre otras cosas.
          </h5>
        </div>
        <div className="quienessomosimg">
          <img src="../assets/login2.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Quienessomos;
