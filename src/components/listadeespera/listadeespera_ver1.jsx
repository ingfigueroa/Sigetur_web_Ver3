import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

import MdlAltaListadeEspera from "./registrarListadeEspera";

import { listadeesperaService } from "/src/services/listadeespera.service";

import modalDialogService from "/src/services/modalDialog.service";

import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import AsignarListadeEspera from "./asignarTurnoListadeEspera";

function listadeespera_v1() {
  const [mostrarModal, setMostrarModal] = useState(null);
   const [mostrarAsignar, setMostrarAsignar] = useState(false);
  

  const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Está seguro de ANULAR la fila de la LISTA DE ESPERA?"
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "LISTA DE ESPERA - ANULAR fila de la lista de espera"
  );
  const [Apellido, SetApellido] = useState(null);

  const [idFila, SetIDFila] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [mdlRegistrarListadeEspera, setModalRegistrarListadeEspera] = useState(false);
  const [mdlEditarPaciente, setMdlEditarPaciente] = useState(false);
  const [idpaciente, setIDPaciente] = useState(false);
  const [idprofesional, setIDProfesional] = useState(false);
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [apeyNomPaciente, setapeyNomPaciente] = useState(null);
  const [apeyNomProfesional, setapeyNomProfesional] = useState(null);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  
 

  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar
      eliminarFila(idFila);
      console.log("Usuario confirmó la eliminación");
      // Acá llamás a tu función para eliminar el objeto
    } else {
      console.log("Usuario canceló la operación");
    }
  };


  function ajustarHoraArgentina(fechaUTC) {
    return new Date(
      new Date(fechaUTC).getTime() + 3 * 60 * 60 * 1000
    ).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  function Limpiar() {
    setapeyNomPaciente("");
    setapeyNomProfesional("");
    
    
  }

  async function eliminarFila(id) {
    try {
      const data = await listadeesperaService.BajaFilaListadeEspera(id);
      cargarlistadeespera();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    document.title = "Si.Ge.Tur. - Lista de espera";
  }, []);

  async function Buscar(_pagina) {}

  const openMdlRegistrarListadeEspera = () => {
    setModalRegistrarListadeEspera(true);
  };

  const closeMdlRegistrarListadeEspera = () => {

    setModalRegistrarListadeEspera(false);
    cargarlistadeespera();
  };

  // Definís la función fuera del useEffect
  const cargarlistadeespera = async () => {
    try {
      const data = await listadeesperaService.getBuscar(
        Pagina,
        CantidaddeRegistros,
        apeyNomPaciente,
        apeyNomProfesional
      );

      setItems(data.registros);

      setRegistrosTotal(data.total);

      // Generar array de páginas para el paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);

      modalDialogService.BloquearPantalla(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

   const openAsignarListadeEspera = () => {
   

    setMostrarAsignar(true);
  };

  const closeAsignarListadeEspera = () => {
    setMostrarAsignar(false);
   
    Limpiar()
    
    
  };


  // Llamás a la función dentro del useEffect
  useEffect(() => {
    cargarlistadeespera();
  }, [apeyNomPaciente]);

  // Llamás a la función dentro del useEffect
  useEffect(() => {
    cargarlistadeespera();
  }, [Pagina, CantidaddeRegistros]);

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
        <form>
          <div className="acomodarencabezadopizaturnos">
            <div style={{ width: "30%", textAlign: "left" }}>
              <button
                title="Registrar en la lista de espera"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={(event) => {
                  event.preventDefault();
                  openMdlRegistrarListadeEspera();
                }}
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                title="Imprimir"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={() => Imprimir()}
              >
                <i class="fa fa-print"></i>
              </button>
            </div>
          </div>

          <hr></hr>

          <div className="acomodarencabezadopizaturnos">
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Paciente
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por apellido de paciente"
                aria-label="Buscar paciente"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setapeyNomPaciente(e.target.value.toUpperCase())
                }
                value={apeyNomPaciente}
                autoFocus
              />
              <Button
                title="Buscar por paciente"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => cargarlistadeespera()}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Profesional
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por apellido de profesional"
                aria-label="Buscar profesional"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setapeyNomProfesional(e.target.value.toUpperCase())
                }
                value={apeyNomProfesional}
                autoFocus
              />
              <Button
                title="Buscar por profesional"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => cargarlistadeespera()}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>

              <Button variant="success" onClick={() => Limpiar()}>
                Limpiar
              </Button>
            </InputGroup>
          </div>
        </form>

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
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Paciente
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "10%",
                  }}
                >
                  Fecha desde
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "10%",
                  }}
                >
                  Fecha hasta
                </th>

                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "20%",
                  }}
                >
                  Profesional
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "15%",
                  }}
                >
                  Profesión
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Hora desde
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Hora hasta
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.IDListaEspera}>
                    <td style={{ textAlign: "center" }}>
                      {Item.IDListaEspera}
                    </td>
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      {Item.paciente}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      {format(parseISO(Item.FechaDesde), "dd/MM/yyyy")}
                    </td>{" "}
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      {format(parseISO(Item.FechaHasta), "dd/MM/yyyy")}
                    </td>{" "}
                    <td style={{ textAlign: "left", fontSize: "12px" }}>
                      {Item.profesional}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.sexo === "1"
                        ? Item.profesionmasculina
                        : Item.sexo === "2"
                        ? Item.profesionfemenina
                        : "Sin especificar"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {ajustarHoraArgentina(Item.horadesde)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {ajustarHoraArgentina(Item.horahasta)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        title="Eliminar fila"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={() => {
                          SetIDFila(Item.IDListaEspera); // Guardás el ID a eliminar
                          setMostrarModal(true); // Mostrás el modal
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      
                      </button>
                        <button
                        title="Asignar un turno a la fila."
                        className="btn btn-sm btn-light btn-danger"
                         onClick={() => {
                          setapeyNomPaciente(Item.paciente)
                          setapeyNomProfesional(Item.profesional)
                          setIDProfesional(Item.idprofesional)
                          setIDPaciente(Item.idpaciente)
                          SetIDFila(Item.IDListaEspera)
                          setMostrarAsignar(true); // Mostrás el modal
                        }}
                      >
                       
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button
                        title="Ver detalle"
                        className="btn btn-sm btn-light btn-success"
                        /* onClick={(event) => {
                          event.preventDefault();

                          openMdlTurnoDetalle(item);
                        }} */
                      >
                        <i className="fa-solid fa-file-invoice-dollar"></i>
                      </button>
                    </td>
                  </tr>
                  //<TableRow item={item} />
                ))}
            </tbody>
          </Table>
        </div>
        {/* Paginador*/}
        <div className="paginador">
          <div className="row">
            <div className="col">
              <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
              Pagina: &nbsp;
              <select
                value={Pagina}
                onChange={(e) => {
                  Buscar(e.target.value);
                }}
              >
                {Paginas?.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; de {Paginas?.length}
            </div>

            <div className="col">
              Mostrar de a: &nbsp;
              <select
                value={CantidaddeRegistros}
                onChange={(e) => {
                  setCantidaddeRegistros(e.target.value);
                }}
              >
                {[10, 15, 20, 25].map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; registros.
            </div>
          </div>
        </div>
      </div>

      {mdlRegistrarListadeEspera && (
        <MdlAltaListadeEspera
          show={openMdlRegistrarListadeEspera}
          handleClose={closeMdlRegistrarListadeEspera}
        />
      )}

      <MDLEstaSeguro
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        mensajetitulo={mdlMensajeTitulo}
        mensajecuerpo={mdlMensajeCuerpo}
        enviaralpadre={mdlSiNo}
      />


       {mostrarAsignar && (
       <AsignarListadeEspera
        show={openAsignarListadeEspera}
        handleClose={closeAsignarListadeEspera}
        idprofesional={idprofesional}
        idpaciente={idpaciente}
        apeynomprofesional={apeyNomProfesional}
        apeynompaciente={apeyNomPaciente}
       
        idlistadeespera={idFila}
        
      />)}
    </>
  );
}

export default listadeespera_v1;
