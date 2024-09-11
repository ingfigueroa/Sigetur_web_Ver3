import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns"
import "/src/css/pizarradeturnos.css";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/tablapizaturnos.css";
import MdlAltaTurno from "./mdlaltaturno";
import MdlTurnoDetalle from "./mdlturnodetalle";
import Mdlanularturno from "./mdlanularturno";
import Mdlturnoregistrarcobro from "./mdlturnoregistrarcobro";

import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";
import Mdllistaespera from "../mdlListaEspera";
import MdlSiNo from "../modales/mdlSiNO";
import MdlAnular from "../modales/mdlAnular";



import { turnosService } from "/src/services/turnos.service";
import { profesionalesService} from "/src/services/profesional.service";





function tablapizarradeturnos() {
 
  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);
  const [mdlSiNoMensaje, setModalSiNoMensaje] = useState(null);

  const [mdlSiNo, setModalSiNo] = useState(null);
  const [mdlAnularTurno, setModalAnularTurno] = useState(false);



  const [mdlHoraProfe, setModalHoraProfe] = useState(false);
  const [mdlListaEspera, setModalListaEspera] = useState(false);
  const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);
  
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);

  const [IDProfesional, SetIDProfesional]  = useState(null);
  const [IDProfesion, SetIDProfesion]  = useState(null);
  const [IDEstado, setIdEstado] = useState(null);
  const [anular, setAnular] = useState(false);

  const [Fecha, SetFecha]  = useState("");
  const [vieneDE, setVieneDE]  = useState("");
  const [FechaLarga, SetFechaLarga]  = useState(null);

  const [idusuario, setUsuario]  = useState('1');

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  
 
   
 const [mdlRegistrarTurno, setModalRegistrarTurno] = useState(false);

 const [apeyNom, setapeyNom] = useState(null)
 const [profesion, setProfesion] = useState(null)

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
    BuscarTurnosProfesionalFecha(IDProfesional, Fecha)
    
  };
  

  
  const openMdlTurnoDetalle = (fila) => {
    setItem(fila)
    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };


  const openMdlAnularTurno = () => {
   // setModalSiNoMensaje("¿Está seguro de anular el turno?")
    setModalAnularTurno(true);
  };

  const closeMdlAnularTurno = () => {
    setModalAnularTurno(false);
  };

  const [mdlturnoregistrarcobro, setModalTurnoRegistrarCobro] = useState(false);


  const openMdlTurnoRegistrarCobro = (fila) => {
    setItem(fila);
    setModalTurnoRegistrarCobro(true);
  };

  const closeMdlTurnoRegistrarCobro = () => {
    setModalTurnoRegistrarCobro(false);
  };


  const definirEstadosdeTurnos = (fila, VieneDE) => {
    

    try {
        setItem(fila);
        setIdEstado(fila.idestado)
        if (fila.estado == "LIBRE" && VieneDE == "LIBRE"){
            openMdlRegistrarTurno(fila)

        } else if (fila.estado == "PENDIENTE" && VieneDE == "PENDIENTE") {
        
          setModalSiNoMensaje("¿Esta seguro de cambiar el estado del turno a PRESENTE?");
          setModalSiNo(true);

        }  else if (fila.estado == "PENDIENTE" && VieneDE == "ANULAR") {

         // setModalSiNoMensaje("¿Esta seguro de anular el turno?");
          
          openMdlAnularTurno();

        }

        setItem(fila);
        BuscarTurnosProfesionalFecha(IDProfesional, Fecha);
        
    } catch (error) {
      
    }

    
  };

  const handleYes = (observaciones) => {
   
     TurnosCambiarEstado(Item, 'PNC', observaciones);
     
     BuscarTurnosProfesionalFecha(IDProfesional, Fecha)

    // Aquí agregas la lógica para cambiar el estado del turno
  };

  const handleAnular = (observaciones) => {
       

    TurnosCambiarEstado(Item, 'ANULAR', observaciones)
    setAnular(false);
    BuscarTurnosProfesionalFecha(IDProfesional, Fecha)

   // Aquí agregas la lógica para cambiar el estado del turno
 };

  const handleClose = () => {
   
    setModalSiNo(false);
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
};

