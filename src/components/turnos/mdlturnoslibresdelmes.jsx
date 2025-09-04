import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";

import MdlAltaTurno from "./mdlaltaturno";

import "/src/css/pizarradeturnos.css";
import "/src/css/tablapizaturnos.css";

import { formatearFechaLarga, obtenerMes } from "../../components/utils/fecha";

import { turnosService } from "/src/services/turnos.service";

const mdlturnoslibresdelmes = ({
  show,
  handleClose,
  profesional,
  profesion,
  idprofesional,
  fechainicio,
  fechafinal,
}) => {


  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [Items, setItems] = useState(null);
    const [mdlRegistrarTurno, setModalRegistrarTurno] = useState(false);
 const [Item, setItem] = useState(null);
  const [Pagina, setPagina] = useState(1);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Paginas, setPaginas] = useState([]);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
    const [CantidadTurnosLibresDias, setCantidadTurnosLibresDias] = useState(0);
     const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [fechasAgrupadas, setFechasAgrupadas] = useState([]);

  const [horaTurno, setHoraTurno] = useState(null);
  const [horaActual, setHoraActual] = useState(null);

  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

  const Fecha = new Date().toISOString().split("T")[0];
  const dia = new Date().toLocaleDateString();
  const mes = obtenerMes(new Date()); // +1 para que Enero sea 1 y no 0

  async function Buscar(_pagina) {
   
     console.log(fechainicio)
    console.log(fechafinal)
    const data = await turnosService.TurnosLibresDelMes(
      idprofesional,
      fechainicio,
      fechafinal,
      _pagina,
      CantidaddeRegistros
    );
   
    if (data) {
      setItems(data.registros);
      
      setCantidadTurnosLibresDias(data.lenght)
    
      setRegistrosTotal(data.total);
    
      setFechasAgrupadas(data.fechasagrupadas);
    
    } else {
      console.warn("No se encontraron datos o hubo un error");
    }

   
  }


  const openMdlRegistrarTurno = (fila) => {
  setFilaSeleccionada(fila);  

    setModalRegistrarTurno(true);
  };

  const closeMdlRegistrarTurno = () => {
    setModalRegistrarTurno(false);

    Buscar()
  }

  const definirEstadosdeTurnos = (fila, VieneDE) => {
    try {
      setItem(fila);
     

      if (fila.estado === "LIBRE" && VieneDE === "LIBRE") {
        openMdlRegistrarTurno(fila);
      } 
      
      Buscar();
    } catch (error) {}
  };

  useEffect(() => {
    
    console.log(mes)
  }, []);

/*   useEffect(() => {
   
  }, [fechasAgrupadas]); */

// 👉 este solo busca datos del backend
useEffect(() => {
  Buscar();
}, [fechainicio, fechafinal, Pagina, CantidaddeRegistros]);

// 👉 este solo filtra, sin volver a llamar a Buscar
useEffect(() => {
  if (fechaSeleccionada && Items) {
    const fechaFiltro = format(new Date(fechaSeleccionada), "yyyy-MM-dd");
    const filtrados = Items.filter((r) => {
      const fechaRegistro = format(new Date(r.fecha), "yyyy-MM-dd");
      return fechaRegistro === fechaFiltro;
    });
    setRegistrosFiltrados(filtrados);
    setCantidadTurnosLibresDias(filtrados.length);
  } else {
    setRegistrosFiltrados([]);
    setCantidadTurnosLibresDias(0);
  }
}, [fechaSeleccionada, Items]);



  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>Turnos libres del mes de {mes}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              PROFESIONAL
            </InputGroup.Text>
            <Form.Control
              value={profesional}
              aria-label="First name"
              style={{ backgroundColor: "#d5dbdb", color: "black" }}
            />

            <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              PROFESION
            </InputGroup.Text>
            <Form.Control
              value={profesion}
              aria-label="First name"
              style={{ backgroundColor: "#d5dbdb", color: "black" }}
            />
          </InputGroup>
          <InputGroup className="mb-3" size="sm">
            <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              FECHAS DE TURNOS DISPONIBLES:
            </InputGroup.Text>
            <select
              style={{ width: "40%" }}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              //value={fecha}
            >
              <option value="">
                Seleccionar
              </option>
              {fechasAgrupadas.map((fecha, index) => {
                const fechaObj = new Date(fecha);
                const fechaFormateada = fechaObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
                return (
                  <option key={index} value={fechaFormateada}>
                    {fechaFormateada}
                  </option>
                );
              })}
            </select>
             <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              HASTA FIN DE MES.
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3" size="sm">
            <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              DETALLES DE TURNOS LIBRES
            </InputGroup.Text>
            
          </InputGroup>

          <div className="acomodartabla">
            <Table
              bordered
              hover
              style={{ width: "100%", textAlign: "center" }}
            >
              <thead style={{ fontSize: "14px", backgroundColor: "white" }}>
                <tr className="personalizarfila h-50">
                  <th style={{ textAlign: "center", width: "200px" }}>
                    Estado
                  </th>
                  <th style={{ textAlign: "center" }}>Día</th>
                  <th style={{ textAlign: "left" }}>Hora</th>
                  <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
               {registrosFiltrados &&
                registrosFiltrados.map((item) => {
                    let buttonVariant;
                    let buttonText;
                    let isButtonDisabled = false;

                    switch (item.sigla) {
                      case "LIB":
                        buttonVariant = "success";
                        buttonText = item.estado;
                        break;
                      default:
                        buttonVariant = "secondary";
                        buttonText = item.estado;
                        break;
                    }

                    return (
                      <tr key={item.idTurno}>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>
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
                              definirEstadosdeTurnos(item, "LIBRE");
                             
                            }}
                          >
                            {buttonText}
                          </Button>
                        </td>
                        <td style={{ textAlign: "center", fontSize: "12px" }}>
                          {formatearFechaLarga(item.fecha)}
                        </td>
                        <td style={{ textAlign: "center", fontSize: "12px" }}>
                         
                            {item.hora}
                          
                        </td>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>
                         
                            <button
                              title="Copiar ID del turno"
                              className="btn btn-sm btn-light btn-success"
                              onClick={(event) => {
                                event.preventDefault();
                                navigator.clipboard
                                  .writeText(item.idTurno)
                                  .then(() => alert("ID del turno copiado"))
                                  .catch((err) =>
                                    console.error("Error al copiar:", err)
                                  );
                              }}
                            >
                              <i className="fa-solid fa-copy"></i>
                            </button>
                        
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
             
            </Table>
              <InputGroup className="mb-3" size="sm">
           
             <InputGroup.Text
              style={{  color: "black" }}
              
            >
              Turnos libres del día: {CantidadTurnosLibresDias}
            </InputGroup.Text>
          </InputGroup>
          </div>
         {/*  <div className="paginador">
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
          ></span> */}
        </div>
      </Modal.Body>
    </Modal>
      {mdlRegistrarTurno && (
        <MdlAltaTurno
          show={openMdlRegistrarTurno}
          handleClose={closeMdlRegistrarTurno}
          fila={Item}
        />
      )}
    </>
  );
};


export default mdlturnoslibresdelmes;
