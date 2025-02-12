import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import "/src/css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";

import { turnosService } from "/src/services/turnos.service";
import { profesionalesService } from "/src/services/profesional.service";

const agendasemanal = ({ show, handleClose, idprofesional }) => {
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);

  const [IDProfesional, SetIDProfesional] = useState(null);
  const [IDProfesion, SetIDProfesion] = useState(null);
  const [IDEstado, setIdEstado] = useState(null);

  const [Fecha, SetFecha] = useState(null);

  const [HoraTurno, setHoraTurno] = useState();
  const [HoraActual, setHoraActual] = useState();

  const fechaActualSinParsear = new Date().toLocaleDateString();

  const [FechaLarga, SetFechaLarga] = useState(null);

  const [idusuario, setUsuario] = useState("2");

  const [apeyNom, setapeyNom] = useState(null);
  const [profesion, setProfesion] = useState(null);

  const [turnos, setTurnos] = useState([]);

  const horaActual = new Date().toLocaleTimeString();

  const [cantidadTurnos, setCantidadTurnos] = useState(0);

  const [fechaTurno, setFechaTurno] = useState(null);

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

  const limpiarTabla = () => {
    setItems([]);
  };

  const limpiar = () => {
    setItems([]);
    SetFecha("");
    setapeyNom("");
    setProfesion("");
    setCantidadTurnos("");
    SetFechaLarga("");
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

  useEffect(() => {
    if (Fecha <= fechaActual) {
      if (HoraTurno > horaActual) {
      
        return;
      }
      setModalMensaje(
        "No se puede dar un turno cuando ya pasó el día y la hora del mismo."
      );
      openMdlMensaje();
      setModalRegistrarTurno(false);
    }
  }, [HoraTurno]);

  /*  useEffect(() => {
    // Aquí puedes realizar cualquier acción adicional cuando cantidadTurnos cambia
  }, [cantidadTurnos]); */

  return (
    <>
      <div
        style={{
          width: "90%",

          marginTop: "0",
          marginBottom: "0"
        }}
      >
        <div style={{ display: "flex", backgroundColor: "white" }}>
          <div style={{ width: "60%", textAlign: "center", display: "grid" }}>
            <h2> AGENDA SEMANAL</h2>
          </div>
         
        </div>

        <hr></hr>
        <div
         style={{
          display: "flex",
          width: "100%",
          backgroundColor: ""
        }}>
         

         
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
                    textAlign: "center"
                  }}
                >
                 Semana:
                </InputGroup.Text>
                <Form.Control
                 style={{

                  height: "28px",
                  flex: "0 0 25%"
                }}
                  placeholder="Buscar profesional"
                  aria-label="Buscar profesional"
                  aria-describedby="basic-addon2"
                  type="date"
                  onChange={handleFechaChange}
                  value={Fecha}
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
                  textAlign:"center",
                  width:"25%",
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
                  style={{ backgroundColor: "#002d38", height: "30px", }}
                  color="white"
                 /*  onClick={openMdlListarProfesionales} */
                  /* onClick={() => BuscarTurnosProfesionalFecha() } */
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
                  textAlign:"center",
                  width:"15%",
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
                width: "20%"
              }}
            >
              Cantidad de turnos:
            </InputGroup.Text>
            <Form.Control
            style={{
              textAlign: "center",
              height: "28px",
              flex: "0 0 20%" // Establece un ancho del 30% fijo sin crecimiento
            }}
              placeholder="turnos"
              aria-label="cantturnos"
              aria-describedby="basic-addon2"
               
              readOnly
              value={cantidadTurnos}
            />
              </InputGroup>
             
       
          <InputGroup style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          </InputGroup>
          
        
            </div>
            <div
              style={{
                display:"grid",
                width: "15%",
               
               
                 backgroundColor: ""
              }}
            >
              <Button
                variant="success"
                size="sm"
                style={{ marginLeft: "20px", marginRight:"20px",width: "70%", textAlign: "center", height:"30px" }}
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
              <Button
                variant="primary"
                size="sm"
                style={{ marginLeft: "20px", marginRight:"20px",width: "70%", textAlign: "center", height:"30px" }}
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
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
               

                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>
                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>
                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white"  }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>
                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>
                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)", width: "15px",  color: "white" }} key="1">
                  Hora
                </th>

                <th style={{ backgroundColor: "rgb(136, 161, 184)",  color: "white" }} key="2">
                  Fecha
                </th>
              
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </Table>
        </div>
      </div>

     {/*  {mdlRegistrarTurno && (
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
      )} */}
    </>
  );
};

export default agendasemanal;
