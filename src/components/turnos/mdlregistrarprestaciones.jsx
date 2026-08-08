
import react, { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { obrassocialesService } from "/src/services/obrassociales.service";
import { turnosService } from "../../services/turnos.service";

import MdlListarPrestaciones from "../prestaciones/mdllistarprestaciones";
import { prestacionesService } from "../../services/prestaciones.service";
import MdlMensaje from "../modales/MdlMensaje";

import { formatearFecha} from "../utils/fecha";

import CobrarModal from "../cobros/cobrarmodal"; 
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import {  getUsuarioId } from "../utils/auth";


const mdlregistrarprestaciones = ({ show, handleClose, fila }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

 const UserID = getUsuarioId();

const [vieneDe, setVieneDe] = useState("");

  const costoRef = useRef(null);

  const [costo, setCosto] = useState(0);

  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del formulario de entrada

  const [inputValuePorcentaje, setInputValuePorcentaje] = useState("");
  const [inputValueCantidad, setInputValueCantidad] = useState("1");

  const [mdlModalMostarMensaje, setModalMostrarMensaje] = useState(false);
  const [mdlMensaje, setModalMensaje] = useState(false);
  const [cerrarMdlMensaje, setCerrarModalMensaje] = useState(false);

    const [showCobro, setShowCobro] = useState(false);

  // Estado para almacenar el valor del porcentaje de entrada

  const [result, setResult] = useState(0);

  const [resultAcumulado, setResultAcumulado] = useState(0); // Estado para almacenar el resultado del cálculo

  const [totalacobrarpaciente, setTotalacobrarpaciente] = useState(0); 
  const [totalacobrarobrasocial, setTotalacobrarobrasocial] = useState(0); 
  const [subTotal, setSubTotal] = useState(0); 
 // const [subTotalFormateado, setSubTotalFormateado] = useState(0); 

   const [descuentoCoseguro, setDescuentoCoseguro] = useState(0);

  const [selectedValue, setSelectedValue] = useState("");
  const [observaciones, setObservaciones] = useState("");

   const [selectedValueMdePago, setSelectedValueMdePago] = useState("");

  //const totalConDescuento = resultAcumulado - (resultAcumulado * descuentoCoseguro / 100);

   const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);
      const [modalTitulo, setModalTitulo] = useState("REGISTRAR PRESTACIONES");
      const [modalCuerpo, setModalCuerpo] = useState("¿Desea registrar las prestaciones elegidas?");

  let acobrarobrasocial = costo - ((costo * descuentoCoseguro) / 100);


  let acobrarpaciente = costo - acobrarobrasocial;

 


  const [osElegida, setOSElegida] = useState("");

  const [mdePagoElegido, setMdePagolegido] = useState("");

  const [idPrestacion, setIDPrestacion] = useState("");
  const [idprofesion, setIDProfesion] = useState("");
  const [nombrePrestacion, setNombrePrestacion] = useState("");
  const [nombreCapitulo, setNombreCapitulo] = useState("");
  const [subcodigoPrestacion, setSubCodigoPrestacion] = useState("");
  const [codigoPrestacion, setCodigoPrestacion] = useState("");
  const [codigoCapitulo, setCodigoCapitulo] = useState("");
 

  const [Prestacion, setPrestacion] = useState([]);

  const [mdlListaPrestaciones, setModalListarPrestaciones] = useState(false);

  
  const [costoTotalFormateado, setCostoTotalFormateado] = useState("");

  const [prestaciones, setPrestaciones] = useState([]);

    const openMdlListarPrestaciones = () => {
    setModalListarPrestaciones(true);
  };

  
     const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
  };

  
  const openMdlMensaje = () => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")

    setModalMostrarMensaje(true);
  };

  const closeMdlMensaje = () => {
    setModalMostrarMensaje(false);
    if (cerrarMdlMensaje === true){
        handleClose();
    }
     
  };


  const closeMdlListarPrestaciones = () => {
    setModalListarPrestaciones(false);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    
    setIDPrestacion(datoRecibido);

    BuscarPrestacion(datoRecibido);
  };

  const handleDropdownChangeObrasSociales = (eventKey) => {
    setSelectedValue(eventKey);
    setOSElegida(eventKey);
  };

  
  const handleDropdownChangeMediosdePagos = (eventKey) => {
    setSelectedValueMdePago(eventKey);
    setMdePagolegido(eventKey);
  };

  const BuscarPrestacion = async (idprestacion) => {
    try {

       const existe = prestaciones.some(
        (p) => p.idprestacion === idprestacion
      );

      if (existe) {
        setModalMensaje("La prestación ya se encuentra cargada.");
        openMdlMensaje();
        return;
      }


      const data = await prestacionesService.BuscarPrestacion(idprestacion);

      // Verifica la estructura de los datos
      setPrestacion(data); // Establece el estado con los datos obtenidos
      if (data && data.length > 0) {
        setCodigoCapitulo(data[0].idcapitulo);
        setNombreCapitulo(data[0].capitulo.trim());

        setCodigoPrestacion(data[0].codigo);

        setSubCodigoPrestacion(data[0].SubCodigo);
        setNombrePrestacion(data[0].prestacion.trim());
      } else {
        console.error("No se encontraron datos en la respuesta");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const BuscarosPorPaciente = async (idPaciente) => {
    try {
      const data = await obrassocialesService.BuscarPorPaciente(idPaciente);
      setOsPorPaciente(data); // Establece el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Función para manejar el cambio en el control de entrada


  const handleInputChangeCantidad = (e) => {
    setInputValueCantidad(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValue);
  };

  // Función para manejar el cambio en el control de entrada


  const calculateTotalaPagar = (nuevoValor) => {
    // Convierte el valor del formulario de entrada a número
   
    let acumuladoParcial = 0;

    if (resultAcumulado > 0){
          /* acumuladoParcial = Number(resultAcumulado.replace(/\./g, "").replace(",", ".")) + Number(nuevoValor); */
          acumuladoParcial = Number(resultAcumulado) + Number(nuevoValor);

    }else{
     
        acumuladoParcial = Number(nuevoValor)
    }

 
    setResultAcumulado(acumuladoParcial);
    
    const totalacobrar = parseFloat(acumuladoParcial).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setCostoTotalFormateado(totalacobrar); // Actualiza el estado con el resultado del cálculo
  };

  // Función para realizar el cálculo
  const calculateResult = () => {
    const inputValueNumber = parseFloat(inputValue); // Convierte el valor del formulario de entrada a número
    const inputValueNumberPorcentaje = parseFloat(inputValuePorcentaje);
    const valorporcentaje = parseFloat(
      (inputValueNumber * inputValueNumberPorcentaje) / 100
    );
    const calculatedResult = inputValueNumber - valorporcentaje; // Realiza el cálculo (en este caso, se multiplica por 2 como ejemplo)
    setResult(calculatedResult); // Actualiza el estado con el resultado del cálculo
  };

  //Función que agrega la prestacion en la tabla
  const limpiarAgregarPrestacion = () => {
    setCodigoCapitulo("");
    setCodigoPrestacion("");
    setNombrePrestacion("");
    setInputValueCantidad(1);
    setCosto(0);
    setSubCodigoPrestacion("");
    setNombreCapitulo("");
    setObservaciones("");
    setDescuentoCoseguro(0)
    
    

  };

  const limpiar = () => {
    setCodigoCapitulo("");
    setCodigoPrestacion("");
    setNombrePrestacion("");
    setInputValueCantidad(1);
    setCostoTotalFormateado("");
    setSubCodigoPrestacion("");
    setNombreCapitulo("");
    setCosto(0);
    setResultAcumulado(0);
    setPrestaciones([]);
    setTotalacobrarpaciente(0)
    
    

  };

  const handleEliminarPrestacion = (codigo) => {
    // Filtrar la prestación eliminada
    const nuevasPrestaciones = prestaciones.filter(
      (prestacion) => prestacion.codigo !== codigo
    );

    // Actualizar el estado de prestaciones
    setPrestaciones(nuevasPrestaciones);
   
    const nuevoCostoTotal = nuevasPrestaciones.reduce(
      (total, prestacion) =>
        total +
        parseFloat(prestacion.subtotal.replace(/\./g, "").replace(",", ".")),
      0
    );

    
    setResultAcumulado(nuevoCostoTotal);
    
    const totalacobrar = parseFloat(nuevoCostoTotal).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

   

    // Actualizar el estado del costo total si lo tienes
    setCostoTotalFormateado(totalacobrar);
  };

  const handleAgregarPrestacion = () => {

    setCerrarModalMensaje(false)
   
    if (!codigoCapitulo) {
      setModalMensaje("El código de capítulo es obligatorio.");
      openMdlMensaje();
      return;
    }
    if (!nombreCapitulo) {
      setModalMensaje("El nombre del capítulo es obligatorio.");
      openMdlMensaje();
      return;
    }
    if (!codigoPrestacion) {
      setModalMensaje("El código de la prestación es obligatorio.");
      openMdlMensaje();
      return;
    }

    if (!subcodigoPrestacion) {
      setModalMensaje("El subcódigo de la prestación es obligatorio.");
      openMdlMensaje();
      return;
    }

    if (!nombrePrestacion) {
      setModalMensaje("El nombre de la prestación es obligatorio.");
      openMdlMensaje();
      return;
    }

    if (inputValueCantidad < 1) {
      setModalMensaje("La cantidad es obligatoria.");
      openMdlMensaje();
      return;
    }

    if (!parseFloat(costo)) {
      setModalMensaje("El costo debe ser un número válido.");
      openMdlMensaje();
      return;
    }

    setCerrarModalMensaje(true)

    const nuevoSubtotal = parseFloat(costo) * inputValueCantidad;
    setSubTotal(nuevoSubtotal)

    


    // Formatea el costo y el subtotal con dos decimales
    const costoFormateado = parseFloat(costo).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const subtotalFormateado = nuevoSubtotal.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

      if (fila.os === 'PARTICULAR'){
        acobrarobrasocial = 0;
        acobrarpaciente = costo - acobrarobrasocial;
        
      }
      else{
        acobrarobrasocial = costo - ((costo * descuentoCoseguro) / 100);
        acobrarpaciente = costo - acobrarobrasocial;
        
      }

      const totalacobrarobrasocial_parcial = totalacobrarobrasocial + acobrarobrasocial

      setTotalacobrarobrasocial(totalacobrarobrasocial_parcial);

      const totalacobrarpaciente_parcial = totalacobrarpaciente + acobrarpaciente

      setTotalacobrarpaciente(totalacobrarpaciente_parcial);

    

      const nuevaPrestacion = {
        idprestacion: idPrestacion,
        idcapitulo: codigoCapitulo,
        nombreprestacion: nombrePrestacion,
        cantidad: inputValueCantidad,
        preciounitario: costo,
        subtotalformateado: subtotalFormateado,
        observaciones: observaciones,
        coseguro: descuentoCoseguro,
        cobrarapaciente: acobrarpaciente,
        cobraraobrasocial: acobrarobrasocial
      };

      setPrestaciones((prev) => [...prev, nuevaPrestacion]);

      

    // Actualiza el array de prestaciones
   // setPrestaciones([...prestaciones, nuevaPrestacion]);
    
    
    calculateTotalaPagar(nuevoSubtotal);

    limpiarAgregarPrestacion();
  };

  
   async function RegistrarPrestaciones(idturno, idusuario, montoTotalaCobrar, cobrarapaciente, cobraraobrasocial,  prestaciones) {
    
  
    try {
       
        const result = await turnosService.postTurnoRegistrarPrestaciones(
            idturno,
            idusuario,
            montoTotalaCobrar,
            cobrarapaciente,
            cobraraobrasocial,
            prestaciones
        );

        if (result === 0) {
          
            setModalMensaje("Se registraron las prestaciones.");
            openMdlMensaje();
           
        } else {
            setModalMensaje("No se pudieron registrar las prestaciones.");
            openMdlMensaje();
        }

    } catch (error) {

        setModalMensaje("Error de comunicación con el servidor.");
        openMdlMensaje();

    }

}

    const mdlSiNo = async (respuesta) => {
 
      if (respuesta) {
          RegistrarPrestaciones(fila.idTurno, UserID, resultAcumulado, totalacobrarpaciente, totalacobrarobrasocial, prestaciones)
      }else{
         

      }
    };


  useEffect(() => {
    setOSElegida(fila.os);
  }, []);

  useEffect(() => {

    if (fila.os == 'PARTICULAR'){
        setVieneDe("P")
    }else {
        setVieneDe("O")
    }
      
    ;
  }, []);

useEffect(() => {
    costoRef.current?.focus();
    costoRef.current?.select(); // Selecciona todo el contenido
}, []);


  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header
          closeButton
          
          style={{ backgroundColor: "#1e8449", color: "white" }}
        >
          <Modal.Title>TURNO - CARGAR PRESTACIONES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div
              className="modal-overlay"
              style={{ backgroundColor: "white", textAlign: "right" }}
            >
              
              <InputGroup className="mb-3" size="sm">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Fecha turno:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={formatearFecha(fila.fecha)}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                                                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Hora turno:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={fila.hora}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
               
   {/*              <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Fecha
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={currentDate}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                /> */}
              </InputGroup>
              
              <InputGroup className="mb-3" size="sm">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Paciente:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={fila.apenompaciente}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  DNI:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={fila.nroDoc}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Obra Social:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={osElegida}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                </InputGroup>

            </div>

            <div
              className=""
              style={{ backgroundColor: "#A3AFAF", padding: "10px 10px" }}
            >
              <div style={{ backgroundColor: "white", padding: "5px 5px" }}>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <h6 style={{ marginRight: "5px" }}>Buscar prestación:</h6>

                  <Button
                    title="Buscar por capitulo"
                    variant="outline-secondary"
                    id="button-addon1"
                    size="sm"
                    style={{ height: "28px", marginTop: "10px" }}
                    onClick={openMdlListarPrestaciones}
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </div>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Capítulo:
                  </InputGroup.Text>
                  <Form.Control
                    style={{ width: "20%" }}
                    aria-label="Ingresar nombres"
                    aria-describedby="basic-addon2"
                    type="text"
                    readOnly
                    /*  onChange={(e) =>setPrestacion(e.target.value.toUpperCase())}*/
                    value={nombreCapitulo}
                  />
                   <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Código:
                  </InputGroup.Text>
                  <Form.Control
                    style={{ width: "10%" }}
                    placeholder=""
                    aria-label="Ingresar apellido"
                    aria-describedby="basic-addon2"
                    type="text"
                    readOnly
                    /* onChange={(e) =>setCodigo(e.target.value.toUpperCase())}*/
                    value={codigoPrestacion}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Subcódigo:
                  </InputGroup.Text>
                  <Form.Control
                    style={{ width: "10%" }}
                    placeholder=""
                    aria-label="Ingresar apellido"
                    aria-describedby="basic-addon2"
                    type="text"
                    readOnly
                    /* onChange={(e) =>setCodigo(e.target.value.toUpperCase())}*/
                    value={subcodigoPrestacion}
                  />
                   </InputGroup>
                    <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Prestación:
                  </InputGroup.Text>
                  <Form.Control
                    style={{ width: "20%" }}
                    aria-label="Ingresar nombres"
                    aria-describedby="basic-addon2"
                    type="text"
                    readOnly
                    /*  onChange={(e) =>setPrestacion(e.target.value.toUpperCase())}*/
                    value={nombrePrestacion}
                  />
                
                </InputGroup>
                  <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Observaciones:
                  </InputGroup.Text>
                  <Form.Control
                    style={{ width: "20%" }}
                    aria-label="Ingresar observaciones"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) =>setObservaciones(e.target.value.toUpperCase())}
                    value={observaciones}
                  />
                </InputGroup>
    
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Cantidad:
                  </InputGroup.Text>
                  <select
                    value={inputValueCantidad}
                    onChange={handleInputChangeCantidad}
                  >
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    )}
                  </select>

                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Costo $:
                  </InputGroup.Text>
                  <Form.Control
                   ref={costoRef}
                    aria-label="Ingresar precio"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => setCosto(e.target.value)}
                    value={costo}
                  />
                    {osElegida !== "PARTICULAR" && (
                      <>
                        <InputGroup.Text
                          style={{ backgroundColor: "#679bb9", color: "white"  }}
                        >
                          Porcentaje de Coseguro:
                        </InputGroup.Text>

                        <Form.Select
                          value={descuentoCoseguro}
                          onChange={(e) => setDescuentoCoseguro(Number(e.target.value))}
                          style={{
                            maxWidth: "120px",
                            color: "black",
                            backgroundColor: "white",
                            
                            width: "15%" 
                          }}
                        >
                          {Array.from({ length: 21 }, (_, i) => (
                            <option key={i} value={i * 5}>
                              {i * 5} %
                            </option>
                          ))}
                        </Form.Select>
                      </>
                    )}
                  <Button
                    className=""
                    variant="success"
                    onClick={handleAgregarPrestacion}
                  >
                    Agregar
                  </Button>
                 
                </InputGroup>
                <Table bordered hover size="sm" style={{ fontSize: "12px" }}>
                  <thead>
                    <tr className="personalizarfila h-50">
                      {/* <th
                        style={{ backgroundColor: "rgb(136, 161, 184)" }}
                        key="101"
                      >
                        Capítulo
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(136, 161, 184)",
                          textAlign: "center",
                        }}
                        key="100"
                      >
                        Código
                      </th>
                      <th
                        style={{
                          backgroundColor: "rgb(136, 161, 184)",
                          textAlign: "center",
                        }}
                        key="102"
                      >
                        Subcódigo
                      </th> */}

                      <th
                        style={{ backgroundColor: "rgb(136, 161, 184)" }}
                        key="103"
                      >
                        Prestación
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="104"
                      >
                        Cantidad
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="105"
                      >
                        Costo unitario
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="106"
                      >
                        Subtotal
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="107"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestaciones.map((prestacion, index) => (
                      <tr key={index}>
                        {/* <td>{prestacion.nombrecapitulo}</td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.codigopres}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.subcodigo}
                        </td> */}
                        <td>{prestacion.nombreprestacion}</td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.cantidad}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.preciounitario}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.subtotalformateado}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            title="Anular prestación"
                            className="btn btn-sm btn-light btn-danger"
                            onClick={() =>
                              handleEliminarPrestacion(prestacion.codigo)
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#163144", color: "white",}}
                  >
                    Total a cobrar $:
                  </InputGroup.Text>

                  <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={setCostoTotalFormateado}
                    value={costoTotalFormateado}
                   
                    readOnly
                  />
                  {osElegida !== "PARTICULAR" && (
                    <>
                      <InputGroup.Text
                        style={{ backgroundColor: "#163144", color: "white" }}
                      >
                        Total a cobrar al paciente: $
                      </InputGroup.Text>

                      <InputGroup.Text
                        style={{ color: "black", textAlign: "right", width: "20%" }}
                      >
                        {Number(totalacobrarpaciente).toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </InputGroup.Text>
                    </>
                  )}
                </InputGroup>
       
              </div>
           
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={openMdlEstaSeguro}
            disabled={resultAcumulado <= 0}
          >
            Registrar PRESTACIONES
          </Button>
          <Button className="" variant="primary" onClick={limpiar}>
            Limpiar
          </Button>
          <Button className="" variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {mdlListaPrestaciones && (
        <MdlListarPrestaciones
          show={openMdlListarPrestaciones}
          handleClose={closeMdlListarPrestaciones}
          enviarAlPadre={recibirDatoDelHijo}
          idprofesion={fila.idservicio}
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

             {mdlModalMostarMensaje && (
               <MdlMensaje
                 show={openMdlMensaje}
                 handleClose={closeMdlMensaje}
                 modalMessage={mdlMensaje}
               />
             )}
    </>
  );
};

export default mdlregistrarprestaciones;
