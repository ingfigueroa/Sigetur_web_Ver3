import React, { useState } from "react";
import "../css/menu-hamburguesa.css"; // Importa los estilos

const menuhamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        {/* Icono de hamburguesa */}
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
      </button>

      <nav className={`menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li><a href="#home">Pizarra de turnos</a></li>
          <li><a href="#about">Profesionales</a></li>
          <li><a href="#services">Pacientes</a></li>
          <li><a href="#contact">Obras sociales</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default menuhamburguesa;
