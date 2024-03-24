import React, { Component,  useState, useEffect } from "react";

import Tabla from "./tablapizarradeturnos";
import "../css/pizarradeturnos.css";


export default class pizarradeturnos extends Component {
  
  render() {
    const FechaActual = () => {
      const [fecha, setFecha] = useState(new Date());
    
    
      };
    return (
      <div className="fondoprincipal1">
        <div className="acomodarimagen">
          <a href="/">
            <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>
         <h1>La hora es: </h1>;
          <h2>{FechaActual.toString}</h2>
        </div>
        <h2>PIZARRA DE TURNOS</h2>
        <Tabla />
      </div>
    );
  }
}


