import React, { Component } from "react";

import Registrarconsultoriocuerpo from "./registrarconsultoriocuerpo";
import "../css/registrarconsultorio.css";



export default class Registrarconsultorio extends Component {
  render() {
    return (
      <div className="fondoprincipal">
        <div className="acomodarimagen">
          <a href="/">
            <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>
        </div>

        <Registrarconsultoriocuerpo />
      </div>
    );
  }
}
