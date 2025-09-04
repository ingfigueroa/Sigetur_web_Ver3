import React, { useState, useEffect, useRef } from "react";
/* import { format, parse } from "date-fns"; */
import { format, addDays, parse } from "date-fns";
import { es } from "date-fns/locale";

import "/src/css/pizarradeturnos.css";

import { Row, Table } from "react-bootstrap";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";

import { turnosService } from "/src/servicenos.service";
import { profesionalesService } from "/src/services/profesional.service";
import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";
import MdlAltaTurno from "../turnos/mdlaltaturno";
import MdlMensaje from "../modales/MdlMensaje";
import MdlCambiarEstado from "../modales/mdlCambiarEstado";
import Mdlturnoregistrarcobro from "../turnos/mdlturnoregistrarcobro";
import MdlTurnoDetalle from "../turnos/mdlturnosdetalle_vers1";

const agendasemanal_bck = ({ show, handleClose, idprofesional }) => {
  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [mdlcambiarestadoMensaje, setCambiarEstadoMensaje] = useState("");
  const [IDProfesional, SetIDProfesional] = useState("");
  const [IDProfesion, SetIDProfesion] = useState(null);
  const [IDEstado, setIdEstado] = useState(null);
  const [mdlcambiarestado, setCambiarEstado] = useState(null);
  const [HoraTurno, setHoraTurno] = useState();
  const [HoraActual, setHoraActual] = useState();

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

  const horaActual = new Date().toLocaleTimeString();

  const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);
  const [fechaComienzoSemana, setFechaComienzoSemana] = useState("");
  const [fechaElegida, setFechaElegida] = useState("");
  const [fechaActual, setFechaActual] = useState("");
  const [fechaLunes, setFechaLunes] = useState("");
  const [Fechas, setFechas] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);

  const [mdlMensaje, setModalMensaje] = useState(false);
  const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
  const [mdlturnoregistrarcobro, setModalTurnoRegistrarCobro] = useState(false);

