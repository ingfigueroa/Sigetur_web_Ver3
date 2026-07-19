import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import "/src/css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import CalendarTurnos from "../calendarios/calendar_ver1";

import "/src/css/tablapizaturnos.css";
import MdlAltaTurno from "./mdlaltaturno";
import MdlTurnoDetalle from "./mdlturnosdetalle_vers1";
import Mdlanularturno from "./mdlanularturno";
import MdlAltaSobreturno from "./mdlaltasobreturno";
import Mdlanulartodoslosturnos from "./mdlanulartodoslosturnos";
import MdlRegistrarPrestaciones from "./mdlregistrarprestaciones";
import MdlCambiarEstado from "../modales/mdlCambiarEstado";
import CobrarModal from "../cobros/cobrarmodal"; 

import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";
import Mdllistaespera from "../listadeespera/listadeespera_ver1";
import MdlAsignarlistaesperadesdePizarra from "../listadeespera/asignarTurnoListadeEsperadesdepizarra";

import MdlAnular from "../modales/mdlAnular";
import MdlMensaje from "../modales/MdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import { turnosService } from "/src/services/turnos.service";
import { profesionalesService } from "/src/services/profesional.service";



import { getClienteId, getUsuarioId, getRazonSocial } from "../utils/auth";

import { formatearFecha, formatearFechaLargaConelAnio, getFechaISO, formatearFecha_a_MM_DD_YYYY, crearFechaHora, formatearFechaentradd_mm_yyy_sale_yyyy_mm_dd } from "../utils/fecha";
import { correosServices } from "../../services/correos.service";

