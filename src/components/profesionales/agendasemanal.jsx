import React, { useState, useEffect, useRef } from "react";
/* import { format, parse } from "date-fns"; */
import { format, addDays, parse } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import "/src/css/pizarradeturnos.css";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";
import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import { turnosService } from "/src/services/turnos.service";
import { profesionalesService } from "/src/services/profesional.service";
import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";

import MdlAltaTurno from "../turnos/mdlaltaturno";
import MdlMensaje from "../modales/MdlMensaje";
import MdlCambiarEstado from "../modales/mdlCambiarEstado";
import CobrarModal from "../cobros/cobrarmodal";
import MdlRegistrarPrestaciones from "../turnos/mdlregistrarprestaciones";
import MdlTurnoDetalle from "../turnos/mdlturnosdetalle_vers1";
import { TuneOutlined } from "@mui/icons-material";
import { getClienteId, getUsuarioId } from "../utils/auth";

import { getMonday} from "../utils/fecha";

const agendasemanal = ({ show, handleClose }) => {

  
    const ClienteID = getClienteId();
    const UserID = getUsuarioId();

  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [mdlcambiarestadoMensaje, setCambiarEstadoMensaje] = useState("");
  const [IDProfesional, SetIDProfesional] = useState("");
  const [IDProfesion, SetIDProfesion] = useState(null);
  const [IDEstado, setIdEstado] = useState(null);
  const [mdlcambiarestado, setCambiarEstado] = useState(null);
  const [HoraTurno, setHoraTurno] = useState();
  const [modalMessage, setModalMessage] = useState("");
  const [modalTituloMessage, setModalTituloMessage] = useState("");
  const [modalAltaExitosa, setModalAltaExitosa] = useState(false);
    const [mdlHoraProfe, setModalHoraProfe] = useState(false);
      const [descripcion, setDescripcion] = useState("");

      const [showCobro, setShowCobro] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [FechaLarga, SetFechaLarga] = useState(null);

  const [idusuario, setUsuario] = useState("2");
  const [idTurno, setIDTurno] = useState();

  const [apeyNom, setapeyNom] = useState(null);
  const [profesion, setProfesion] = useState(null);

  const [turnos, setTurnos] = useState([]);

  const [cantidadTurnos, setCantidadTurnos] = useState([]);

  const [fechaTurno, setFechaTurno] = useState(null);

  const [fechaTurnoBD, setFechaTurnoBD] = useState(null);

  const [mdlRegistrarTurno, setModalRegistrarTurno] = useState(false);

  const [Fecha, SetFecha] = useState(null);

  const [fechaSistema, setFechaSistema] = useState(null);

  const horaActual = new Date().toLocaleTimeString();

  const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);
  const [fechaComienzoSemana, setFechaComienzoSemana] = useState("");

  const [fechaActual, setFechaActual] = useState("");

  const [diasSemana, setDiasSemana] = useState([]);

  const [mdlMensaje, setModalMensaje] = useState(false);
  const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
  const [mdlturnoregistrarcobro, setModalTurnoRegistrarCobro] = useState(false);
  const [mdlregistrarprestaciones, setModalRegistrarPrestaciones] = useState(false);

  const closeMdlCobrar = () => {
    setShowCobro(false);
    BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);
  };

  const openMdlCobrar = (fila) => {
    setItem(fila)
    setShowCobro(true);

    
  };
    const openMdlTurnoRegistrarPrestaciones = (fila) => {
    setItem(fila);
    setModalRegistrarPrestaciones(true);
  };

  
  const closeMdlTurnoRegistrarPrestaciones = () => {
    setModalRegistrarPrestaciones(false);
    BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);
  };

  const openMdlTurnoDetalle = (fila) => {
    setItem(fila);

    setIDTurno(fila.idTurno);

    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };

  const handleYes = (observaciones) => {
    TurnosCambiarEstado(Item, "PNC", observaciones);

    BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  async function TurnosCambiarEstado(fila, vieneDE, obs) {
    try {
      const data = await turnosService.TurnosCambiarEstado(
        fila.idTurno,
        fila.idestado,
        obs,
        idusuario,
        vieneDE
      );
      BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);

    } catch (error) {}
  }


  const formatearFecha_yyyy_mm_dd = (fecha) => {
    let fechaActualParseada;

    if (fecha instanceof Date) {
      fechaActualParseada = fecha;
    } else if (typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      fechaActualParseada = parse(fecha, "yyyy-MM-dd", new Date());
    } else if (
      typeof fecha === "string" &&
      /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)
    ) {
      fechaActualParseada = parse(fecha, "d/M/yyyy", new Date());
    } else if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
      fechaActualParseada = new Date(fecha);
    } else {
      console.error("Formato de fecha no reconocido:", fecha);
      return "";
    }

    // 👉 Forzar a UTC para que no reste horas
    return format(
      new Date(
        fechaActualParseada.getTime() -
          fechaActualParseada.getTimezoneOffset() * 60000
      ),
      "yyyy-MM-dd"
    );
  };

  const openMdlHoraProfe = () => {
    setModalHoraProfe(true);
  };

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlMensaje = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")
    console.log("pasa por open");
    setModalMostrarMensaje(true);
  };

  const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    SetIDProfesional(datoRecibido);
  
    BuscarProfesionalyProfesion(ClienteID, datoRecibido);
    limpiarTabla();
  };

  const closeCambiarAPresente = () => {
    setCambiarEstado(false);

     BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);

  };

  const openMdlRegistrarTurno = (fila) => {
    setFilaSeleccionada(fila);

    setModalRegistrarTurno(true);
  };

  const closeMdlRegistrarTurno = () => {
    setModalRegistrarTurno(false);

     BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);

  };

  const openMdlListarProfesionales = () => {
    
    setModalListarProfesionales(true);
  };

  const closeMdlListarProfesionales = () => {
    setModalListarProfesionales(false);
    limpiarTabla();
  };

  const limpiarTabla = () => {
    setTurnos([]);
  };

  const limpiar = () => {
    setItems([]);
    SetFecha("");
    setapeyNom("");
    setProfesion("");
    setCantidadTurnos("0");
    SetFechaLarga("");
    setTurnos([]);
    setCantidadTurnos(0);
    SetIDProfesional(0);
  };

  
  // función que devuelve array de lunes a domingo

  const getWeekDates = (fechaBase) => {
    const base = new Date(fechaBase);

    console.log(fechaBase)


    // si la fecha es inválida, uso hoy
    if (isNaN(base)) {
      console.warn("⚠️ Fecha inválida en getWeekDates, uso hoy");
      base.setHours(0, 0, 0, 0);
    }

    const monday = getMonday(fechaBase);

    console.log(monday)
    

    setFechaComienzoSemana(formatearFecha_yyyy_mm_dd(monday));

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      // Nombre legible del día
      const nombre = d
        .toLocaleDateString("es-ES", {
          weekday: "long", // lunes, martes...
          day: "numeric", // 11
          month: "long", // agosto
        })
        .replace(",", "");

      // Fecha en formato yyyy-mm-dd (local)
      const fecha = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;

      return { nombre, fecha };
    });

    return weekDates;
  };

  const definirEstadosdeTurnos = (fila, VieneDE) => {
    try {
      setItem(fila);
      setIdEstado(fila.idestado);

      //3676903
      if (fila.estado === "LIBRE" && VieneDE == "LIBRE") {
        openMdlRegistrarTurno(fila);
      } else if (fila.estado == "PENDIENTE" && VieneDE == "PENDIENTE") {
        console.log("Pasa por aca:" + fila.estado + ". Viene de: " + VieneDE);
        setCambiarEstadoMensaje(
          "¿Esta seguro de cambiar el estado del turno a PRESENTE?"
        );
        setCambiarEstado(true);
      } else if (fila.estado == "PENDIENTE" && VieneDE == "ANULAR") {
        // setModalSiNoMensaje("¿Esta seguro de anular el turno?");

        openMdlAnularTurno();
      } else if (fila.estado == "PRES NCOB" && VieneDE == "PRENOCOBRADO") {
        // setModalSiNoMensaje("¿Esta seguro de anular el turno?");
        openMdlAnularTurno();
      }

       BuscarTurnosProfesionalFecha(ClienteID, IDProfesional, fechaComienzoSemana, UserID);

    } catch (error) {}
  };

  async function BuscarTurnosProfesionalFecha(idcliente, idprofesional, fecha, idusuario) {
    if (fecha === null) return;
   

    if (idprofesional > 0) {
      // BuscarTurnosFechasAgrupadas(idprofesional, fecha);
      const data = await turnosService.Agendasemanal_PorProfesionalPorFecha(
        idcliente,
        idprofesional,
        fecha,
        idusuario

      );
      
      setCantidadTurnos(data.length);

      setTurnos(data);
    }
  }

  async function BuscarProfesionalyProfesion(idcliente, idprofesional) {
    const data = await profesionalesService.BuscarId(idcliente, idprofesional);
    console.log(data)
    if (data) {
      setItems(data); // Asignar los datos a `Items`

      // Asegúrate de que `Apellido` y `Nombres` existen en `data`
      if (data[0].Apellido && data[0].Nombres) {
        setapeyNom(`${data[0].Apellido}, ${data[0].Nombres}`); // Concatenar apellido y nombres
        setProfesion(data[0].tprofesion);
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
  // 1. Agrupar turnos por fecha

  const maxTurnosPorDia = Math.max(
    ...turnos.map((fecha) => {
      const cantidad = turnos.filter((t) => t.fecha === fecha.fecha).length;

      return cantidad;
    }),
    0
  );

  const getButtonProperties = (sigla, fecha, hora, sobreturno, paciente) => {
    let buttonVariant = "success"; // Color por defecto
    let buttonText = hora;
    let isButtonDisabled = false;

    const ahora = new Date();
    const fechaActual1 = formatearFecha_yyyy_mm_dd(ahora); // Fecha actual YYYY-MM-DD
    const fecha1 = formatearFecha_yyyy_mm_dd(fecha);
    // Obtener la hora actual en formato HH:MM
    const horaActual1 = format(new Date(), "HH:mm"); // Extrae "HH:MM"
    //const hora1 = format(new hora, "HH:mm"); // Extrae "HH:MM"
    // Validar que fecha y hora sean correctas
    if (!fecha1 || !hora) {
      return { buttonVariant, buttonText, isButtonDisabled };
    }

    // Comparar fecha y hora por separado

    if (sigla === "LIB") {
      /*       console.log("Fecha del sistema " + fechaActual1)
      console.log("Fecha del turno " + fecha1) */
      if (fechaActual1 > fecha1) {
        isButtonDisabled = true;
      } else if (fechaActual1 === fecha1) {
        /*         console.log("Hora del sistema " + horaActual1)
        console.log("Hora del turno " + hora) */

        if (horaActual1 > hora) {
          isButtonDisabled = true; // Si la fecha ya pasó, deshabilitar botón
        }
      }
    }

   /*  if (estado === "ANU") {
      isButtonDisabled = true;
    } */
    
    switch (sigla) {
      case "ANU":
        buttonVariant = "dark";
        isButtonDisabled = true;
        break;
      case "PEN":
        if (!sobreturno) {
          buttonVariant = "warning";
        } else {
          buttonVariant = "info";
        }

        break;
      case "PRE":
        buttonVariant = "primary";
        break;
      case "ACA":
        buttonVariant = "danger";
        break;
      case "ASA":
        buttonVariant = "danger";
        break;
      case "PEN COB":
        
        buttonVariant = "danger";
        break;
      case "COB":
        buttonVariant = "primary";
        break;
      case "NCI":
        buttonVariant = "secondary";
        break;
      case "PRE NCOB":
        buttonVariant = "info";
        break;
      case "LIB":
        buttonVariant = "success";
        break;
      default:
        buttonVariant = "secondary";
    }
    if (paciente === true) {
      buttonVariant = "secondary";
    }
    return { buttonVariant, buttonText, isButtonDisabled };
  };

  //const fechaActual = formatearFecha(fechaActualSinParsear);

  useEffect(() => {
    document.title = "Si.Ge.Tur. - Agenda Semanal";
    const hoy = new Date();

    //formateamos la fecha del dia a yyyy-mm-dd
    const setFechaActual1 = formatearFecha_yyyy_mm_dd(hoy);

    //pasar la fecha al calendar
    setFechaActual(setFechaActual1);

    //mantiene la fecha de hoy
    setFechaSistema(setFechaActual1);

    //armamos el array con los dias de la semana
    setDiasSemana(getWeekDates(setFechaActual1));
  }, []);


  return (
    <>
      <div
        style={{
          width: "100%",

          marginTop: "0",
          marginBottom: "0",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            marginBottom: "5px",
          }}
        >
          <div style={{ width: "40%", textAlign: "left", marginTop: "10px" }}>
            <button
              title="Enviar mail al profesional de los turnos de la semana.."
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled="true"
              /* style={{ display: "none" }} */
            >
              <i class="fa-solid fa-envelope"></i>
            </button>
            <button
              title="Dashboard"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled="true"
              // style={{ display: "none" }}
            >
              <i class="fa-solid fa-chart-pie"></i>
            </button>
            <button
              title="Horarios del profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={turnos.length == 0}
              onClick={(event) => {
                event.preventDefault();
                setDescripcion(event.currentTarget.textContent.trim());
                openMdlHoraProfe();
              }}
            >
              <i class="fa-solid fa-clock"></i>
            </button>
          </div>
        </div>

        <hr></hr>
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: "95%",
              backgroundColor: "",
            }}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",

                  color: "white",
                  height: "28px",
                  width: "15%",
                  textAlign: "center",
                }}
              >
                Fecha:
              </InputGroup.Text>
              <Form.Control
                style={{
                  height: "28px",
                  flex: "0 0 25%",
                }}
                placeholder="Buscar profesional"
                aria-label="Buscar profesional"
                aria-describedby="basic-addon2"
                type="date"
                onChange={(e) => {
                  const nuevaFecha = e.target.value; // yyyy-mm-dd
                  setFechaActual(nuevaFecha); // guardás en tu estado

                  setDiasSemana(getWeekDates(nuevaFecha)); // recalculás semana
                }}
                value={fechaActual}
              />
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "28px",
                }}
              >
                Profesional:
              </InputGroup.Text>
              <Form.Control
                style={{
                  textAlign: "center",
                  width: "25%",
                  height: "28px",
                }}
                placeholder="Buscar profesional"
                aria-label="Buscar profesional"
                aria-describedby="basic-addon2"
                readOnly
                value={apeyNom}
              />
              <Button
                size="sm"
                title="Buscar profesional."
                variant="outline-secondary"
                id="button-addon1"
                style={{ backgroundColor: "white", height: "28px" }}
                color="white"
                onClick={openMdlListarProfesionales}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "28px",
                }}
              >
                Servicio:
              </InputGroup.Text>
              <Form.Control
                style={{
                  textAlign: "center",
                  width: "15%",
                  height: "28px",
                }}
                placeholder="Profesión"
                aria-label="Profesión"
                aria-describedby="basic-addon2"
                readOnly
                value={profesion}
              />
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "28px",
                  width: "20%",
                }}
              >
                Cantidad de turnos:
              </InputGroup.Text>
              <Form.Control
                style={{
                  textAlign: "center",
                  height: "28px",
                  flex: "0 0 20%", // Establece un ancho del 30% fijo sin crecimiento
                }}
                placeholder="turnos"
                aria-label="cantturnos"
                aria-describedby="basic-addon2"
                readOnly
                value={cantidadTurnos}
              />
            </InputGroup>

            <InputGroup
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            ></InputGroup>
          </div>
          <div
            style={{
              display: "grid",
              width: "15%",

              backgroundColor: "",
            }}
          >
            <Button
              variant="success"
              size="sm"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "70%",
                textAlign: "center",
                height: "30px",
              }}
              
              disabled={IDProfesional < 1 ? true : false}
              onClick={(event) => {
                event.preventDefault();
              
                BuscarTurnosProfesionalFecha(
                  ClienteID,
                  IDProfesional,
                  fechaComienzoSemana,
                  UserID
                );
              }}
            >
              Burcar Turnos
            </Button>
            <Button
              variant="primary"
              size="sm"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "70%",
                textAlign: "center",
                height: "30px",
              }}
              onClick={(event) => {
                event.preventDefault();
                limpiar();
              }}
            >
              Limpiar
            </Button>
          </div>
        </div>

        <div className="acomodartabla">
          <table
            bordered
            hover
            border="1"
            style={{ width: "100%", textAlign: "center" }}
          >
            <thead style={{ fontSize: "14px", backgroundColor: "white" }}>
              {/* Encabezado de fechas */}
              <tr style={{ background: "#679bb9", color: "white" }}>
                {diasSemana.map((dia, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    style={{
                      textAlign: "center",
                      width: "340px",
                      fontSize: "14px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      fontWeight: "bold",
                    }}
                  >
                    {dia.nombre}
                  </th>
                ))}
              </tr>

              {/* Encabezado de columnas Hora - Paciente */}
              <tr style={{ backgroundColor: "white", color: "black" }}>
                {diasSemana.map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      style={{
                        width: "90px",
                        textAlign: "center",
                        fontSize: "13px",
                        padding: "8px",
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      Hora
                    </th>
                    <th
                      style={{
                        width: "250px",
                        textAlign: "left",
                        fontSize: "13px",
                        padding: "8px",
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      Paciente
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: maxTurnosPorDia }).map((_, filaIndex) => (
                <tr
                  key={filaIndex}
                  style={{
                    backgroundColor:
                      filaIndex % 2 === 0 ? "#f8f9fa" : "#ffffff", // Alternar colores de fila
                  }}
                >
                  {diasSemana.map((dia, colIndex) => {
                    // Filtrar los turnos de ese día

                    const turnosDelDia = turnos.filter(
                      (t) => t.fecha.split("T")[0] === dia.fecha // ambos quedan como yyyy-mm-dd
                    );

                    // Turno que corresponde a esta fila
                    const turno = turnosDelDia[filaIndex];
                   
                    return (
                      <React.Fragment key={colIndex}>
                        {/* Columna de Hora */}
                        <td
                          style={{
                            width: "90px",
                            textAlign: "center",
                            fontSize: "13px",
                            border: "1px solid #ddd",
                            padding: "8px",
                            verticalAlign: "top",
                          }}
                        >
                          {turno ? (
                            <Button
                              variant={
                                getButtonProperties(
                                  turno.sigla,
                                  turno.fecha,
                                  turno.hora,
                                  turno.sobreturno
                                ).buttonVariant
                              }
                              disabled={
                                getButtonProperties(
                                  turno.sigla,
                                  turno.fecha,
                                  turno.hora,
                                  turno.sobreturno
                                ).isButtonDisabled
                              }
                              style={{
                                width: "100%",
                                padding: "5px",
                                fontSize: "12px",
                                borderRadius: "5px",
                              }}
                              onClick={(event) => {
                                event.preventDefault();
                                setHoraTurno(turno.hora);
                                setFechaTurno(
                                  formatearFecha_yyyy_mm_dd(turno.fecha)
                                );
                                setFechaTurnoBD(turno.fecha);

                                if (turno.sigla === "PEN") {
                                  /* if (turno.fecha !== fechaSistema) {
                                    setModalMensaje(
                                      "No se puede dar el PRESENTE en esta fecha. El PRESENTE se otorga al turno el mismo día."
                                    );
                                    openMdlMensaje();
                                    return;
                                  } */
                                  definirEstadosdeTurnos(turno, "PENDIENTE");
                                } else if (turno.sigla === "LIB") {
                                  if (turno.fecha >= fechaSistema) {
                                    definirEstadosdeTurnos(turno, "LIBRE");
                                  } else {
                                    setModalMensaje(
                                      "Fecha expirada. No se puede cambiar el estado del turno."
                                    );
                                    openMdlMensaje();
                                  }
                                } else if (turno.sigla === "PRE NCOB") {
                                  setModalMensaje(
                                    "Fecha expirada. No se puede cambiar el estado del turno."
                                  );
                                  if (turno.prestacionesregistradas === true){
                                    openMdlCobrar(turno)
                                  }else {
                                      openMdlTurnoRegistrarPrestaciones(turno);
                                  }
                                  
                                }
                              }}
                            >
                              {
                                getButtonProperties(
                                  turno.sigla,
                                  turno.fecha,
                                  turno.hora,
                                  turno.sobreturno
                                ).buttonText
                              }
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>

                        {/* Columna Paciente */}
                        <td
                          style={{
                            width: "250px",
                            textAlign: "center",
                            fontSize: "13px",
                            border: "1px solid #ddd",
                            padding: "8px",
                            verticalAlign: "top",
                          }}
                        >
                          {turno ? (
                            <button
                              type="button"
                              className="btn btn-light"
                              style={{
                                fontSize: "13px",
                                padding: "4px 8px",
                                width: "100%",
                                textAlign: "center",
                              }}
                              onClick={() => openMdlTurnoDetalle(turno)}
                            >
                              {turno.apenompaciente}
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
          idprofesional={IDProfesional}
          fecha={fechaActual}
          profesional={apeyNom}
        />
      )}

      {mdlListaProfesionales && (
             <MdlListarProfesionales
               show={openMdlListarProfesionales}
               handleClose={closeMdlListarProfesionales}
               idcliente={ClienteID}
               enviarAlPadre={recibirDatoDelHijo}
             />
           )}


      {mdlRegistrarTurno && (
        <MdlAltaTurno
          show={setModalRegistrarTurno}
          handleClose={closeMdlRegistrarTurno}
          fila={filaSeleccionada}

          idcliente={ClienteID}
          idusuario={UserID}
        />
      )}

      {mdlModalMostarMensaje && (
        <MdlMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mdlMensaje}
        />
      )}

      {mdlcambiarestado && (
        <MdlCambiarEstado
          show={setCambiarEstado}
          handleClose={closeCambiarAPresente}
          enviarAlPadre={handleYes}
          fila={Item}
        />
      )}

           {showCobro && (
                 <CobrarModal
                     show={openMdlCobrar}
                     handleClose={closeMdlCobrar}
                     fila={Item}
                        
                 />
              )}

      {mdlTurnoDetalle && (
        <MdlTurnoDetalle
          show={openMdlTurnoDetalle}
          handleClose={CloseMdlTurnoDetalle}
          idturno={idTurno}
        />
      )}

          {mdlregistrarprestaciones && (
              <MdlRegistrarPrestaciones
                show={openMdlTurnoRegistrarPrestaciones}
                handleClose={closeMdlTurnoRegistrarPrestaciones}
                fila={Item}
              />
            )}
    </>
  );
};

export default agendasemanal;
