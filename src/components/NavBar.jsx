import React from "react";
import "../css/header.css";
import Button from "react-bootstrap/Button";

function NavBar() {
  return (
    <div id="encabezado">
      <div style={{ justifyContent: "center", width: "15%" }}>
        <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
      </div>
      <div style={{ alignContent: "center", width: "50%" }}>
        <a href="/">Inicio</a>
        <a href="/">Quienes somos</a>
        <a href="/">Funcionalidades</a>
        <a href="/">Contacto</a>
      </div>
      <div style={{ width: "35%", alignContent:"center"}}>
       
        <a 
        
        href="/login">
           <Button variant="outline-primary">Iniciar sesión</Button>
         
        </a>
     
        <a href="/crearcuentapasouno">
        <Button variant="outline-primary">Registarse</Button>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
