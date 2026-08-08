import React from "react";
import "../css/header.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div id="encabezado">
      <div className="logo">
        <img src="./assets/logo_1220_330.png" alt="" />
      </div>
      <div className="menu">
        <a href="/">Inicio</a>
        <a href="/">Quienes somos</a>
        <a href="/">Funcionalidades</a>
        <a href="/">Contacto</a>
      </div>
      <div className="botones">
       
        {/* <a 
        
        to="/login">
           <Button variant="outline-primary">Iniciar sesión</Button>
         
        </a> */}
        <Link to="/login">
            <Button variant="outline-primary">Iniciar sesión</Button>
        </Link>
             <Link to="/crearcuentapasouno">
            <Button variant="outline-primary">Registrarse</Button>
        </Link>
        {/* <a href="/crearcuentapasouno">
        <Button variant="outline-primary">Registarse</Button>
        </a> */}
      </div>
    </div>
  );
}

export default NavBar;
