import React, { useState } from "react";
import "../css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";



import "../css/tablapizaturnos.css";


import Mdlhorarioprofesional from "./mdlhorarioprofesional";
import Mdllistaespera from "./mdlListaEspera";
import RegistrarProfesional from './registrarprofesional';

function listarprofesionales({ toggleMostrarRegistrar }) {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Tamaño de la página
  const [totalPages, setTotalPages] = useState(0);

  const data = [
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "pasivo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "Rly", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "pasivo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
   
    { apellido: "FIGUEROA", nombres: "RO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "pasivo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "activo" },
    { apellido: "FIGUEROA", nombres: "RODOLFO ALFREDO", especialidad: "INGENIERO", DNI: "21382767", email: "ingfigueroa@hotmail.com", estado: "pasivo" },
  
   
   
  ];

  
  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEspera, setModalListaEspera] = useState(false);

  
  const [mostrarRegistroProfesional, setMostrarRegistroProfesional] =
    useState(false);

    const [mostrarListarProfesional, setMostrarListarProfesional] =
    useState(false);

  const MostrarRegistroProfesional = () => {
    setMostrarRegistroProfesional(true);
    setMostrarListarProfesional(false);
   
  };

  const openMdlHoraProfe = () => {
    setModalHoraProfe(true);
  };

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlListaEspera = () => {
    setModalListaEspera(true);
  };

  const closeMdlListaEspera = () => {
    setModalListaEspera(false);
  };

 // Función para cambiar de página
 const handleChangePage = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const [mostrarRegistrar, setMostrarRegistrar] = useState(false);

  const mostrarComponenteRegistrar = () => {
    setMostrarRegistrar(true);
  };

// Función para calcular el índice de inicio y fin de los datos en la página actual
const startIndex = (currentPage - 1) * pageSize;
const endIndex = currentPage * pageSize;

const [contador, setContador] = useState(0); // Inicializamos el contador en 0

  const numerarse = () => {
    setContador(contador + 1); // Incrementamos el contador en 1 y actualizamos el estado
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          width: "100%",
          margin: "15px 15px",
          backgroundColor: "white",
        }}
      >
        <div className="acomodarencabezadopizaturnos">
          <div style={{ width: "70%", textAlign: "center", color: "black" }}>
            <h3>Profesionales</h3>
          </div>
          <div style={{ width: "30%", textAlign: "right" }}>
         
           <button
              title="Registrar nuevo profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={toggleMostrarRegistrar}

            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>


       
        <div className="">
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
              <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    
                  
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  
                  }}
                >
                  Apellido
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="1">
                  Nombres
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="2">
                  Especialidad
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="3"
                >
                  DNI
                </th>

                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="4">
                 EMail
                </th>
                <th style={{ textAlign: "center",backgroundColor: "rgb(136, 161, 184)" }} key="4">
                 Estado
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="8"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.slice(startIndex, endIndex).map((item) => (
                <tr>
                <td style={{ textAlign: "center" }}>
                {contador}
               </td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>
                {item.apellido}
               </td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{item.nombres}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{item.especialidad}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{item.DNI}</td>
               <td style={{ textAlign: "center", fontSize:"12px" }}>{item.email}</td>
               <td style={{ textAlign: "center", fontSize:"12px"}}>
                  {item.estado === "activo" ? (
                      <Button variant="success" size="sm" style={{width:"70%"}}>
                        activo
                      </Button>
                    ) : item.estado === "pasivo" ? (
                      <Button variant="danger" size="sm" style={{width:"70%"}}>
                        pasivo
                      </Button>
                     )  : (
                      <Button variant="outline-danger" size="sm" style={{width:"70%"}}>
                        Estado no es LIB ni OTRA_OPCION
                      </Button>
                    )
                     }
                  </td>
                  <td style={{ textAlign: "center" }}>
                  <button
                      title="Editar profesional"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={openMdlListaEspera}
                    >
                      
                      <i class="fa-solid fa-user-pen"></i>
                    </button>
                    <button
                      title="Horarios profesional"
                      className="btn btn-sm btn-light btn-primary"
                      onClick={openMdlHoraProfe}
                    >
                      <i class="fa-solid fa-clock"></i>
                    </button>
                    <button
                      title="Lista de espera"
                      className="btn btn-sm btn-light btn-danger"
                      onClick={openMdlListaEspera}
                    >
                      <i class="fa-solid fa-book-open-reader"></i>
                      
                    </button>
                    
                  </td>
                </tr>
                //<TableRow item={item} />
              ))}
            </tbody>
          </Table>
        </div>
       {/* Paginación */}

      <div className="pagination">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleChangePage(1)}
          disabled={currentPage === 1}
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
         <i class="fa-solid fa-angle-left"></i>
        </button>
        <h6> </h6>
        <span className="page-number">
          Pág. {currentPage} of {Math.ceil(data.length / pageSize)}
        </span>
        <h6> </h6>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(Math.max(data.length ) / pageSize)
          }
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <button
          className="btn btn-primary btn-sm"
          
          onClick={() =>
            handleChangePage(Math.ceil(Math.max(data.length ) / pageSize))
          }
          disabled={
            currentPage === Math.ceil(Math.max(data.length ) / pageSize)
          }
        >
        <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>

      </div>

    
      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
        />
      )}

      {mdlListaEspera && (
        <Mdllistaespera
          show={openMdlListaEspera}
          handleClose={closeMdlListaEspera}
        />
      )}
    
       {mostrarRegistroProfesional && <RegistrarProfesional />}
       {}
    </>
  );
}

export default listarprofesionales;