const fechaActualSinParsear = new Date().toLocaleDateString();

  const openMdlTurnoRegistrarCobro = (fila) => {
    setItem(fila);
    setModalTurnoRegistrarCobro(true);
  };

  const closeMdlTurnoRegistrarCobro = () => {
    setModalTurnoRegistrarCobro(false);
    BuscarTurnosProfesionalFecha(IDProfesional, fechaComienzoSemana);
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

    BuscarTurnosProfesionalFecha(IDProfesional, fechaComienzoSemana);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const formatearFecha = (fecha) => {
    
    if (!fecha) return ""; // Maneja valores nulos o indefinidos

    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj)) return "Fecha inválida"; // Verifica si la fecha es válida

    fechaObj.setDate(fechaObj.getDate() + 1); // Suma un día

    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
      .format(fechaObj)
      .replace(",", ""); // Elimina la coma que algunos formatos incluyen
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
      BuscarTurnosProfesionalFecha(IDProfesional, fechaComienzoSemana);
    } catch (error) {}
  }
  const generarFechasSemana = (fechaInicio) => {
    return Array.from({ length: 7 }, (_, i) => {
      const fecha = addDays(new Date(fechaInicio), i);

      return format(fecha, "EEEE - dd 'de' MMMM", { locale: es });
    });
  };

  const formatearFecha_yyyy_mm_dd = (fecha) => {
    let fechaActualParseada;
   
    if (fecha instanceof Date) {
      // Si ya es un objeto Date, lo usamos directamente
      fechaActualParseada = fecha;
    }
    // Caso 1: formato yyyy-MM-dd
    else if (typeof fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      fechaActualParseada = parse(fecha, "yyyy-MM-dd", new Date());
    }
    // Caso 2: formato d/M/yyyy
    else if (
      typeof fecha === "string" &&
      /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)
    ) {
      fechaActualParseada = parse(fecha, "d/M/yyyy", new Date());
    }
    // Caso 3: formato de Date.toString()
    else if (typeof fecha === "string" && isNaN(Date.parse(fecha)) === false) {
      fechaActualParseada = new Date(fecha);
    } else {
      console.error("Formato de fecha no reconocido:", fecha);
      return "";
    }
    
    return format(fechaActualParseada, "yyyy-MM-dd");
  };

  const fechaSemana = generarFechasSemana(new Date());

  const openMdlHoraProfe = () => {
    setModalHoraProfe(true);
  };

  const openMdlMensaje = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")

    setModalMostrarMensaje(true);
  };

  const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    SetIDProfesional(datoRecibido);

    BuscarProfesionalyProfesion(datoRecibido);
    limpiarTabla();
  };

  const closeCambiarAPresente = () => {
    setCambiarEstado(false);

    BuscarTurnosProfesionalFecha(IDProfesional, fechaComienzoSemana);
  };

  const openMdlRegistrarTurno = (fila) => {
    setFilaSeleccionada(fila);

    setModalRegistrarTurno(true);
  };

  const closeMdlRegistrarTurno = () => {
    setModalRegistrarTurno(false);

    BuscarTurnosProfesionalFecha(IDProfesional, fechaComienzoSemana);
  };

  const openMdlListarProfesionales = () => {
    setModalListarProfesionales(true);
  };

  const closeMdlListarProfesionales = () => {
    setModalListarProfesionales(false);
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
  };

  // función que genera array de 7 días empezando en lunes
  // función auxiliar: calcula el lunes de la semana
  const getMonday = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0=domingo, 1=lunes, ..., 6=sábado
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  };

  // función que devuelve array de lunes a domingo
  const getWeekDates = (fechaBase) => {
   
    const base = new Date(fechaBase);
   
    // si la fecha es inválida, uso hoy
    if (isNaN(base)) {
      console.warn("⚠️ Fecha inválida en getWeekDates, uso hoy");
      base.setHours(0, 0, 0, 0);
    }

    const monday = getMonday(fechaBase);
   
    setFechaComienzoSemana(formatearFecha_yyyy_mm_dd(monday))
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      return d
        .toLocaleDateString("es-ES", {
          weekday: "long", // lunes, martes...
          day: "numeric", // 11
          month: "long", // agosto
        })
        .replace(",", ""); // saco la coma
    });
   
    return weekDates;
  };

  /*   const handleFechaChange = (input) => {
    const valor = typeof input === "string" ? input : input.target.value;

    SetFecha(valor);
    const fechaISO = valor;

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
    setTurnos([]);
  }; */

  /*     const handleFechaChange = (e) => {
    setFechaComienzoSemana(e.target.value);
    contador.current = contador.current + 1;
    
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
    /* setDiasSemana(generarFechasSemana(Fecha)); 
    setTurnos([]);
  }; */


  const definirEstadosdeTurnos = (fila, VieneDE) => {
    try {
      setItem(fila);

      setIdEstado(fila.idestado);

      //3676903
      if (fila.estado === "LIBRE" && VieneDE == "LIBRE") {
        openMdlRegistrarTurno(fila);
      } else if (fila.estado == "PENDIENTE" && VieneDE == "PENDIENTE") {
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

      BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
    } catch (error) {}
  };

  async function BuscarTurnosFechasAgrupadas(idprofesional, fecha) {
    if (idprofesional > 0) {
      const data = await turnosService.Agendasemanal_FechasAgrupadas(
        idprofesional,
        fecha
      );

      // Organizar turnos por fecha
      console.log(data)
      setFechas(data);
    }
  }

  async function BuscarTurnosProfesionalFecha(idprofesional, fecha) {
    if (idprofesional > 0) {
     // BuscarTurnosFechasAgrupadas(idprofesional, fecha);
      const data = await turnosService.Agendasemanal_PorProfesionalPorFecha(
        idprofesional,
        fecha
      );
      setCantidadTurnos(data.length);
    
      setTurnos(data);
    }
  }

  async function BuscarProfesionalyProfesion(idprofesional) {
    const data = await profesionalesService.BuscarId(idprofesional);

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

  const obtenerTurnosSemana = async (idprofesional, fechaInicio) => {
    const data = await turnosService.Agendasemanal_PorProfesionalPorFecha(
      idprofesional,
      fechaInicio
    );

    // Organizar turnos por fecha
    const turnosAgrupados = data.reduce((acc, turno) => {
      const fechaFormateada = format(
        new Date(turno.fecha),
        "EEEE - d 'de' MMMM",
        { locale: es }
      );
      if (!acc[fechaFormateada]) acc[fechaFormateada] = [];
      acc[fechaFormateada].push(turno);
      return acc;
    }, {});

    setTurnos(turnosAgrupados);
  };

  // const Fechas1 = [...new Set(turnos.map((t) => t.fecha))];

  // Obtener todas las horas sin duplicar y ordenadas
  const Horas1 = [...new Set(turnos.map((t) => t.hora))].sort();

  const maxTurnosPorDia = Math.max(
    ...Fechas.map(
      (fecha) => turnos.filter((t) => t.fecha === fecha.Fecha).length
    ),
    0
  );
  const getButtonProperties = (estado, fecha, hora, paciente) => {
    let buttonVariant = "success"; // Color por defecto
    let buttonText = hora;
    let isButtonDisabled = false;

    const ahora = new Date();
    const fechaActual1 = formatearFecha_yyyy_mm_dd(ahora); // Fecha actual YYYY-MM-DD

    // Obtener la hora actual en formato HH:MM
    const horaActual1 = format(new Date(), "HH:mm"); // Extrae "HH:MM"

    // Validar que fecha y hora sean correctas
    if (!fecha || !hora) {
      return { buttonVariant, buttonText, isButtonDisabled };
    }

    // Comparar fecha y hora por separado

    if (estado === "LIB") {
      if (fecha < fechaActual1) {
        isButtonDisabled = true; // Si la fecha ya pasó, deshabilitar botón
      } else if (fecha === fechaActual1) {
        if (hora < horaActual1) {
          isButtonDisabled = true; // Si la fecha es hoy pero la hora ya pasó, deshabilitar botón
        }
      }
    }

    switch (estado) {
      case "ANU":
        buttonVariant = "dark";
        break;
      case "PEN":
        buttonVariant = "warning";
        break;
      case "PRE":
        buttonVariant = "primary";
        break;
      case "ACA":
        buttonVariant = "info";
        break;
      case "ASA":
        buttonVariant = "danger";
        break;
      case "PEN COB":
        buttonVariant = "warning";
        break;
      case "PRE COB":
        buttonVariant = "primary";
        break;
      case "NCI":
        buttonVariant = "secondary";
        break;
      case "PRE NCOB":
        buttonVariant = "primary";
        break;
      case "LIB":
        buttonVariant = "success";
        break;
      default:
        buttonVariant = "secondary";
    }
    if (paciente === true) {
      buttonVariant = "light";
    }
    return { buttonVariant, buttonText, isButtonDisabled };
  };


//const fechaActual = formatearFecha(fechaActualSinParsear);

  useEffect(() => {
    
    document.title = "Si.Ge.Tur. - Agenda Semanal";
    const hoy = new Date();
    
    //formateamos la fecha del dia a yyyy-mm-dd
    const setFechaActual1 = (formatearFecha_yyyy_mm_dd(hoy));
 
    //pasar la fecha al calendar
    setFechaActual(setFechaActual1);

    //armamos el array con los dias de la semana
    setDiasSemana(getWeekDates(setFechaActual1));
  
  }, []);


  const contador = useRef(0);
/*   useEffect(() => {
    contador.current = contador.current + 1;
    const fecha1 = formatearFecha_yyyy_mm_dd(new Date());

    setFechaActual(fecha1); // Actualiza el estado con la fecha formateada
  }, []); // Se ejecuta solo una vez al montar el componente */

  useEffect(() => {
    const esFechaValida = fechaTurno >= fechaActual;
    const esHoraValida = HoraTurno > horaActual;

    if (!esFechaValida) {
      if (esHoraValida) return;

      setModalMensaje(
        "No se puede dar un turno cuando ya pasó el día o la hora del mismo."
      );
      openMdlMensaje();
      setModalRegistrarTurno(false);
    }
  }, [HoraTurno]);

  

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
        {/*  <div style={{ display: "flex", backgroundColor: "white" }}>
          <div style={{ width: "60%", textAlign: "center", display: "grid" }}>
            <h2> AGENDA SEMANAL</h2>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            marginBottom: "5px",
          }}
        >
          {/* <div style={{ width: "60%", textAlign: "center", display: "grid" }}>
            <h2> Pizarra de turnos</h2>
          </div> */}
          <div style={{ width: "40%", textAlign: "left", marginTop: "10px" }}>
            <button
              title="Anular todos los turnos del día."
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              //disabled={Items.length == 0}
              /* style={{ display: "none" }} */
              onClick={(event) => {
                event.preventDefault();
                setDescripcion(event.target.buttonText);
                anularTurno();
              }}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <button
              title="Email a todos los turnos a toda la grilla"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              //disabled={Items.length == 0}
              // style={{ display: "none" }}
            >
              <i class="fa-solid fa-at"></i>
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
              onClick={(event) => {
                event.preventDefault();

                BuscarTurnosProfesionalFecha(
                  IDProfesional,
                  fechaComienzoSemana
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
                {diasSemana.map((fecha, index) => (
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
                    {fecha}
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
                  {diasSemana.map((dia, idx) => {
                      // filtrar los turnos de ese día
                      const turno = turnos.filter(
                        (t) => new Date(t.fecha).toDateString() === new Date(dia.Fecha).toDateString()
                      );

                      {turno.map((fecha, colIndex) => {
                       
                        //const turno = turnosDelDia[filaIndex] || null;
                        const t = fecha;
                        const { buttonVariant, buttonText, isButtonDisabled } =
                          getButtonProperties(
                            t.sigla,
                            t.fecha,
                            t.hora
                          );

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
                              }}
                            >
                              {turno ? (
                                <Button
                                  variant={buttonVariant}
                                  disabled={isButtonDisabled}
                                  style={{
                                    width: "100%",
                                    padding: "5px",
                                    fontSize: "12px",
                                    borderRadius: "5px",
                                    cursor: isButtonDisabled
                                      ? "not-allowed"
                                      : "pointer",
                                    opacity: isButtonDisabled ? 0.5 : 1,
                                  }}
                                  onClick={(event) => {
                                    event.preventDefault();

                                    setHoraTurno(t.hora); // Actualiza `setHoraTurno` con `item.desde`

                                    // Obtiene la hora actual y la asigna a `setHoraActual`
                                    // O ajusta el formato según lo necesites
                                    setHoraActual(horaActual);
                                    setFechaTurno(
                                      formatearFecha_yyyy_mm_dd(t.fecha)
                                    );
                                    setFechaTurnoBD(t.fecha);

                                    if (t.sigla == "PEN") {
                                      if (fechaTurno > fechaActual) {
                                        setModalMensaje(
                                          "No se puede dar el PRESENTE en esta fecha. El PRESENTE se da a partir de la fecha del turno."
                                        );
                                        openMdlMensaje();
                                        return;
                                      }

                                      definirEstadosdeTurnos(turno, "PENDIENTE");
                                    } else if (t.sigla === "LIB") {
                                      if (t.fecha >= fechaActual) {
                                        definirEstadosdeTurnos(turno, "LIBRE");
                                      } else {
                                        setModalMensaje(
                                          "Fecha expirada. No se puede cambiar el estado del turno."
                                        );
                                        openMdlMensaje();
                                      }
                                    } else if (t.sigla === "PRE NCOB") {
                                      setModalMensaje(
                                        "Fecha expirada. No se puede cambiar el estado del turno."
                                      );

                                      openMdlTurnoRegistrarCobro(turno);
                                    }
                                  }}
                                >
                                  {buttonText}
                                </Button>
                              ) : (
                                ""
                              )}
                            </td>
                            <td
                              style={{
                                width: "90px",
                                textAlign: "center",
                                fontSize: "13px",
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {turno && turno.apenompaciente ? (
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  style={{ fontSize: "13px", padding: "4px 8px" }}
                                  onClick={() => {
                                    // Acá va la acción que quieras realizar con el botón
                                    openMdlTurnoDetalle(turno);
                                  }}
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
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mdlListaProfesionales && (
        <MdlListarProfesionales
          show={openMdlListarProfesionales}
          handleClose={closeMdlListarProfesionales}
          enviarAlPadre={recibirDatoDelHijo}
        />
      )}
      {mdlRegistrarTurno && (
        <MdlAltaTurno
          show={openMdlRegistrarTurno}
          handleClose={closeMdlRegistrarTurno}
          fila={filaSeleccionada}
          ApeyNom={apeyNom}
          FechaTurno={fechaTurno}
          profesion={profesion}
          hora={HoraTurno}
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

      {mdlturnoregistrarcobro && (
        <Mdlturnoregistrarcobro
          show={openMdlTurnoRegistrarCobro}
          handleClose={closeMdlTurnoRegistrarCobro}
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
    </>
  );
};

export default agendasemanal_bck;
