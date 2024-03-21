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

///<div style={{width:'100%',  height:'450%', background:'red'}}>
///<h1> bienvenidos al registro </h1>
///</div>
///<div style={{width:'0%', height:'450px', background:'green'}}>
///   <h1>registrar consultorio</h1>
///</div>///
