import react, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Button, InputGroup, Form, DropdownButton, Table } from "react-bootstrap";

import CreditoForm from "./tarjetacreditoform";
import DebitoForm from "./tarjetadebitoform";
import TransferenciaForm from "./transferenciaform";
import ContadoForm from "./contadoform";

import MdlMensaje from "../modales/MdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import { mediosdepagosService } from "/src/services/mediosdepagos.service";
import { turnosService } from "/src/services/turnos.service";

import { getUsuarioId } from "../utils/auth";
import { tr } from "date-fns/locale";

const CobrarModal = ({ show, handleClose, fila }) => {

  console.log(fila)

    const UserID = getUsuarioId();

    const [cerrarPadreAlCerrarMensaje, setCerrarPadreAlCerrarMensaje] = useState(false);


    const [mediosdePagos, setMediosdePagos] = useState([]);
    const [mdePagoElegido, setMdePagoElegido] = useState("EFECTIVO");
    
       const [idMdePago, setIdMdePago] = useState(0);

    const [inputValuePorcentaje, setInputValuePorcentaje] = useState("");
    const [result, setResult] = useState(0);
     const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);

     const [descuento, setDescuento] = useState(0);
    const [observaciones, setObservaciones] = useState("");

       const [modalTitulo, setModalTitulo] = useState("");
       const [modalCuerpo, setModalCuerpo] = useState("");

       const [totalConDescuento, setTotalConDescuento] = useState(0)

       const [idTarjeta, setIDTarjeta] = useState(0);
       const [nroTarjeta, setNroTarjeta] = useState("0000");
       const [fechaVto, setFechaVto] = useState("9999");
       const [titularApeNom, setTitularApeNom] = useState("NADA");
       const [montoTotalaCobrar, setMontoTotalaCobrar] = useState("");

       const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
       const [mdlMensaje, setShowMDLMensaje] = useState(false);

       const [vieneDe, setVieneDe] = useState("");

      
       
const openMdlMensaje = (cerrarPadre = false) => {
    setCerrarPadreAlCerrarMensaje(cerrarPadre);
    setModalMostrarMensaje(true);
};

