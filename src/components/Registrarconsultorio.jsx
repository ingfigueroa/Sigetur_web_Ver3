import React, { Component } from "react";

import Registrarconsultoriocuerpo from "./registrarconsultoriocuerpo";
import "../css/registrarconsultorio.css";



export default class Registrarconsultorio extends Component {
  render() {
    return (
      <div className="fondoprincipal">
       <div style={{
            width: "100%",
            height: "65px",
            backgroundColor: "#1565c0",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
          <a href="/" >
            <img style= {{marginBottom: "20px"}} src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>
          <h3 style={{ margin: 0, marginLeft: "15px", fontWeight: "400" }}>Sistema de Gestión de Turnos para profesionales de la salud</h3>
        </div>

        <Registrarconsultoriocuerpo />
      </div>
    );
  }
}
