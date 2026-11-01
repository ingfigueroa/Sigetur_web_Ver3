




import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGrip,
  faCalendarDays,
  faCalendarWeek,
  faUsers,
  faUser,
  faBuilding,
  faFolderOpen,
  faMagnifyingGlass,
  faClock,
  faChartColumn,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

import "../../css/menu.css";

const MenuAplicaciones = ({ cambiarVista, razonsocial, user, tipousuario }) => {

  const [abierto, setAbierto] = useState(false);

  const menuRef = useRef(null);

useEffect(() => {
  const cerrarAlHacerClickAfuera = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setAbierto(false);
    }
  };

  document.addEventListener(
    "mousedown",
    cerrarAlHacerClickAfuera
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      cerrarAlHacerClickAfuera
    );
  };
}, []);

  const opciones = [
    {
      nombre: "Pizarra de turnos",
      icono: faCalendarDays,
      vista: "pizarradeturnos",
      titulo: "PIZARRA DE TURNOS"
    },
    {
      nombre: "Agenda semanal",
      icono: faCalendarWeek,
      vista: "agendasemanal",
      titulo: "AGENDA SEMANAL"
    },
    {
      nombre: "Profesionales",
      icono: faUsers,
      vista: "profesionales",
      titulo: "GESTIÓN DE PROFESIONALES"
    },
    {
      nombre: "Pacientes",
      icono: faUser,
      vista: "pacientes",
      titulo: "GESTIÓN DE PACIENTES"
    },
    {
      nombre: "Obras Sociales",
      icono: faBuilding,
      vista: "obrasociales",
      titulo: "GESTIÓN DE OBRAS SOCIALES"
    },
    {
      nombre: "Historia Clínica",
      icono: faFolderOpen,
      vista: "historiaClinica",
      titulo: "GESTIÓN DE HISTORIA CLINICA"
    },
    {
      nombre: "Consultas",
      icono: faMagnifyingGlass,
      vista: "consultas",
      titulo: "GESTION DE CONSULTAS"
    },
    {
      nombre: "Lista de espera",
      icono: faClock,
      vista: "listaespera",
      titulo: "GESTION LISTA DE ESPERA"
    },
    {
      nombre: "Dashboard",
      icono: faChartColumn,
      vista: "dashboard",
      titulo: "DASHBOARD"
    }
  ];

  
    const handleLogout = () => {
  
    localStorage.removeItem("token");
  
    // opcional
    localStorage.removeItem("user");
  
    window.location.href = "/login";
  };
  
  const seleccionarAplicacion = (opcion) => {
    cambiarVista(opcion.vista, opcion.titulo);
    setAbierto(false);
  };

  return (
    <div className="menu-aplicaciones" ref={menuRef}>

    {/*   <button
        className="btn-menu-google"
        onClick={() => setAbierto(!abierto)}
      >
        <FontAwesomeIcon icon={faGrip} />
      </button> */}
      <button
  className="btn-menu-google"
  onClick={() => setAbierto(!abierto)}
>
  <span className="icono-grid">
    {Array.from({ length: 16 }).map((_, index) => (
      <span key={index}></span>
    ))}
  </span>
</button>

      {abierto && (

        <div className="panel-aplicaciones">

          <div className="usuario-menu">

            <div className="avatar-usuario">
              RF
            </div>

            <div>
              <strong>{user}</strong>
              <span>{tipousuario}</span>
            </div>

          </div>
           

          <hr />

          <div className="grid-aplicaciones">

            {opciones.map((opcion) => (

              <div
                key={opcion.nombre}
                className="aplicacion"
                onClick={() => seleccionarAplicacion(opcion)}
              >

                <FontAwesomeIcon
                  icon={opcion.icono}
                  className="icono-aplicacion"
                />

                <span>
                  {opcion.nombre}
                </span>

              </div>

            ))}

          </div>

          <hr />
            <div className="consultorio-menu">

            <FontAwesomeIcon icon={faBuilding} />

            <div>
              <strong>{razonsocial}</strong>
              <span>Consultorio</span>
            </div>

          </div>
         

          <button 
              className="cerrar-sesion"
              onClick={handleLogout}
           >

            <FontAwesomeIcon icon={faRightFromBracket} />

            Cerrar sesión

          </button>

        </div>

      )}

    </div>
  );
};

export default MenuAplicaciones;