import React from "react";
import "../css/header.css";

function NavBar() {
  return (
    <div id="encabezado">
      
        
        <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
    
        <div>
        <a href="/">Inicio</a>
        <a href="/">Quienes somos</a>
        <a href="/">Funcionalidades</a>
        <a href="/">Contacto</a>
      
        
          <a href="/Login">Mis Turnos</a>
          </div>
      
    </div>
  );
}

export default NavBar;
