import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBroom } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "/src/css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";

import { turnosService } from "/src/services/turnos.service";

import { profesionesService } from "/src/services/profesiones.Service";
import { estadosService } from "/src/services/estados.service";
import MdlTurnoDetalle from "./mdlturnosdetalle_vers1";

function ConsultaTurnos() {
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);

  const [FechaDesde, SetFechaDesde] = useState(null);
  const [FechaHasta, SetFechaHasta] = useState(null);

  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState("");
  const [TipoProfesion, setTipoProfesion] = useState([]);
  const [Profesion, setProfesion] = useState("");
  const [idTipoProfesionSelected, setIdTipoProfesionSelected] = useState("");
  const [idEstadoSelected, setIDEstadoSelected] = useState("");
  const [estados, setEstados] = useState([]);
  const [Pagina, setPagina] = useState(1);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Paginas, setPaginas] = useState([]);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);



  const openMdlTurnoDetalle = (fila) => {
    setItem(fila);
    console.log(fila)
    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };

  const openMdlMensaje = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")

    setModalMostrarMensaje(true);
  };

  const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);
  };

  const limpiarTabla = () => {
    setItems([]);
    setCantidadTurnos(0);
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [profesionData] = await Promise.all([
          profesionesService.Buscar(),
        ]);

        setTipoProfesion(profesionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [estadosData] = await Promise.all([estadosService.Buscar()]);

        setEstados(estadosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    document.title = "Si.Ge.Tur. - Consultas Turnos";
  }, []);

  const limpiar = () => {
    setItems([]);
    SetFechaDesde("");
    SetFechaHasta("");

    setProfesion("TODOS");
    setCantidadTurnos("");
  };

  const formatearFecha = (fecha) => {
    let fechaActualParseada;

    // Caso 1: formato yyyy-MM-dd
    if (/\d{4}-\d{2}-\d{2}/.test(fecha)) {
      fechaActualParseada = parse(fecha, "yyyy-MM-dd", new Date());
    }
    // Caso 2: formato d/M/yyyy
    else if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(fecha)) {
      fechaActualParseada = parse(fecha, "d/M/yyyy", new Date());
    }

    // Formatear la fecha en dd/MM/yyyy
    return format(fechaActualParseada, "yyyy-MM-dd");
  };

  const handleFechaChangeDesde = (e) => {
    SetFechaDesde(e.target.value);

    // limpiarTabla();
  };

  const handleFechaChangeHasta = (e) => {
    SetFechaHasta(e.target.value);

    // limpiarTabla();
  };
  async function BuscarTurnosConsultasPorFecha(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }

    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    console.log(FechaDesde);
    console.log(FechaHasta);
    console.log(idTipoProfesionSelected);
    console.log(idEstadoSelected);
    console.log(_pagina);
    console.log(CantidaddeRegistros);

    const data = await turnosService.TurnosConsultaPorFecha(
      FechaDesde,
      FechaHasta,
      idTipoProfesionSelected,
      idEstadoSelected,
      _pagina,
      CantidaddeRegistros
    );

    if (data) {
      setItems(data.registros);

      setRegistrosTotal(data.total);
    } else {
      console.warn("No se encontraron datos o hubo un error");
    }
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  return (
    <>
      <div
        style={{
          width: "100%",

          marginTop: "0",
          marginBottom: "0",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "10px",
          backgroundColor: "white",
        }}
      >
        {/*  //fecha desde facha hasta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "",
            paddingBottom: "20px",
            paddingTop: "10px",
            gap: "10px",
            flexWrap: "wrap", // permite que baje en pantallas chicas
          }}
        >
          {/* Fecha desde */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <InputGroup.Text
              style={{
                backgroundColor: "white",
                color: "black",
                height: "28px",
              }}
            >
              Fecha desde:
            </InputGroup.Text>
            <Form.Control
              type="date"
              style={{ height: "28px" }}
              onChange={handleFechaChangeDesde}
              value={FechaDesde}
            />
          </div>

          {/* Fecha hasta */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <InputGroup.Text
              style={{
                color: "black",
                backgroundColor: "white",
                height: "28px",
              }}
            >
              Fecha hasta:
            </InputGroup.Text>
            <Form.Control
              type="date"
              style={{ height: "28px" }}
              onChange={handleFechaChangeHasta}
              value={FechaHasta}
            />
          </div>

          {/* Profesión */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                width: "auto",
                color: "black",
                backgroundColor: "white",
                height: "28px",
              }}
            >
              Profesión/servicio:
            </InputGroup.Text>
            <select
              style={{ width: "150px", height: "28px" }}
              onChange={(e) => setIdTipoProfesionSelected(e.target.value)}
              value={idTipoProfesionSelected}
            >
              <option value="">TODAS</option>
              {TipoProfesion.map((profesion) => (
                <option key={profesion.ID} value={profesion.ID}>
                  {profesion.descripcion}
                </option>
              ))}
            </select>
            {/* Botón */}
          </div>

          {/* Estado */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                width: "auto",
                color: "black",
                backgroundColor: "white",
                height: "28px",
              }}
            >
              Estados:
            </InputGroup.Text>
            <select
              style={{ width: "150px", height: "28px" }}
              onChange={(e) => setIDEstadoSelected(e.target.value)}
              value={idEstadoSelected}
            >
              <option value="">TODOS</option>
              {estados.map((estado) => (
                <option key={estado.IDEstado} value={estado.IDEstado}>
                  {estado.descripcion + " - " + estado.sigla}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Button
            variant="success"
            style={{
              height: "30px", // más alto
              fontSize: "16px", // texto más grande
              padding: "0px 20px", // más espacio interno
              whiteSpace: "nowrap",
            }}
            onClick={(event) => {
              event.preventDefault();
              BuscarTurnosConsultasPorFecha(1);
            }}
          >
            BUSCAR
          </Button>

          {/* Botón */}
          <Button
            variant="primary"
            size="sm"
            style={{
              height: "30px", // más alto
              fontSize: "16px", // texto más grande
              padding: "0px 20px", // más espacio interno
              marginLeft: "30px",
              whiteSpace: "nowrap",
            }}
            onClick={(event) => {
              event.preventDefault();
              limpiar();
            }}
          >
            LIMPIAR
          </Button>
        </div>
        <span
          style={{
            display: "block",
            height: "4px",
            backgroundColor: "gray",
            margin: "10px 0",
            width: "100%",
          }}
        ></span>

        <div className="">
          <Table bordered hover style={{ width: "100%" }}>
            <thead style={{ fontSize: "14px", backgroundColor: "white" }}>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "white",
                    width: "100px",
                  }}
                >
                  Fecha
                </th>

                <th
                  style={{
                    textAlign: "center",
                  }}
                  key="1"
                >
                  Hora
                </th>
                <th
                  style={{
                    textAlign: "left",
                  }}
                  key="2"
                >
                  Paciente
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                  key="3"
                >
                  Profesional
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                  key="4"
                >
                  Profesión
                </th>

                <th
                  style={{
                    textAlign: "center",

                    width: "200px",
                  }}
                  key="5"
                >
                  Estado
                </th>
                <th
                  style={{
                    textAlign: "center",

                    width: "200px",
                  }}
                  key="6"
                >
                  OO SS/Prepaga
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                  key="7"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((item) => {
                  // Formatear el campo "Descripcion" como hora

                  let buttonVariant;
                  let buttonText;
                  let isButtonDisabled = false;

                  // Definir variantes y textos según el estado
                  switch (item.sigla) {
                    case "ANU":
                      buttonVariant = "dark";
                      buttonText = item.estado;
                      break;
                    case "PEN":
                      buttonVariant = "warning";
                      buttonText = item.estado;
                      break;
                    case "PRE":
                      buttonVariant = "primary";
                      buttonText = item.estado;
                      break;

                    case "ACA":
                      buttonVariant = "info";
                      buttonText = item.estado;
                      break;
                    case "ASA":
                      buttonVariant = "danger";
                      buttonText = item.estado;
                      break;
                    case "PEN COB":
                      buttonVariant = "warning";
                      buttonText = item.estado;
                      break;
                    case "PRE COB":
                      buttonVariant = "primary";
                      buttonText = item.estado;
                      break;
                    case "NCI":
                      buttonVariant = "secondary";
                      buttonText = item.estado;
                      break;
                    case "PRE NCOB":
                      buttonVariant = "primary";
                      isButtonDisabled = true;
                      buttonText = item.estado;
                      break;

                    case "LIB":
                      if (Fecha < fechaActual) {
                        isButtonDisabled = true;
                      }
                      buttonVariant = "success";
                      buttonText = item.estado;

                      break;
                  }

                  return (
                    <tr key={item.idTurno}>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {format(new Date(item.fecha), "dd/MM/yyyy")}
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                          {item.hora}
                      </td>
                      <td style={{ textAlign: "left", fontSize: "12px" }}>
                        {item.paciente}
                      </td>
                      {/* Mostrar hora formateada */}
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.profesional}
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.profesion}
                      </td>{" "}
                      <td style={{ textAlign: "center", fontSize: "10px" }}>
                        <Button
                          variant={buttonVariant}
                          disabled={isButtonDisabled}
                          size="sm"
                          style={{
                            width: "70%",
                            textAlign: "center",
                            fontSize: "10px",
                          }}
                        >
                          {buttonText}
                        </Button>
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.obrasocial}
                      </td>
                      <td style={{ textAlign: "center", fontSize: "10px" }}>
                        {item.estado == "PENDIENTE" && (
                          <button
                            title="Anular turno"
                            className="btn btn-sm btn-light btn-danger"
                            onClick={(event) => {
                              event.preventDefault();

                              definirEstadosdeTurnos(item, "ANULAR");
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                        {item.estado !== "LIBRE" && (
                          <button
                            title="Detalle del turno"
                            className="btn btn-sm btn-light btn-success"
                            onClick={(event) => {
                              event.preventDefault();

                              openMdlTurnoDetalle(item);
                            }}
                          >
                            <i className="fa-solid fa-file-invoice-dollar"></i>
                          </button>
                        )}
                        {item.estado == "PRESENTE NO COBRADO" && (
                          <button
                            title="Registrar cobro"
                            className="btn btn-sm btn-light btn-success"
                            variant="outline-secondary"
                            onClick={(event) => {
                              event.preventDefault();

                              openMdlTurnoRegistrarCobro(item);
                            }}
                          >
                            <i className="fa-solid fa-dollar-sign"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
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
                  BuscarTurnosConsultasPorFecha(e.target.value);
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
        <span
          style={{
            display: "block",
            height: "4px",
            backgroundColor: "gray",
            margin: "10px 0",
            width: "100%",
          }}
        ></span>
      </div>

      {mdlTurnoDetalle && (
        <MdlTurnoDetalle
          show={openMdlTurnoDetalle}
          handleClose={CloseMdlTurnoDetalle}
          paciente={Item.paciente}
          profesional={Item.profesional}
          profesion={Item.profesion}
          obrasocial={Item.obrasocial}
          observaciones={"Falta observaciones"}
          hora={Item.hora}
          fecha={Item.fecha}
          estado={Item.estado}
          idturno={Item.idturno} 
          
        />
      )}
    </>
  );
}

export default ConsultaTurnos;
