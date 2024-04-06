import React, { useState } from "react";
import "../css/pizarradeturnos.css";


import Tabla from "./tablapizarradeturnos";
import Mdlhorarioprofesional from "./mdlhorarioprofesional";

export default function pizarradeturnos() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div className="acomodarimagen1">
          <a href="/">
            <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>

          <div className="acomodarencabezado">
            <div className="acomodartitulo">
              <h1>Pizarra de turnos</h1>
            </div>
            <div className="acomodardivbotonespt ">
              <button
                title="Email a todos los turnos a toda la grilla"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={handleShow}
              >
                <i class="fa-solid fa-at"></i>
              </button>
              <button
                title="Agenda Semanal"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={handleShow}
              >
                <i class="fa-solid fa-calendar-days"></i>
              </button>

              <button
                title="Horarios del profesional"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={handleShow}
              >
                <i class="fa-solid fa-clock"></i>
              </button>
              <button
                title="Lista de espera"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={handleShow}
              >
                <i class="fa-solid fa-book-open-reader"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="buscarprofesional">
          <div>
            <h6>
              Fecha: <input type="date" />
            </h6>
          </div>

          <h6>
            Profesional: <input type="text" />
            <button
              title="Buscar profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotones"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </h6>

          <div>
            <h6>
              Profesión: <input type="text" />
            </h6>
          </div>
        </div>

        <Tabla />
      </div>
      <Mdlhorarioprofesional show={show} handleClose={handleClose} />
    </>
  );
}