function tablapizarradeturnos({}) {


  const ClienteID = getClienteId();
  const UserID = getUsuarioId();
  const RazonSocial = getRazonSocial();
 
  
  const [accionConfirmada, setAccionConfirmada] = useState(0);

  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);
  const [mdlSiNoMensaje, setModalSiNoMensaje] = useState(null);
  const [mdlcambiarestado, setCambiarEstado] = useState(null);
  const [mdlcambiarestadoMensaje, setCambiarEstadoMensaje] = useState("");
  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);

  const [mdlAnularTurno, setModalAnularTurno] = useState(false);
  const [mdlAnularTodosLosTurnos, setModalAnularTodosLosTurnos] =
    useState(false);
  const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
  const [mdlMensaje, setModalMensaje] = useState(false);
  const [btnAnular, setBtnAnular] = useState(true);

  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEsperaDesdePizarra, setModalListaEsperaDesdePizarra] = useState(false);
  const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);

  const [showCobro, setShowCobro] = useState(false);

  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);

  const [IDProfesional, SetIDProfesional] = useState(null);
  const [IDProfesion, SetIDProfesion] = useState(null);
  const [IDEstado, setIdEstado] = useState(null);
  const [anular, setAnular] = useState(false);
  const [idTurno, setIDTurno] = useState();

  const [Fecha, setFecha] = useState(null);
  const [fechaSistema, setFechaSistema] = useState(formatearFechaLargaConelAnio(new Date()));
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  const [HoraTurno, setHoraTurno] = useState();
  const [HoraActual, setHoraActual] = useState();

  const fechaActualSinParsear = formatearFecha_a_MM_DD_YYYY(new Date().toLocaleDateString());
  

  const [FechaLarga, SetFechaLarga] = useState(fechaSistema);
  
   

  const [idusuario, setUsuario] = useState("");

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [mdlRegistrarTurno, setModalRegistrarTurno] = useState(false);

  const [mdlRegistrarSobreturno, setModalRegistrarSobreturno] = useState(false);

  const [apeyNom, setapeyNom] = useState(null);
  const [profesion, setProfesion] = useState(null);
  const [mailProfesional, setMailProfesional] = useState(null);

  const [turnos, setTurnos] = useState([]);

  const horaActual = format(new Date(), "HH:mm");

  const [cantidadTurnos, setCantidadTurnos] = useState(0);

  const [fechaTurno, setFechaTurno] = useState(null);

  const [descripcion, setDescripcion] = useState("");

  const [modalTitulo, setModalTitulo] = useState();
  const [modalCuerpo, setModalCuerpo] = useState();
  const [turnosAnulados, setTurnosAnulados] = useState(false);



  const stickyTh = {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 3,
  };

  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
  };

  const openMdlHoraProfe = () => {

   setFechaSistema(formatearFechaentradd_mm_yyy_sale_yyyy_mm_dd(fechaActual))
    setModalHoraProfe(true);
  };

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlListaEsperaDesdePizarra = () => {
   
    setModalListaEsperaDesdePizarra(true);
  };

  const closeMdlListaEsperaDesdePizarra = () => {
    setModalListaEsperaDesdePizarra(false);
    
    procesar(IDProfesional, Fecha, ClienteID);
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

    setIDTurno(fila.idTurno);

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

    procesar(IDProfesional, Fecha, ClienteID);
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

  const [mdlregistrarprestaciones, setModalRegistrarPrestaciones] = useState(false);
  const [mdlRegistrarCobro, setModalRegistrarCobro] = useState(false);

  const openMdlTurnoRegistrarPrestaciones = (fila) => {
    setItem(fila);
    setModalRegistrarPrestaciones(true);
  };

  
  const closeMdlTurnoRegistrarPrestaciones = () => {
    setModalRegistrarPrestaciones(false);
    procesar(IDProfesional, Fecha, ClienteID);
  };

  const closeMdlCobrar = () => {
    setShowCobro(false);
    procesar(IDProfesional, Fecha, ClienteID);
  };

  const openMdlCobrar = (fila) => {
    setItem(fila)
    setShowCobro(true);

    
  };
  

  const definirEstadosdeTurnos = (fila, VieneDE) => {
    try {
  
      setItem(fila);
      setIdEstado(fila.idestado);

      if (fila.estado === "LIBRE" && VieneDE === "LIBRE") {
        openMdlRegistrarTurno(fila);
        return;

      } else if (fila.estado == "PENDIENTE" && VieneDE == "PENDIENTE") {

        setCambiarEstadoMensaje(
          "¿Esta seguro de cambiar el estado del turno a PRESENTE?"
        );
        setCambiarEstado(true);

      } else if (fila.estado == "PENDIENTE" && VieneDE == "ANULAR") {
        // setModalSiNoMensaje("¿Esta seguro de anular el turno?");

        openMdlAnularTurno();
        return;
      }

      setItem(fila);
      procesar(IDProfesional, Fecha, ClienteID);
    } catch (error) {}
  };

  const handleYes = (observaciones) => {
    TurnosCambiarEstado(Item, "PNC", observaciones);

    procesar(IDProfesional, Fecha, ClienteID);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const handleAnular = (observaciones) => {


    TurnosCambiarEstado(Item, "ANULAR", observaciones);
    setAnular(false);
    procesar(IDProfesional, Fecha, ClienteID);

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const closeCambiarAPresente = () => {
    setCambiarEstado(false);
  };

  const openMdlRegistrarTurno = (fila) => {
    setFilaSeleccionada(fila);

    setModalRegistrarTurno(true);
  };

  const closeMdlRegistrarTurno = () => {
    setModalRegistrarTurno(false);
  
    procesar(IDProfesional, Fecha, ClienteID);
  };

  const openMdlRegistrarSobreturno = (fila) => {
    if (turnosAnulados) {
      setModalMensaje(
        "Los turnos del día están anulados. No se puede REGISTRAR un SOBRETURNO."
      );
      openMdlMensaje();
      return;
    }

    setFilaSeleccionada(fila);

    setModalRegistrarSobreturno(true);
  };

  const closeMdlRegistrarSobreturno = () => {
    setModalRegistrarSobreturno(false);

    procesar(IDProfesional, Fecha, ClienteID);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    SetIDProfesional(datoRecibido);
  
    BuscarProfesionalyProfesion(ClienteID, datoRecibido);
    limpiarTabla();
    //procesar(datoRecibido)
  };

  const limpiarTabla = () => {
    setItems([]);
    setCantidadTurnos(0);
  };

  const limpiar = () => {
    setItems([]);
   
    //SetFecha(fechaActual);
    setapeyNom("");
    setProfesion("");
    setCantidadTurnos(0);
    SetFechaLarga("");
    SetIDProfesional(0)
  };


   const handleFechaChange = (input) => {
    const valor = typeof input === "string" ? input : input.target.value;
   
    setFecha(valor);
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
    limpiarTabla();
  }; 
  
  const fechaActual = fechaActualSinParsear;
  

  async function TurnosProfesionalDiaAnulados(idcliente, idprofesional, fecha) {
    
      try {
        const data = await turnosService.TurnosPorProfesionalDiaCancelados(
          idcliente,
          idprofesional,
          fecha
        );
        console.log(data)
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

  // Asegúrate de que `Apellido` y `Nombres` existen en `data`

  async function BuscarProfesionalyProfesion(idcliente, idprofesional) {
    const data = await profesionalesService.BuscarId(idcliente, idprofesional);

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

  async function mailTurnosProfesionalporFecha() {
    const data = await turnosService.enviarTurnosProfesionalpoFecha(
      mailProfesional,
      apeyNom,
      profesion,
      Fecha,
      Items
    );

    if (data) {
      setItems(data); // Asignar los datos a `Items`

      // Asegúrate de que `Apellido` y `Nombres` existen en `data`
      if (data[0].Apellido && data[0].Nombres) {
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
        UserID,
        vieneDE
      );

      
    } catch (error) {

      console.log(error)
    }
  }

  const mdlSiNo = async (respuesta) => {
   
    if (respuesta) {
      
      if (accionConfirmada === 0) {
      
        if (IDProfesional > 0) {

          const fechadadavuelta = getFechaISO(Fecha)
          
          const data = await turnosService.CrearTurnosPorProfesionalPorFecha(
            UserID,
            IDProfesional,
            fechadadavuelta,
            ClienteID
          );

          setTurnos(data);
        }

        procesar(IDProfesional, Fecha, ClienteID);
      } else if (accionConfirmada === 1) {
      
        const data = await turnosService.enviarTurnosProfesionalpoFecha(Items);
      
      }else if (accionConfirmada === 2) {
      //entra por aca cuando queremos mandar mail recordatorio
      //  a todos los pacientes de un dia especifico
        const data = await correosServices.EnviarRecordatoriosxMailTodaLaGrilla(Items, RazonSocial );
         setModalMensaje(
                    "Se envió el recordatorio a todos los pacientes de la grilla con turnos en estado PENDIENTE."
                  );
                 
                  openMdlMensaje();
      
      }else if (accionConfirmada === 3) {
      //entra por aca cuando queremos mandar mail recordatorio
      //  al paciente seleccionado en la grilla
        const data = await correosServices.EnviarRecordatoriosxMailPacienteSeleccionado(Item, RazonSocial );
         setModalMensaje(
                    "Se envió el recordatorio al paciente seleccionado de la grilla."
                  );
                 
                  openMdlMensaje();
      
      }
    }
  };

  const anularTurno = () => {
    if (turnosAnulados) {
      setModalMensaje(
        "Los turnos del día ya se anularon. No se puede ANULAR LOS TURNOS."
      );
      openMdlMensaje();
      return;
    }

    if (Fecha <= fechaActual) {
      setModalMensaje("Fecha expirada. No se puede ANULAR LOS TURNOS.");
      openMdlMensaje();
      return;
    }
    if (Items.length > 0) {
      setBtnAnular(true);
      openMdlAnularTodosLosTurnos();
    }
  };

  const enviarTurnosProfesional = () => {
    if (turnosAnulados) {
      setModalMensaje(
        "Los turnos del día ya se anularon. No se puede enviar MAIL al PROFESIONAL."
      );
      openMdlMensaje();
      return;
    }

    setModalTitulo("Enviar turnos por correo electrónico.");
    setModalCuerpo(
      "¿Desea enviar la grilla de turnos por correo electrónico al profesional?"
    );
    setAccionConfirmada(1);
    setShowMDLEstaSeguro(true);
  };

   const enviarRecordatorioTurnoAPacientes = () => {
    if (turnosAnulados) {
      setModalMensaje(
        "Los turnos del día ya se anularon. No se puede enviar MAIL al PROFESIONAL."
      );
      openMdlMensaje();
      return;
    }

    setModalTitulo("Enviar turnos por correo electrónico.");
    setModalCuerpo(
      "¿Desea enviar el recordatorio del turno a los pacientes de la grilla?"
    );
    setAccionConfirmada(2);
    setShowMDLEstaSeguro(true);
  };

  const enviarRecordatorioTurnoAPacienteIndividual = (item) => {
    if (turnosAnulados) {
      setModalMensaje(
        "Los turnos del día ya se anularon. No se puede enviar MAIL al PROFESIONAL."
      );
      openMdlMensaje();
      return;
    }

    setModalTitulo("Enviar turno por correo electrónico.");
    setModalCuerpo(
      "¿Desea enviar el recordatorio del turno al paciente seleccionado?"
    );
    setAccionConfirmada(3);
    setItem(item)
    setShowMDLEstaSeguro(true);
  };

  const procesar = async (idprofesional, fecha, idcliente) => {

   
    limpiarTabla();

    const fechadadavuelta = getFechaISO(fecha)
  
    if (idprofesional < 1){
        setModalMensaje(
                    "Debe elegir un profesional para buscar los turnos."
                  );
        openMdlMensaje();
        return;
    }

    if (Fecha === null){
       setModalMensaje(
                    "Debe elegir una fecha válida para buscar los turnos."
                  );
        openMdlMensaje();
        return;
    }

    if (idprofesional > 0) {

      //fechaactual es la fecha de sistema
      //fecha es la fecha elegida por el suuario
     
      if (fecha => fechaActual) {
       
           const turnosencontrados = await turnosService.BuscarPorProfesionalFecha(
                idprofesional,
                fechadadavuelta,
                idcliente
          );
      
      
          setCantidadTurnos(turnosencontrados.length);

           if (turnosencontrados && turnosencontrados.length === 0) {
        
              const hayTurnosAnulados = await TurnosProfesionalDiaAnulados(
                idcliente,
                idprofesional,
                fechadadavuelta
              );
      
              
              //setTurnosAnulados(hayTurnosAnulados);

              if (hayTurnosAnulados && cantidadTurnos === 0) {
                  setModalMensaje(
                    "Por PEDIDO DEL PROFESIONAL, se CANCELARON LOS TURNOS para esta fecha."
                  );
                  turnosencontrados([]);
                  openMdlMensaje();
                  return;
              }

                setModalTitulo("Turnos no generados");
                setModalCuerpo("¿Desea generar turnos para esta fecha para el profesional elegido?");
                setAccionConfirmada(0);
                setShowMDLEstaSeguro(true);
                return;
              
            }else if (turnosencontrados && turnosencontrados.length > 0) {
              
                setapeyNom(turnosencontrados[0].apenomprof);
                setProfesion(turnosencontrados.servicio);
                setMailProfesional(turnosencontrados.email);
                setItems(turnosencontrados);
               
                return;
            } 
          
         
      }

    }
    
  };


  useEffect(() => {
    const esFechaMayor = Fecha > fechaActual;
    const esFechaIgual = Fecha === fechaActual;
    const esHoraValida = HoraTurno > horaActual;

    if (esFechaMayor) {
      return;
    } else {
      if (esFechaIgual) {
        if (Item.estado == "PENDIENTE") return;

        if (esHoraValida) return;

        setModalMensaje(
          "No se puede dar un turno cuando ya pasó el día o la hora del mismo."
        );
        openMdlMensaje(false);
        setModalRegistrarTurno(false);
      }
    }
  }, [HoraTurno]);


  useEffect(() => {
    document.title = "Si.Ge.Tur. - Pizarra de turnos";

   // setFecha(formatearFechaLarga(Fecha));
   
   // handleFechaChange(fechaActual);
  }, []);


  return (
    <>
   <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr", // 👈 sidebar fijo
        gap: "0px",
        width: "100%",
        marginLeft: "10px",
    
      }}
    >
        {/* COLUMNA IZQUIERDA - CALENDARIO */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            transform: "scale(0.8)",
            transformOrigin: "top left",
            width: "fit-content",
           
              
          }}
        >
          {/* ACA VA TU COMPONENTE CALENDAR */}
          <CalendarTurnos
            fecha={fechaSeleccionada}
            
            onChange={(date) => {
              // Convertir a yyyy-mm-dd
              limpiarTabla();
              setFechaSeleccionada(date)
              const fechalista = formatearFecha(date);
              
              setFecha(fechalista);

              //onChange={handleFechaChange}

              const fechalistalarga = formatearFechaLargaConelAnio(date);
           
              SetFechaLarga(fechalistalarga)
              
             
            
            }}
          />
          <hr />
                   <Button
                     variant="primary"
                     style={{
                       height: "30px", // más alto
                       fontSize: "16px", // texto más grande
                       padding: "0px 20px", // más espacio interno
                       whiteSpace: "nowrap",
                       width: "100%"
                       
                     }}
                     onClick={(event) => {
                       event.preventDefault();
                       procesar(IDProfesional, Fecha, ClienteID);
                     }}
                   >
                     BUSCAR
                   </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",

          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "white",
              marginBottom: "5px",
              padding: "5px",
            }}
          >
            <button
              title="Anular todos los turnos del día."
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={Items.length == 0}
              /* style={{ display: "none" }} */
              onClick={(event) => {
                event.preventDefault();
                setDescripcion(event.target.buttonText);
                anularTurno();
              }}
            >
              <i className="fa-solid fa-minus"></i>
            </button>

            <button
              title="Enviar recordatorio del turno a todos los pacientes de la grilla"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={Items.length == 0}
              onClick={(event) => {
                event.preventDefault();
                enviarRecordatorioTurnoAPacientes();
              }}
            >
              <i className="fa-solid fa-envelope"></i>
            </button>

            <button
              title="Horarios del profesional"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={Items.length == 0}
              onClick={(event) => {
                event.preventDefault();
                setDescripcion(event.currentTarget.textContent.trim());
                openMdlHoraProfe();
              }}
            >
              <i className="fa-solid fa-clock"></i>
            </button>
            <button
              title="Lista de espera"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={Items.length == 0}
              onClick={openMdlListaEsperaDesdePizarra}
            >
              <i className="fa-solid fa-book-open-reader"></i>
            </button>

            <button
              title="Registrar un sobreturno"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={Items.length == 0}
              onClick={openMdlRegistrarSobreturno}
            >
              <i className="fa-solid fa-arrow-turn-down"></i>
            </button>
            <button
              title="Dashboard"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              disabled={true}
              // style={{ display: "none" }}
            >
              <i className="fa-solid fa-chart-pie"></i>
            </button>
            
            <button
              title="Limpiar"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              style={{ marginLeft: "auto" }}
              onClick={(event) => {
                event.preventDefault();
                limpiar();
              }}
            >
              <i className="fa-solid fa-broom"></i>
            </button>
{/*                         <button
              title="Limpiar"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
              
              onClick={(event) => {
                event.preventDefault();
                limpiar();
              }}
            >
              <i className="fa-solid fa-broom"></i>
            </button> */}

            {/* <h5 style={{ color: "black" }}>{descripcion}</h5> */}
          </div>
          <div style={{ flex: 1 }}>
            <InputGroup className="mb-3">
              <Form.Control
                style={{
                  backgroundColor: "#679bb9",
                  //backgroundColor: "blue",
                  color: "white",
                  height: "28px",

                  width: "80%",
                  textAlign: "center",
                  fontSize: "25px",
                }}
                aria-describedby="basic-addon2"
                readOnly
                value={FechaLarga}
              />
            </InputGroup>
            <InputGroup className="mb-3">
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
                style={{ height: "28px" }}
                color="white"
                onClick={openMdlListarProfesionales}
                /* onClick={() => BuscarTurnosProfesionalFecha() } */
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
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
                  width: "15%",
                }}
              >
                Cant. de turnos:
              </InputGroup.Text>
              <Form.Control
                style={{
                  textAlign: "center",
                  height: "28px",
                }}
                placeholder="turnos"
                aria-label="cantturnos"
                aria-describedby="basic-addon2"
                readOnly
                value={cantidadTurnos}
              />
              {/*   <Button
                variant="primary"
                size="sm"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  width: "10%",
                  textAlign: "center",
                  height: "30px",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  limpiar();
                }}
              >
                Limpiar
              </Button> */}
            </InputGroup>

          <div className="tabla-container">
              <Table bordered hover className="tabla-turnos">
                <thead style={{ fontSize: "12px", backgroundColor: "white" }}>
                  <tr >
                    

                    <th style={{ textAlign: "center", width: "7%" }} key="1">
                      Hora
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "19%"
                      }}
                    >
                      Estado
                    </th>

                    <th
                      style={{
                        textAlign: "left",
                        width:"26%"
                      }}
                      key="2"
                    >
                      Paciente
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width:"10%"
                      }}
                      key="3"
                    >
                      DNI
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        width:"19%"
                      }}
                      key="4"
                    >
                      Obra social
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        width:"19%"
                      }}
                      key="8"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center", fontSize: "10px"}}>
                  {Items &&
                    Items.map((item) => {
                      // Formatear el campo "Descripcion" como hora

                      const fechaTurnoCompleta = crearFechaHora(Fecha, item.hora)

                      const ahora = new Date();

                      let buttonVariant;
                      let buttonText;
                      let isButtonDisabled = false;

                      // Definir variantes y textos según el estado
                      switch (item.sigla) {
                        case "ANU":
                          buttonVariant = "dark";
                          isButtonDisabled = true;
                          buttonText = item.estado;
                          break;
                        case "PEN":
                          if (!item.sobre) {
                            buttonVariant = "warning";
                            buttonText = item.estado;
                            break;
                          } else {
                            buttonVariant = "info";
                            buttonText = "SOBRETURNO";
                            break;
                          }
                        case "PRE":
                          buttonVariant = "primary";
                          buttonText = item.estado;
                          break;

                        case "ACA":
                          buttonVariant = "danger";
                          buttonText = item.estado;
                          break;
                        case "ASA":
                          buttonVariant = "danger";
                          buttonText = item.estado;
                          break;
                        case "PEN COB":
                          buttonVariant = "danger";
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
                          buttonVariant = "info";
                          //isButtonDisabled = true;
                          buttonText = item.estado;
                          break;

                        case "LIB":

                          if (ahora >= fechaTurnoCompleta) {
                            isButtonDisabled = true;
                          }
                          buttonVariant = "success";
                          buttonText = item.estado;

                          break;
                      }

                      return (
                        <tr key={item.idTurno}>
                           <td style={{ textAlign: "center", width: "7%", border: "none", fontSize: "14px" }}>
                             <Button
                              variant="secondary"
                              size="sm"
                             
                            >
                               {item.hora}
                            </Button>
                           
                          </td>{" "}
                          <td style={{ textAlign: "center", width: "20%", border: "none" }}>
                            <Button
                              variant={buttonVariant}
                              disabled={isButtonDisabled}
                              size="sm"
                              style={{
                                width: "60%",
                                textAlign: "center",
                                fontSize: "10px",
                              }}
                              onClick={(event) => {
                                event.preventDefault();

                                setHoraTurno(item.hora); // Actualiza `setHoraTurno` con `item.desde`

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
                                } else if (
                                  item.estado == "PRESENTE NO COBRADO"
                                ) {
                                  setModalMensaje(
                                    "Fecha expirada. No se puede cambiar el estado del turno."
                                  );
                                }
                              }}
                            >
                              {buttonText}
                            </Button>
                          </td>
                         
                          {/* Mostrar hora formateada */}
                          <td style={{ textAlign: "center", width: "27%", border: "none" }}>
                            <Button
                              variant=""
                              size="sm"
                              style={{ width: "60%", textAlign: "left",  border: "none" }}
                            >
                              {item.apenompaciente}
                            </Button>
                          </td>
                          <td style={{ textAlign: "center",  width: "10%", border: "none" }}>
                            {item.nroDoc > 0 ? item.nroDoc : null}
                          </td>
                          <td style={{ textAlign: "center",  width: "20%", border: "none" }}>
                            {item.os}
                          </td>
                          <td style={{ textAlign: "center",  width: "17%", border: "none" }}>

                           {item.estado === "PENDIENTE" && (
                              <>
                                <button
                                  title="Anular turno"
                                  className="btn btn-sm btn-light btn-danger me-1"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    definirEstadosdeTurnos(item, "ANULAR");
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>

                                <button
                                  title="Recordar turno al paciente"
                                  className="btn btn-sm btn-light btn-success"
                                  disabled={Items.length === 0}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    enviarRecordatorioTurnoAPacienteIndividual(item);
                                  }}
                                >
                                  <i className="fa-solid fa-envelope"></i>
                                </button>
                              </>
                            )}

                          {item.estado === "PRESENTE" && item.prestacionesregistradas && (
                              <button
                                title="Registrar PRESTACIONES"
                                className="btn btn-sm btn-light btn-success"
                                variant="outline-secondary"
                                onClick={(event) => {
                                  event.preventDefault();

                                  openMdlTurnoRegistrarPrestaciones(item);
                                }}
                              >
                                <i className="fa-solid fa-notes-medical"></i>
                              </button>
                            )}

                           

                            {item.estado !== "LIBRE" &&
                              item.estado !== "ANULADO" && (
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
                            {item.estado === "LIBRE" &&
                              fechaTurnoCompleta >= ahora && (
                                <button
                                  title="Copiar ID del turno"
                                  className="btn btn-sm btn-light btn-success"
                                  onClick={(event) => {
                                    event.preventDefault();

                                    // Copia el id al portapapeles
                                    navigator.clipboard
                                      .writeText(item.idTurno)
                                      .then(() => {
                                        
                                        // Opcional: mostrar feedback visual
                                        setModalMensaje(
                                          "ID del turno copiado al portapapeles"
                                        );
                                        openMdlMensaje();
                                      })
                                      .catch((err) => {
                                        console.error("Error al copiar:", err);
                                      });
                                  }}
                                >
                                  <i class="fa-solid fa-copy"></i>
                                </button>
                              )}

                            {item.estado === "PRESENTE NO COBRADO" && !item.prestacionesregistradas && (
                              
                              <button
                                title="Registrar PRESTACIONES"
                                className="btn btn-sm btn-light btn-success"
                                variant="outline-secondary"
                                onClick={(event) => {
                                  event.preventDefault();

                                  openMdlTurnoRegistrarPrestaciones(item);
                                }}
                              >
                                <i className="fa-solid fa-notes-medical"></i>
                              </button>
                            )}
                             {item.estado === "PRESENTE NO COBRADO" && item.prestacionesregistradas && (
                              
                              <button
                                title="Registrar el COBRO del TURNO"
                                className="btn btn-sm btn-light btn-success"
                                variant="outline-secondary"
                                onClick={(event) => {
                                  event.preventDefault();

                                  openMdlCobrar(item);
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
        </div>

        

       
      </div>

      {mdlRegistrarTurno && (
        <MdlAltaTurno

          show={openMdlRegistrarTurno}
          handleClose={closeMdlRegistrarTurno}
          fila={Item}
          idcliente={ClienteID}
          idusuario={UserID}
        />
      )}

      {mdlRegistrarSobreturno && Items.length > 0 && (
        <MdlAltaSobreturno
          show={openMdlRegistrarSobreturno}
          handleClose={closeMdlRegistrarSobreturno}
          fila={Items[Items.length - 1]}
          idcliente={ClienteID}
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

      
      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
          idprofesional={IDProfesional}
          fecha={fechaSistema}
          profesional={apeyNom}
        />
      )}

      {mdlListaEsperaDesdePizarra && (
        <MdlAsignarlistaesperadesdePizarra
          show={openMdlListaEsperaDesdePizarra}
          handleClose={closeMdlListaEsperaDesdePizarra}
          idprofesional={IDProfesional}
          apeynomprofesional={apeyNom}
          idcliente={ClienteID}
          idusuario={UserID}
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

      {mdlcambiarestado && (
        <MdlCambiarEstado
          show={setCambiarEstado}
          handleClose={closeCambiarAPresente}
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
          idusuario={UserID}
          apeynom={Items[0].apenomprof}
          vienede="pizarraturnos"
          observaciones="POR PEDIDO DEL PROFESIONAL, SE CANCELAN LOS TURNOS DE ESTE DÍA."
          idcliente={ClienteID}
        />
      )}

      {mdlModalMostarMensaje && (
        <MdlMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mdlMensaje}
        />
      )}

      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={modalTitulo}
          mensajecuerpo={modalCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}

         {showCobro && (
            <CobrarModal
                show={openMdlCobrar}
                handleClose={closeMdlCobrar}
                fila={Item}
                   
            />
         )}
    </>
  );
}

export default tablapizarradeturnos;
