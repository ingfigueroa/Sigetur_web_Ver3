import React from "react";

import Tabla from "./tablapizarradeturnos";


function pizarradeturnos() {
  return (
    <div id="cuerpo">
      
      <h2>PIZARRA DE TURNOS</h2>
      
      
      <div id="cuerpodiv1">
        <div id="formateo">
          <h5>Fecha de turnos</h5>
          <input type="date" value={"15/03/2024"} />
        </div>

        <div id="formateo">
          <h5>Profesional</h5>
          <input type="text" value="FIGUEROA, RODOLFO" />
        </div>
        <div id="formateo">
          <h5>Profesiòn</h5>
          <input type="text" value="ODONTOLOGO" />
        </div>
      </div>
      <div>
        <Tabla />
      </div>
    </div>
  );
}

export default pizarradeturnos;
