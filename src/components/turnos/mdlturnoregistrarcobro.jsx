import react, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { obrassocialesService } from "/src/services/obrassociales.service";
import  mdlListaPrestaciones  from "../prestaciones/mdllistarprestaciones";



const mdlturnoregistrarcobro = ({ show, handleClose, fila, idprofesion }) => {




  const [selectedValue, setSelectedValue] = useState("");
  const [osPorPaciente, setOsPorPaciente] = useState([]);
  const [osElegida, setOSElegida] = useState("");

  const [mdlListaPrestaciones, setModalListarPrestaciones] = useState(false);

  const openMdlListarPrestaciones = () => {
    setModalListarPrestaciones(true);
   
  };

  const closeMdlListarPrestaciones = () => {
    setModalListarPrestaciones(false);
   
    
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

  const BuscarosPorPaciente = async (idPaciente) => {
    try {
      console.log(idPaciente)
      const data = await obrassocialesService.BuscarPorPaciente(idPaciente);
      setOsPorPaciente(data); // Establece el estado con los datos obtenidos
      console.log(osPorPaciente)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  



  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del formulario de entrada

  const [inputValuePorcentaje, setInputValuePorcentaje] = useState(""); // Estado para almacenar el valor del porcentaje de entrada

  const [result, setResult] = useState(0); // Estado para almacenar el resultado del cálculo

  // Función para manejar el cambio en el control de entrada
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValuePorcentaje);
  };

  // Función para manejar el cambio en el control de entrada
  const handleInputChangePorcentaje = (e) => {
    setInputValuePorcentaje(e.target.value); // Actualiza el estado con el nuevo valor del formulario de entrada
    calculateResult(e.target.value, inputValue);
  };

  // Función para realizar el cálculo
  const calculateResult = () => {
    const inputValueNumber = parseFloat(inputValue); // Convierte el valor del formulario de entrada a número
    const inputValueNumberPorcentaje = parseFloat(inputValuePorcentaje);
    const valorporcentaje = parseFloat((inputValueNumber * inputValueNumberPorcentaje) / 100)
    const calculatedResult = (inputValueNumber - valorporcentaje); // Realiza el cálculo (en este caso, se multiplica por 2 como ejemplo)
    setResult(calculatedResult); // Actualiza el estado con el resultado del cálculo
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
        style={{color:"black"}}
        onSelect={handleDropdownChange}
      >
        {osPorPaciente.length > 0 ? (
          osPorPaciente.map((os) => (
            <Dropdown.Item key={os.id} eventKey={os.Descripcion}>
              {os.Descripcion}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>No hay obras sociales disponibles</Dropdown.Item>
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
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <h6 style={{ marginRight: "10px", marginBottom: "5px" }}>
                Agregar prestaciones a cobrar:{" "}
              </h6>
              <Button 
                variant="outline-secondary" 
                id="button-addon1"
                size="sm"
                onClick={openMdlListarPrestaciones }
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
                
                </tbody>
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
                  value="6500.00"
                  style={{ backgroundColor: "#d5dbdb" }}
                  readonly
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Descuento:
                </InputGroup.Text>

                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  value="08:30"
                  style={{ backgroundColor: "#d5dbdb" }}
                />
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Total a cobrar $:
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
            <div style={{ backgroundColor: "#2F8292", padding: "5px 5px" }}>
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
                  <tbody>
                   
                    
                  </tbody>
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
                  <select value={inputValuePorcentaje} onChange={handleInputChangePorcentaje}>
                   
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
        <mdllistarPrestaciones 
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
