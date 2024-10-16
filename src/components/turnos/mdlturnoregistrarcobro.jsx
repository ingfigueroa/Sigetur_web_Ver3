import react, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { obrassocialesService } from "/src/services/obrassociales.service";

import MdlListarPrestaciones from "../prestaciones/mdllistarprestaciones";
import { prestacionesService } from "../../services/prestaciones.service";

const mdlturnoregistrarcobro = ({ show, handleClose, fila, idprofesion }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del formulario de entrada

  const [inputValuePorcentaje, setInputValuePorcentaje] = useState("");
  const [inputValueCantidad, setInputValueCantidad] = useState("1");
  // Estado para almacenar el valor del porcentaje de entrada

  const [result, setResult] = useState(0); 
  
  const [resultAcumulado, setResultAcumulado] = useState(0); // Estado para almacenar el resultado del cálculo

  const [selectedValue, setSelectedValue] = useState("");
  const [osPorPaciente, setOsPorPaciente] = useState([]);
  const [osElegida, setOSElegida] = useState("");

  const [idPrestacion, setIDPrestacion] = useState("");
  const [nombrePrestacion, setNombrePrestacion] = useState("");
  const [codigoPrestacion, setCodigoPrestacion] = useState("");

  const [Prestacion, setPrestacion] = useState([]);

  const [mdlListaPrestaciones, setModalListarPrestaciones] = useState(false);

  const [costo, setCosto] = useState("");
  const [costoAcumulado, setCostoAcumulado] = useState("0");
  const [prestaciones, setPrestaciones] = useState([]);

  const openMdlListarPrestaciones = () => {
    setModalListarPrestaciones(true);
  };

  const closeMdlListarPrestaciones = () => {
    setModalListarPrestaciones(false);
  };

  const recibirDatoDelHijo = (datoRecibido) => {
    setIDPrestacion(datoRecibido);

    BuscarPrestacion(datoRecibido);
  };

  useEffect(() => {
    if (fila && fila.IDPaciente) {
      BuscarosPorPaciente(fila.IDPaciente);
    }
  }, [fila]);

  const handleDropdownChange = (eventKey) => {
    setSelectedValue(eventKey);
    setOSElegida(eventKey);
  };

  const BuscarPrestacion = async (idprestacion) => {
    try {
      
      const data = await prestacionesService.BuscarPrestacion(idprestacion);
      // Verifica la estructura de los datos
      setPrestacion(data); // Establece el estado con los datos obtenidos
      if (data && data.length > 0) {
        setCodigoPrestacion(data[0].Codigo);
        setNombrePrestacion(data[0].Descripcion);
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
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValuePorcentaje);
  };

  const handleInputChangeCantidad = (e) => {
    setInputValueCantidad(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValue);
  };

  // Función para manejar el cambio en el control de entrada
  const handleInputChangePorcentaje = (e) => {
    setInputValuePorcentaje(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValue);
  };

  const calculateTotalaPagar = (nuevoValor) => {
    // Convierte el valor del formulario de entrada a número
    const x  = parseFloat(resultAcumulado)

    const y = parseFloat(nuevoValor)


    const acumulado = parseFloat(x) + parseFloat(y);

  
    setResultAcumulado(acumulado); // Actualiza el estado con el resultado del cálculo
 

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


     setCodigoPrestacion("")
     setNombrePrestacion("")
     setInputValueCantidad(1)
      setCosto("")
     
  
  };

  const handleAgregarPrestacion = () => {
    const nuevoSubtotal = parseFloat(costo) * inputValueCantidad;
  
    // Formatea el costo y el subtotal con dos decimales
    const costoFormateado = parseFloat(costo).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const subtotalFormateado = nuevoSubtotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
    const nuevaPrestacion = {
      codigo: codigoPrestacion,
      nombre: nombrePrestacion,
      cantidad: inputValueCantidad,
      costo: costoFormateado, // Usamos el costo formateado
      subtotal: subtotalFormateado, // Usamos el subtotal formateado
    };
  
    // Actualiza el array de prestaciones
    setPrestaciones([...prestaciones, nuevaPrestacion]);
    calculateTotalaPagar(nuevoSubtotal);
  
    limpiarAgregarPrestacion();
  };
  
  
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" style={{ top: "" }}>
        <Modal.Header
          closeButton
          size="sm"
          style={{ backgroundColor: "#1e8449", color: "white" }}
        >
          <Modal.Title>TURNOS - REGISTRAR COBRO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div
              className="modal-overlay"
              style={{ backgroundColor: "white", textAlign: "right" }}
            >
              <InputGroup className="mb-3" size="sm">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Elija la opción de cobro"
                  style={{ color: "black" }}
                  onSelect={handleDropdownChange}
                >
                  {osPorPaciente.length > 0 ? (
                    osPorPaciente.map((os) => (
                      <Dropdown.Item key={os.id} eventKey={os.Descripcion}>
                        {os.Descripcion}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>
                      No hay obras sociales disponibles
                    </Dropdown.Item>
                  )}
                </DropdownButton>
                <Form.Control
                  type="text"
                  value={osElegida}
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                <InputGroup.Text
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
                />
              </InputGroup>
            </div>

            <div
              className=""
              style={{ backgroundColor: "#A3AFAF", padding: "10px 10px" }}
            >
              <div style={{ backgroundColor: "white", padding: "5px 5px" }}>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <h6 style={{ marginRight: "10px", marginBottom: "5px" }}>
                    Buscar prestación:
                  </h6>

                  <Button
                    title="Buscar por capitulo"
                    variant="outline-secondary"
                    id="button-addon1"
                    style={{ height: "38px" }}
                    onClick={openMdlListarPrestaciones}
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </div>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Código:
                  </InputGroup.Text>
                  <Form.Control
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
                    Prestación:
                  </InputGroup.Text>
                  <Form.Control
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
                    aria-label="Ingresar precio"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) =>setCosto(e.target.value)}
                    value={costo}
                  />
                  <Button
                    className=""
                    variant="primary"
                    onClick={handleAgregarPrestacion}
                  >
                    Agregar
                  </Button>
                </InputGroup>
                <Table bordered hover size="sm" style={{ fontSize: "12px" }}>
                  <thead>
                    <tr className="personalizarfila h-50">
                      <th
                        style={{ backgroundColor: "rgb(136, 161, 184)" }}
                        key="100"
                      >
                        Código
                      </th>

                      <th
                        style={{ backgroundColor: "rgb(136, 161, 184)" }}
                        key="101"
                      >
                        Prestación
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="102"
                      >
                        Cantidad
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="103"
                      >
                        Costo unitario
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="104"
                      >
                        Subtotal
                      </th>

                      <th
                        style={{
                          textAlign: "center",
                          backgroundColor: "rgb(136, 161, 184)",
                        }}
                        key="105"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestaciones.map((prestacion, index) => (
                      <tr key={index}>
                        <td>{prestacion.codigo}</td>
                        <td>{prestacion.nombre}</td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.cantidad}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.costo}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {prestacion.subtotal}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            title="Anular prestación"
                            className="btn btn-sm btn-light btn-danger"
                            
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
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Total a cobrar $:
                  </InputGroup.Text>

                  <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    onChange={setResultAcumulado}
                    value={resultAcumulado}
                    style={{ backgroundColor: "#d5dbdb" }}
                    readOnly
                  />
                </InputGroup>
              </div>
              <div style={{ backgroundColor: "white", padding: "5px 5px" }}>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <h6 style={{ marginRight: "10px", marginBottom: "5px" }}>
                    Definir las opciones de pago:{" "}
                  </h6>
                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    size="sm"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </Button>
                </div>
                <div>
                  <Table bordered hover size="sm" style={{ fontSize: "12px" }}>
                    <thead>
                      <tr className="personalizarfila h-50">
                        <th
                          style={{ backgroundColor: "rgb(136, 161, 184)" }}
                          key="1"
                        >
                          Cobrado al
                        </th>

                        <th
                          style={{ backgroundColor: "rgb(136, 161, 184)" }}
                          key="2"
                        >
                          Monto
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(136, 161, 184)",
                          }}
                          key="0"
                        >
                          Observaciones
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(136, 161, 184)",
                          }}
                          key="6"
                        >
                          Titular tarjeta
                        </th>

                        <th
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(136, 161, 184)",
                          }}
                          key="7"
                        >
                          Nro. tarjeta
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            backgroundColor: "rgb(136, 161, 184)",
                          }}
                          key="17"
                        >
                          Vto. tarjeta
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
                    <tbody></tbody>
                  </Table>
                </div>
                <div>
                  <InputGroup className="mb-3" size="sm">
                    <InputGroup.Text
                      style={{ backgroundColor: "#679bb9", color: "white" }}
                    >
                      Subtotal $:
                    </InputGroup.Text>

                    <Form.Control
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      value="6500"
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#d5dbdb" }}
                      readonly
                    />

                    <InputGroup.Text
                      style={{ backgroundColor: "#679bb9", color: "white" }}
                    >
                      Descuento %:
                    </InputGroup.Text>
                    <select
                      value={inputValuePorcentaje}
                      onChange={handleInputChangePorcentaje}
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
                      SubTotal c/descuento $:
                    </InputGroup.Text>

                    <Form.Control
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      value={result}
                      style={{ backgroundColor: "#d5dbdb" }}
                      readonly
                    />
                  </InputGroup>
                </div>
              </div>
              <div>
                <InputGroup
                  className="mb-3"
                  size="sm"
                  style={{ margin: "30px 0px" }}
                >
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Total COBRADO $:
                  </InputGroup.Text>

                  <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    value="6500.00"
                    style={{ backgroundColor: "#d5dbdb" }}
                    readonly
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="" variant="success" onClick={handleClose}>
            Grabar
          </Button>
          <Button className="" variant="primary" onClick={handleClose}>
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
          idprofesion={idprofesion}
        />
      )}
    </>
  );
};

export default mdlturnoregistrarcobro;