const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);

    if (cerrarPadreAlCerrarMensaje) {
        handleClose();
        setCerrarPadreAlCerrarMensaje(false);
    }
};
     

  


    
  const openMdlEstaSeguro = () => {

      if (!validar(mdePagoElegido.descripcion)){
          setShowMDLMensaje("Faltan datos para registrar el cobro.");
          openMdlMensaje();
          return;
      }

    setModalTitulo("REGISTRAR COBRO - " + mdePagoElegido.descripcion)
    setModalCuerpo("¿Está seguro de registrar el cobro?")

    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);

  };


    const formularios = {
      "TARJETA DE CREDITO": <CreditoForm
              observaciones={observaciones}
          setObservaciones={setObservaciones}
          ultimosCuatrosNroTarjeta={nroTarjeta}
          setUltimosCuatrosNroTarjeta={setNroTarjeta}
          fechaVto={fechaVto}
          setFechaVto={setFechaVto}
          titularApeNom={titularApeNom}
          setTitularApeNom={setTitularApeNom}
          idtarjeta={idTarjeta}
          setIDTarjeta={setIDTarjeta}
      />,
      "TARJETA DE DEBITO": <DebitoForm
              observaciones={observaciones}
          setObservaciones={setObservaciones}
          ultimosCuatrosNroTarjeta={nroTarjeta}
          setUltimosCuatrosNroTarjeta={setNroTarjeta}
          fechaVto={fechaVto}
          setFechaVto={setFechaVto}
          titularApeNom={titularApeNom}
          setTitularApeNom={setTitularApeNom}
           idtarjeta={idTarjeta}
          setIDTarjeta={setIDTarjeta}
      />,
      "TRANSFERENCIA": <TransferenciaForm
                 observaciones={observaciones}
          setObservaciones={setObservaciones}
          ultimosCuatrosNroTarjeta={nroTarjeta}
          setUltimosCuatrosNroTarjeta={setNroTarjeta}
          fechaVto={fechaVto}
          setFechaVto={setFechaVto}
          titularApeNom={titularApeNom}
          setTitularApeNom={setTitularApeNom}
           idtarjeta={idTarjeta}
          setIDTarjeta={setIDTarjeta}
      />,
      "EFECTIVO": <ContadoForm
         
          observaciones={observaciones}
          setObservaciones={setObservaciones}
          ultimosCuatrosNroTarjeta={nroTarjeta}
          setUltimosCuatrosNroTarjeta={setNroTarjeta}
          fechaVto={fechaVto}
          setFechaVto={setFechaVto}
          titularApeNom={titularApeNom}
          setTitularApeNom={setTitularApeNom}
           idtarjeta={idTarjeta}
          setIDTarjeta={setIDTarjeta}
      />,
      //"QR": <QrForm />
    };

      function validar(formadepago){

            console.log(formadepago)

                console.log("Pasa por validar")
                
            if (formadepago == "TARJETA DE CREDITO") {

              console.log("pasa por TARJETA DE CREDITO")
              if (!nroTarjeta || !fechaVto || !titularApeNom || idTarjeta === 0) {
                return false;
              }
            }

            if (formadepago == "TARJETA DE DEBITO") {

              console.log("pasa por TARJETA DE debito")
              if (!nroTarjeta || !titularApeNom || idTarjeta === 0) {
                return false;
              }
            }

            if (formadepago == "TRANSFERENCIA") {
              if (!nroTarjeta || !titularApeNom) {
                return false;
              }
            }

            return true;
          }
         
      



        function BuscarMediosdePago() {
          mediosdepagosService.getBuscar()
            .then(data => {
              setMediosdePagos(data);

              // Selecciona EFECTIVO por defecto
              const efectivo = data.find(
                mp => mp.descripcion.toUpperCase() === "EFECTIVO"
              );

              if (efectivo) {
                setMdePagoElegido(efectivo);
              }
            })
            .catch(error => console.error("Error fetching data:", error));
        }

  async function GrabarCobroTurno() {

   try  {
    
        const result =  await turnosService.postTurnoCobrar(
              fila.idTurno, 
            
              UserID,
              observaciones,

              mdePagoElegido.id,
              idTarjeta,
              nroTarjeta,
              fechaVto,
              titularApeNom,
              montoTotalaCobrar,
              vieneDe
        );



        if (result === 0) {
            
            setShowMDLMensaje("Se registró el cobro del turno.");
              openMdlMensaje(true);
            
          } else {
              setShowMDLMensaje("No se pudieron registrar las prestaciones.");
              openMdlMensaje(true);
          }

    } catch (error) {

        console.log(error)  
      /* setModalMensaje("Error de comunicación con el servidor.");
        openMdlMensaje(); */

    }

  }


      const handleInputChange = (e) => {
        setInputValue(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
        calculateResult(e.target.value, inputValuePorcentaje);
      };

        const mdlSiNo = async (respuesta) => {
         
          if (respuesta) {
            
            if (mdePagoElegido?.descripcion === 'EFECTIVO'){

              
                setNroTarjeta("0000");
                setFechaVto("9999");
                setTitularApeNom("NADA");
                setIDTarjeta(0);

               
            }
             
                GrabarCobroTurno()
             
              //}    
          } else {
            
          }
        }
          
      const seleccionarMedioPago = (id) => {
          const medio = mediosdePagos.find(mp => mp.id === Number(id));
          setMdePagoElegido(medio);
      };

    useEffect(() => {
      
          
        setMontoTotalaCobrar(fila.totalacobrar)
        if (fila.os === 'PARTICULAR'){
            setVieneDe("P");
        }else{
            setVieneDe("P");
        }
       
        BuscarMediosdePago();
      
    }, []);

   



  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton
       size="sm"
      style={{
           color:"white",
            backgroundColor: "#198754",
            
          }}
      >
        <Modal.Title>TURNO - Registrar COBRO</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ backgroundColor: "white", padding: "5px 5px" }}>
                        {/* <div style={{ display: "flex", marginBottom: "5px" }}> */}
                       
                          <InputGroup className="mb-3" >
                            <InputGroup.Text
                            style={{ backgroundColor: "white", color: "black",  fontSize: "18px", marginRight:"10px", maxWidth: "220px"  }}
                          >
                            Se cobra en
                          </InputGroup.Text>
                          <DropdownButton
                      id="dropdown-basic-button"
                      title={mdePagoElegido?.descripcion || "Elija el medio de pago"}
                      style={{ color: "black", backgroundColor: "white" }}
                      onSelect={seleccionarMedioPago}
                  >
                      {mediosdePagos.length > 0 ? (
                          mediosdePagos.map((mp) => (
                              <Dropdown.Item
                                  key={mp.id}
                                  eventKey={mp.id}
                                  style={{
                                      fontSize: "18px",
                                      color: "black",
                                      backgroundColor: "white",
                                  }}
                              >
                                  {mp.descripcion}
                              </Dropdown.Item>
                          ))
                            ) : (
                                <Dropdown.Item disabled>
                                    No hay medios de pagos disponibles
                                </Dropdown.Item>
                            )}
                            </DropdownButton>
                          </InputGroup>
      
                      </div>
                      <hr />

                      <div className="mt-3">
                          <h5>{formularios[mdePagoElegido.descripcion]}</h5>
                      </div>
                      <div>

                        <hr />
                        <InputGroup className="mb-3" >
                          <InputGroup.Text
                          style={{ backgroundColor: "white", color: "black",  fontSize: "18px", marginRight:"10px", width: "15%", textAlign: "right"  }}
                        >
                         Total: $ 
                        </InputGroup.Text>

                        <InputGroup.Text
                          style={{ color: "black", textAlign: "right",  fontSize: "24px",  width: "20%", backgroundColor: "#7ab8e4", marginRight:"30px",   }}
                        >
                          {Number(montoTotalaCobrar).toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} 
                        </InputGroup.Text>

                   
                        </InputGroup>
                       
                        
                      </div>
       

        {/* acá después agregás medios de pago */}
      </Modal.Body>

      <Modal.Footer>

         <Button variant="primary"
         onClick={openMdlEstaSeguro}
         style={{
           color:"white",
            backgroundColor: "#198754",
            
          }}
         >
          Confirmar cobro
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>

       
      </Modal.Footer>
    </Modal>

         {showMDLEstaSeguro && (
            <MDLEstaSeguro
              show={openMdlEstaSeguro}
              handleClose={closeMdlEstaSeguro}
              mensajetitulo={modalTitulo}
              mensajecuerpo={modalCuerpo}
              enviaralpadre={mdlSiNo}
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


export default CobrarModal;