const handleFechaChangeLarga  = (event,) => {
  
  const selectedDate = new Date(FechaLarga);

    // Formatear la fecha usando date-fns
    const formattedDate = format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es });

    setFecha(formattedDate)
};

const handleFechaChange = (e) => {
 
  SetFecha(e.target.value);
  
  const fechaISO = e.target.value;
    
  // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
  const fechaObj = new Date(fechaISO);
  

  // Ajustar la fecha al UTC manualmente
  const fechaLocal = new Date(fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000);

  // Formatear usando toLocaleString o date-fns como prefieras
  const fechaLarga = fechaLocal.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  SetFechaLarga(fechaLarga)
  
  
};
  
  async function BuscarTurnosPorProfesionalPorFecha(idusuario, idprofesional, fecha) {
   
    if (idprofesional>0){
       const data = await turnosService.CrearTurnosPorProfesionalPorFecha(idusuario, idprofesional, fecha)
      
        BuscarTurnosProfesionalFecha(idprofesional, fecha)
        // Asegúrate de que `Apellido` y `Nombres` existen en `data`
       
      
    }
    
      }



  async function BuscarTurnosProfesionalFecha(idprofesional,fecha) {
    
 
 
    if (idprofesional>0){
       const data = await turnosService.BuscarPorProfesionalFecha(idprofesional, fecha);
      
       if (data) {
        setItems(data); // Asignar los datos a `Items`
     
        // Asegúrate de que `Apellido` y `Nombres` existen en `data`
       
      }
    }
    
      }

      
  async function BuscarProfesionalyProfesion(idprofesional) {
  
    
    const data = await profesionalesService.BuscarPorId(idprofesional);
    
   
    if (data) {
      setItems(data); // Asignar los datos a `Items`
   
      // Asegúrate de que `Apellido` y `Nombres` existen en `data`
      if (data[0].Apellido && data[0].Nombres) {
          setapeyNom(`${data[0].Apellido}, ${data[0].Nombres}`); // Concatenar apellido y nombres
       
      } else {
          console.error("Los datos del profesional no contienen Apellido o Nombres.");
      }
      
      if (data[0].especialidad) {
          setProfesion(data[0].especialidad); // Asignar especialidad
          SetIDProfesion(data[0].idtipoprofesion)
         
      }
  }
   
 
    
    //generar array de las páginas para mostrar en select del paginador
      }

      
  async function TurnosCambiarEstado(fila, vieneDE, obs) {
    


    try {
    
    
       const data = await turnosService.TurnosCambiarEstado(fila.idTurno, fila.idestado, obs, idusuario, vieneDE)
      
    } catch (error) {
      
    }
      
    }
    
      



  return (
    <>
      <div
        style={{
          
          width: "100%",
         
         marginTop:"0",
         marginBottom: "0"
         
        }}
      >
        <div style={{ display: "flex", backgroundColor: "white"}}>
            <div style={{ width: "60%", textAlign: "center", display: "grid" }}>
          
                  <h2> Pizarra de turnos</h2>
            
           </div>
            <div style={{ width: "40%", textAlign: "right"  }}>
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
            <div  style={{
              display: "grid",
              width: "80%",
              paddingtop: "0",
            
                       
            }}>
            
              <div 
              style={{witdh: "100%"}}
              >
              
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    color: "white",
                    height: "38px",

                  
                  }}
                >
                  Elegir fecha
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
                  width: "50%"

                
                }}
                   
                    
                    aria-describedby="basic-addon2"
                    readOnly
                    value={FechaLarga}
                  />
               
              </InputGroup>
             
              </div>
              
              
            </div>
            <div style={{
                  
                  display: "flex"
                }}>
                    <div
                  style={{
                  
                    width: "45%"
                  
                  
                  }}>
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
                                
                        width: "35%"
                      
                    
                      }}>          
                    <InputGroup className="mb-3">
                  
                    
                      <InputGroup.Text
                        style={{
                          backgroundColor: "#679bb9",
                          color: "white",
                          height: "38px"
                          
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
                      marginRight:  "15px"
                    }}>
                  
                        <Button 
                        variant="success"
                          size="sm"
                          style={{ width: "70%", textAlign: "center" }}
                      
                          onClick={() => BuscarTurnosPorProfesionalPorFecha(idusuario, IDProfesional, Fecha)} 
                          >
                          Burcar Turnos

                        </Button>
                    
                    
                  </div>
                  
            </div>
        </div>
      
        
        <div className="acomodartabla">
          <Table bordered hover>
            <thead>
              <tr className="personalizarfila h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    width:"200px"
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
                    
                    case 'ANU':
                      buttonVariant = 'dark';
                      buttonText = item.estado;
                      break;
                    case 'PEN':
                      buttonVariant = 'warning';
                      buttonText = item.estado;
                      break;
                    case 'PRE':
                      
                        buttonVariant = 'primary';
                        buttonText = item.estado;
                        break;
                  
                    case 'ACA':
                    buttonVariant = 'info';
                      buttonText = item.estado;
                      break;
                      case 'ASA':
                    buttonVariant = 'danger';
                      buttonText = item.estado;
                      break;
                    case 'PEN COB':
                      buttonVariant = 'warning';
                      buttonText = item.estado;
                      break;
                    case 'PRE COB':
                      buttonVariant = 'primary';
                      buttonText = item.estado;
                      break;
                  case 'NCI':
                      buttonVariant = 'secondary';
                      buttonText = item.estado;
                      break;
                    case 'PRE NCOB':
                      buttonVariant = 'primary';
                      buttonText = item.estado;
                      break;
                  
                    case 'LIB':
                      buttonVariant = 'success';
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
              if (item.estado == "PENDIENTE"){
                definirEstadosdeTurnos(item, 'PENDIENTE');
              } else if (item.estado == "LIBRE"){
                definirEstadosdeTurnos(item, 'LIBRE');
              }
            }}
            
             >
              {buttonText}

            </Button>
          </td>
         
          <td style={{ textAlign: "center", fontSize: "12px" }}>{item.desde}</td> {/* Mostrar hora formateada */}
          
          <td style={{ textAlign: "center", fontSize: "12px" }}>
            <Button variant="" size="sm" style={{ width: "70%", textAlign: "center" }}>
              {item.apeNom}
            </Button>
          </td>
          <td style={{ textAlign: "center", fontSize: "12px" }}>

           {item.nroDoc > 0 ? item.nroDoc : null}
          </td>
          <td style={{ textAlign: "center", fontSize: "12px" }}>{item.os}</td>
          <td style={{ textAlign: "center", fontSize: "12px" }}>
          {item.estado == 'PENDIENTE' && (
            <button
              title="Anular turno"
              className="btn btn-sm btn-light btn-danger"
              onClick={(event) => {
                event.preventDefault();
               
                definirEstadosdeTurnos(item, 'ANULAR');
              }}


            >
              <i className="fa-solid fa-trash"></i>
            </button>
            )}
             {item.estado !== 'LIBRE' && (
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
            {item.estado == 'PRESENTE NO COBRADO' && (
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

      {mdlSiNo && (
        <MdlSiNo 
          show={setModalSiNoMensaje}  
          handleClose={handleClose}
          enviarAlPadre= {handleYes}
          fila={Item}
         
         /> 
      )}

      {mdlAnularTurno && (
        <Mdlanularturno 
        show={setModalAnularTurno}  
        handleClose={closeMdlAnularTurno}
        enviarAlPadre= {handleAnular}
        fila={Item}
         
         
         />
      )}

    </>
  );
}

export default tablapizarradeturnos;
