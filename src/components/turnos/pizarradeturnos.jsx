import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import "/src/css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";
import MdlAltaTurno from "./mdlaltaturno";
import MdlTurnoDetalle from "./mdlturnodetalle";
import Mdlanularturno from "./mdlanularturno";
import Mdlanulartodoslosturnos from "./mdlanulartodoslosturnos";
import Mdlturnoregistrarcobro from "./mdlturnoregistrarcobro";
import MdlCambiarEstado from "../modales/mdlCambiarEstado";

import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";
import Mdllistaespera from "../mdlListaEspera";

import MdlAnular from "../modales/mdlAnular";
import MdlMensaje from "../modales/mdlMensaje";

import { turnosService } from "/src/services/turnos.service";
import { profesionalesService } from "/src/services/profesional.service";

function tablapizarradeturnos() {
  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);
  const [mdlSiNoMensaje, setModalSiNoMensaje] = useState(null);
  const [mdlcambiarestado, setCambiarEstado] = useState(null);
  const [mdlcambiarestadoMensaje, setCambiarEstadoMensaje] = useState("");

  const [mdlSiNo, setModalSiNo] = useState(null);
  const [mdlAnularTurno, setModalAnularTurno] = useState(false);
  const [mdlAnularTodosLosTurnos, setModalAnularTodosLosTurnos] =
    useState(false);
  const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
  const [mdlMensaje, setModalMensaje] = useState(false);
  const [btnAnular, setBtnAnular] = useState(true);

  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEspera, setModalListaEspera] = useState(false);
  const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);

  const [IDProfesional, SetIDProfesional] = useState(null);
  const [IDProfesion, SetIDProfesion] = useState(null);
  const [IDEstado, setIdEstado] = useState(null);
  const [anular, setAnular] = useState(false);

  const [Fecha, SetFecha] = useState(new Date().toLocaleDateString());

  const [HoraTurno, setHoraTurno] = useState();
  const [HoraActual, setHoraActual] = useState();

  const fechaActualSinParsear = new Date().toLocaleDateString();

  const [FechaLarga, SetFechaLarga] = useState(null);

  const [idusuario, setUsuario] = useState("2");

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [mdlRegistrarTurno, setModalRegistrarTurno] = useState(false);

  const [apeyNom, setapeyNom] = useState(null);
  const [profesion, setProfesion] = useState(null);

  const [turnos, setTurnos] = useState([]);

  const horaActual = new Date().toLocaleTimeString(); 

  const [cantidadTurnos, setCantidadTurnos] = useState(0);

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

  const openMdlListarProfesionales = () => {
    setModalListarProfesionales(true);
  };

  const closeMdlListarProfesionales = () => {
    setModalListarProfesionales(false);

    limpiarTabla();
  };

  const openMdlTurnoDetalle = (fila) => {
    setItem(fila);
    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };

  const openMdlAnularTodosLosTurnos = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")
    setModalAnularTodosLosTurnos(true);
  };

  const closeMdlAnularTodosLosTurnos = () => {
    setModalAnularTodosLosTurnos(false);

    BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
  };
  const openMdlAnularTurno = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")
    setModalAnularTurno(true);
  };

  const closeMdlAnularTurno = () => {
    setModalAnularTurno(false);
  };

  const openMdlMensaje = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")

    setModalMostrarMensaje(true);
  };

  const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);
  };

  const [mdlturnoregistrarcobro, setModalTurnoRegistrarCobro] = useState(false);

  const openMdlTurnoRegistrarCobro = (fila) => {
    setItem(fila);
    setModalTurnoRegistrarCobro(true);
  };

  const closeMdlTurnoRegistrarCobro = () => {
    setModalTurnoRegistrarCobro(false);
    BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
  };

  const definirEstadosdeTurnos = (fila, VieneDE) => {
    try {
      setItem(fila);
      setIdEstado(fila.idestado);
      if (fila.estado == "LIBRE" && VieneDE == "LIBRE") {
        openMdlRegistrarTurno(fila);
      } else if (fila.estado == "PENDIENTE" && VieneDE == "PENDIENTE") {
        setCambiarEstadoMensaje(
          "¿Esta seguro de cambiar el estado del turno a PRESENTE?"
        );
        setCambiarEstado(true);
      } else if (fila.estado == "PENDIENTE" && VieneDE == "ANULAR") {
        // setModalSiNoMensaje("¿Esta seguro de anular el turno?");

        openMdlAnularTurno();
      }

      setItem(fila);
      BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
    } catch (error) {}
  };

  const handleYes = (observaciones) => {
    TurnosCambiarEstado(Item, "PNC", observaciones);

    BuscarTurnosProfesionalFecha(IDProfesional, Fecha);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const handleAnular = (observaciones) => {
    TurnosCambiarEstado(Item, "ANULAR", observaciones);
    setAnular(false);
    BuscarTurnosProfesionalFecha(IDProfesional, Fecha);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const handleClose = () => {
    setCambiarEstado(false);
  };

  const openMdlRegistrarTurno = (fila) => {
    setFilaSeleccionada(fila);

    setModalRegistrarTurno(true);
  };

  const closeMdlRegistrarTurno = () => {
    setModalRegistrarTurno(false);

    BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    SetIDProfesional(datoRecibido);
  
    BuscarProfesionalyProfesion(datoRecibido);
    limpiarTabla();
  };

  const limpiarTabla = () => {
    setItems([]);
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

  const handleFechaChange = (e) => {
    SetFecha(e.target.value);

    const fechaISO = e.target.value;

    // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
    const fechaObj = new Date(fechaISO);

    // Ajustar la fecha al UTC manualmente
    const fechaLocal = new Date(
      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
    );

    // Formatear usando toLocaleString o date-fns como prefieras
    const fechaLarga = fechaLocal.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    SetFechaLarga(fechaLarga);
    limpiarTabla();
  };
  const fechaActual = formatearFecha(fechaActualSinParsear);

  async function TurnosProfesionalDiaAnulados(idprofesional, fecha) {
    if (idprofesional > 0) {
      try {
        const data = await turnosService.TurnosPorProfesionalDiaCancelados(
          idprofesional,
          fecha
        );

        // Devuelve true si hay registros, de lo contrario, false
        // Agrega este console para ver qué se devuelve

        // Asegúrate de que data sea un array antes de verificar su longitud
        if (Array.isArray(data) && data.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error al buscar turnos:", error);
        return false;
      }
    }
    return false; // En caso de que idprofesional no sea válido
  }

  async function BuscarTurnosPorProfesionalPorFecha(
    idusuario,
    idprofesional,
    fecha
  ) {
    // Convierte la fecha actual a formato corto

    if (fecha >= fechaActual) {
      if (idprofesional > 0) {
        const data = await turnosService.CrearTurnosPorProfesionalPorFecha(
          idusuario,
          idprofesional,
          fecha
        );
        setTurnos(data);
       
      }
    }
    BuscarTurnosProfesionalFecha(idprofesional, fecha);
  }

  async function BuscarTurnosProfesionalFecha(idprofesional, fecha) {
    if (idprofesional > 0) {
      const data = await turnosService.BuscarPorProfesionalFecha(
        idprofesional,
        fecha
      );

      if (data) {
        const cantRegistros = data.length;
        setCantidadTurnos(cantRegistros);
     

        if (cantRegistros == 0) {
          limpiarTabla();

          const hayTurnosAnulados = await TurnosProfesionalDiaAnulados(
            idprofesional,
            fecha
          );
          if (hayTurnosAnulados) {
            setModalMensaje(
              "Por PEDIDO DEL PROFESIONAL, se CANCELARON LOS TURNOS para esta fecha."
            );
          } else {
            setModalMensaje(
              "Sin registros. No hay turnos para ese profesional en la fecha elegida. El profesional no atiende este día."
            );
          }

          openMdlMensaje();
        } else {
          setItems(data); // Asignar los datos a `Items`
          setTurnos(data);
        }
        // Asegúrate de que `Apellido` y `Nombres` existen en `data`
      }
    }
  }

  async function BuscarProfesionalyProfesion(idprofesional) {
    
    const data = await profesionalesService.Buscar(idprofesional);

    if (data) {
      setItems(data); // Asignar los datos a `Items`

      // Asegúrate de que `Apellido` y `Nombres` existen en `data`
      if (data[0].Apellido && data[0].Nombres) {
        setapeyNom(`${data[0].Apellido}, ${data[0].Nombres}`); // Concatenar apellido y nombres
        setProfesion(data[0].tprofesion)
      } else {
        console.error(
          "Los datos del profesional no contienen Apellido o Nombres."
        );
      }

      if (data[0].especialidad) {
        setProfesion(data[0].especialidad); // Asignar especialidad
        SetIDProfesion(data[0].idtipoprofesion);
      }
    }
    setItems([]);
    //generar array de las páginas para mostrar en select del paginador
  }

  async function TurnosCambiarEstado(fila, vieneDE, obs) {
    try {
      const data = await turnosService.TurnosCambiarEstado(
        fila.idTurno,
        fila.idestado,
        obs,
        idusuario,
        vieneDE
      );
    } catch (error) {}
  }

  useEffect(() => {
    if (HoraTurno < horaActual ) {
      setModalMensaje(
        "No se puede dar un turno cuando ya pasó la hora del mismo."
      );
      openMdlMensaje();
      setModalRegistrarTurno(false);

    }
  }, [HoraTurno]);

  useEffect(() => {
    
    // Aquí puedes realizar cualquier acción adicional cuando cantidadTurnos cambia
  }, [cantidadTurnos]);

  


  return (
    <>
      <div
        style={{
          width: "100%",

          marginTop: "0",
          marginBottom: "0",
        }}
      >
        <div style={{ display: "flex", backgroundColor: "white" }}>
          <div style={{ width: "60%", textAlign: "center", display: "grid" }}>
            <h2> Pizarra de turnos</h2>
          </div>
          <div style={{ width: "40%", textAlign: "right" }}>
            <button
              title="Anular todos los turnos del día."
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={turnos.length == 0 || Fecha <= fechaActual}
              onClick={(event) => {
                event.preventDefault();

                if (Fecha <= fechaActual) {
                  setModalMensaje(
                    "Fecha expirada. No se puede ANULAR LOS TURNOS."
                  );
                  openMdlMensaje();
                  return;
                }
                if (Items.length == 0) {
                  return;
                } else {
                  setBtnAnular(true);
                  openMdlAnularTodosLosTurnos();
                }
              }}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <button
              title="Email a todos los turnos a toda la grilla"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
            >
              <i class="fa-solid fa-at"></i>
            </button>
            <button
              title="Agenda Semanal"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
            >
              <i class="fa-solid fa-calendar-days"></i>
            </button>

            <button
              title="Horarios del profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlHoraProfe}
            >
              <i class="fa-solid fa-clock"></i>
            </button>
            <button
              title="Lista de espera"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              onClick={openMdlListaEspera}
            >
              <i class="fa-solid fa-book-open-reader"></i>
            </button>
          </div>
        </div>

        <hr></hr>
        <div>
          <div
            style={{
              display: "grid",
              width: "80%",
              paddingtop: "0",
            }}
          >
            <div style={{ witdh: "100%" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                  }}
                >
                  Elegir fecha:
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar profesional"
                  aria-label="Buscar profesional"
                  aria-describedby="basic-addon2"
                  type="date"
                  onChange={handleFechaChange}
                  value={Fecha}
                />
                <Form.Control
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                    marginLeft: "15px",
                    width: "50%",
                  }}
                  aria-describedby="basic-addon2"
                  readOnly
                  value={FechaLarga}
                />
              </InputGroup>
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: "45%",
              }}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                  }}
                >
                  Profesional:
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar profesional"
                  aria-label="Buscar profesional"
                  aria-describedby="basic-addon2"
                  readOnly
                  value={apeyNom}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{ backgroundColor: "#002d38", height: "38px" }}
                  color="white"
                  onClick={openMdlListarProfesionales}
                  /* onClick={() => BuscarTurnosProfesionalFecha() } */
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
              </InputGroup>
            </div>
            <div
              style={{
                width: "35%",
              }}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                  }}
                >
                  Servicio:
                </InputGroup.Text>
                <Form.Control
                  placeholder="Profesión"
                  aria-label="Profesión"
                  aria-describedby="basic-addon2"
                  style={{ marginght: "20px" }}
                  readOnly
                  value={profesion}
                />
              </InputGroup>
            </div>
            <div
              style={{
                width: "20%",
                textAlign: "right",
                marginRight: "15px",
              }}
            >
              <Button
                variant="success"
                size="sm"
                style={{ width: "70%", textAlign: "center" }}
                onClick={(event) => {
                  event.preventDefault();

                  BuscarTurnosPorProfesionalPorFecha(
                    idusuario,
                    IDProfesional,
                    Fecha
                  );
                }}
              >
                Burcar Turnos
              </Button>
            </div>
          </div>
        </div>
        <div
              style={{
                width: "35%",
              }}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",
                  }}
                >
                  Cantidad de turnos:
                </InputGroup.Text>
                <Form.Control
                  placeholder="turnos"
                  aria-label="cantturnos"
                  aria-describedby="basic-addon2"
                  style={{ marginght: "20px" }}
                  readOnly
                  value={cantidadTurnos}
                />
              </InputGroup>
            </div>
        <div className="acomodartabla">
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width: "200px",
                  }}
                >
                  Estado
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="2">
                  Paciente
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

                <th style={{ backgroundColor: "rgb(136, 161, 184)" }} key="4">
                  Obra social
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
              {Items &&
                Items.map((item) => {
                  // Formatear el campo "Descripcion" como hora

                  let buttonVariant;
                  let buttonText;
             
                 
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
                      buttonText = item.estado;
                      break;

                    case "LIB":
                      buttonVariant = "success";
                      buttonText = item.estado;

                      break;
                  }

                  return (
                    <tr key={item.idTurno}>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        <Button
                          variant={buttonVariant}
                          size="sm"
                          style={{ width: "70%", textAlign: "center" }}
                          onClick={(event) => {
                            event.preventDefault();
                            setHoraTurno(item.desde); // Actualiza `setHoraTurno` con `item.desde`

                            // Obtiene la hora actual y la asigna a `setHoraActual`
                            // O ajusta el formato según lo necesites
                            setHoraActual(horaActual);
                     

                            if (item.estado == "PENDIENTE") {
                              if (Fecha > fechaActual) {
                                setModalMensaje(
                                  "No se puede dar el PRESENTE en esta fecha. El PRESENTE se da a partir de la fecha del turno."
                                );
                                openMdlMensaje();
                                return;
                              }
                            /*   if (HoraTurno < horaactual) {
                                setModalMensaje(
                                  "No se puede dar un turno cuando ya paso la hora del mismo."
                                );
                                openMdlMensaje();
                                return;
                              }
 */
                              definirEstadosdeTurnos(item, "PENDIENTE");
                            } else if (item.estado == "LIBRE") {
                              if (Fecha >= fechaActual) {
                                definirEstadosdeTurnos(item, "LIBRE");
                              } else {
                                setModalMensaje(
                                  "Fecha expirada. No se puede cambiar el estado del turno."
                                );
                                openMdlMensaje();
                              }
                            }
                          }}
                        >
                          {buttonText}
                        </Button>
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.desde}
                        
                      </td>{" "}
                      {/* Mostrar hora formateada */}
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        <Button
                          variant=""
                          size="sm"
                          style={{ width: "70%", textAlign: "center" }}
                        >
                          {item.apeNom}
                        </Button>
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.nroDoc > 0 ? item.nroDoc : null}
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
                        {item.os}
                      </td>
                      <td style={{ textAlign: "center", fontSize: "12px" }}>
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
      </div>

      {mdlRegistrarTurno && (
        <MdlAltaTurno
          show={openMdlRegistrarTurno}
          handleClose={closeMdlRegistrarTurno}
          fila={filaSeleccionada}
          ApeyNom={apeyNom}
          FechaTurno={Fecha}
          profesion={profesion}
        />
      )}

      {mdlTurnoDetalle && (
        <MdlTurnoDetalle
          show={openMdlTurnoDetalle}
          handleClose={CloseMdlTurnoDetalle}
          fila={Item}
        />
      )}

      {mdlturnoregistrarcobro && (
        <Mdlturnoregistrarcobro
          show={openMdlTurnoRegistrarCobro}
          handleClose={closeMdlTurnoRegistrarCobro}
          fila={Item}
          idprofesion={IDProfesion}
        />
      )}
      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
          idprofesional={IDProfesional}
          fecha={fechaActual}
          profesional={apeyNom}
        />
      )}

      {mdlListaEspera && (
        <Mdllistaespera
          show={openMdlListaEspera}
          handleClose={closeMdlListaEspera}
        />
      )}

      {mdlListaProfesionales && (
        <MdlListarProfesionales
          show={openMdlListarProfesionales}
          handleClose={closeMdlListarProfesionales}
          enviarAlPadre={recibirDatoDelHijo}
        />
      )}

      {mdlcambiarestado && (
        <MdlCambiarEstado
          show={setCambiarEstado}
          handleClose={handleClose}
          enviarAlPadre={handleYes}
          fila={Item}
        />
      )}

      {mdlAnularTurno && (
        <Mdlanularturno
          show={setModalAnularTurno}
          handleClose={closeMdlAnularTurno}
          enviarAlPadre={handleAnular}
          fila={Item}
        />
      )}

      {mdlAnularTodosLosTurnos && (
        <Mdlanulartodoslosturnos
          show={setModalAnularTodosLosTurnos}
          handleClose={closeMdlAnularTodosLosTurnos}
          fecha={Fecha}
          idprofesional={IDProfesional}
          idusuario={idusuario}
          apeynom={apeyNom}
          vienede="pizarraturnos"
          observaciones="POR PEDIDO DEL PROFESIONAL, SE CANCELAN LOS TURNOS DE ESTE DÍA."
        />
      )}

      {mdlModalMostarMensaje && (
        <MdlMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mdlMensaje}
        />
      )}
    </>
  );
}

export default tablapizarradeturnos;
