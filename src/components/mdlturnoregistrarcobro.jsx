import react, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

const mdlturnoregistrarcobro = ({ show, handleClose }) => {
  const data = [
    {
      Cod: "0004",
      Prestación: "CONSULTA A CONSULTORIO",
      Cantidad: "1",
      Costounitario: "6500.00",
      Subtotal: "6500.00",
    },
    {
      Cod: "0004",
      Prestación: "CONSULTA A CONSULTORIO",
      Cantidad: "1",
      Costounitario: "6500.00",
      Subtotal: "6500.00",
    },
    {
      Cod: "0004",
      Prestación: "CONSULTA A CONSULTORIO",
      Cantidad: "1",
      Costounitario: "6500.00",
      Subtotal: "6500.00",
    },
  ];
  const datatarjeta = [
    {
      formacobro: "CONTADO",
      Monto: "6500.00",
      Obser: "pago contado",
      titulartarjeta: "---",
      nrotarjeta: "---",
      vtotarjeta: "---",
    },
    {
      formacobro: "TARJETA",
      Monto: "7500.00",
      Obser: "pago tarjeta",
      titulartarjeta: "RODOLFO FIGUEROA",
      nrotarjeta: "001502365896365",
      vtotarjeta: "06/32",
    },
  ];

  function TableRowTarjeta({ itemtarjeta }) {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{itemtarjeta.formacobro}</td>
        <td style={{ textAlign: "center" }}>{itemtarjeta.Monto}</td>
        <td style={{ textAlign: "center" }}>{itemtarjeta.Obser}</td>
        <td style={{ textAlign: "center" }}>{itemtarjeta.titulartarjeta}</td>
        <td style={{ textAlign: "center" }}>{itemtarjeta.nrotarjeta}</td>
        <td style={{ textAlign: "center" }}>{itemtarjeta.vtotarjeta}</td>

        <td style={{ textAlign: "center" }}>
          <button
            title="Anular prestación"
            className="btn btn-sm btn-light btn-danger"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
  function TableRow({ item }) {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{item.Cod}</td>
        <td style={{ textAlign: "center" }}>{item.Prestación}</td>
        <td style={{ textAlign: "center" }}>{item.Cantidad}</td>
        <td style={{ textAlign: "center" }}>{item.Costounitario}</td>
        <td style={{ textAlign: "center" }}>{item.Subtotal}</td>

        <td style={{ textAlign: "center" }}>
          <button
            title="Anular prestación"
            className="btn btn-sm btn-light btn-danger"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  }

  const [selectedValue, setSelectedValue] = useState(""); // Estado para almacenar el valor seleccionado del dropdown

  const handleDropdownChange = (eventKey) => {
    setSelectedValue(eventKey); // Actualizar el valor seleccionado en el estado
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
    <Modal show={show} onHide={handleClose} size="lg" style={{ top: "" }}>
      <Modal.Header
        closeButton
        size="sm"
        style={{ backgroundColor: "#1e8449", color: "white" }}
      >
        <Modal.Title>REGISTRAR COBRO</Modal.Title>
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
                onSelect={handleDropdownChange}
              >
                <Dropdown.Item eventKey="PARTICULAR">PARTICULAR</Dropdown.Item>
                <Dropdown.Item eventKey="DASPU">DASPU</Dropdown.Item>
                <Dropdown.Item eventKey={"DASUTEN"}>DASUTEN</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                type="text"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
                value={selectedValue}
                readOnly
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
              <Button variant="outline-secondary" id="button-addon1" size="sm">
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
                      Código
                    </th>

                    <th
                      style={{ backgroundColor: "rgb(136, 161, 184)" }}
                      key="2"
                    >
                      Prestación
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        backgroundColor: "rgb(136, 161, 184)",
                      }}
                      key="0"
                    >
                      Cantidad
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        backgroundColor: "rgb(136, 161, 184)",
                      }}
                      key="6"
                    >
                      Costo unitario
                    </th>

                    <th
                      style={{
                        textAlign: "center",
                        backgroundColor: "rgb(136, 161, 184)",
                      }}
                      key="7"
                    >
                      Subtotal
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
                  {data.map((item) => (
                    <TableRow key={item.Cantidad} item={item} />
                  ))}
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
                        key="7"
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
                    {datatarjeta.map((itemtarjeta) => (
                      <TableRowTarjeta
                        key={itemtarjeta.formacobro}
                        itemtarjeta={itemtarjeta}
                      />
                    ))}
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
  );
};

export default mdlturnoregistrarcobro;
