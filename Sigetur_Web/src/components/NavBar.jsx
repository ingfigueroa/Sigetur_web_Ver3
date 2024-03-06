import React from "react";
import "../css/header.css";



function NavBar() {
  return (
    <div id="encabezado">
      <div>
      <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
      </div>
      <div>
        <a href="/">Inicio</a>
        <a href="/">Quienes somos</a>
        <a href="/">Funcionalidades</a>
        <a href="/">Contacto</a>
      </div>
      <div>
        <button><a href="/Login">Mis Turnos</a></button>
      </div>
      <div>
        <button>Registrar consultorio</button>
      </div>
    
    </div>
  );
} 

export default NavBar;
