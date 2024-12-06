import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import "/src/css/pizarradeturnos.css";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { profesionalesService } from "/src/services/profesional.service";

const mdlhorarioprofesional = ({
  show,
  handleClose,
  idprofesional,
  fecha,
  profesional,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [Items, setItems] = useState(null);

  const handleRadioChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    const selectedItem = Items.find((item) => item.ID == selectedValue);

    if (
      selectedItem &&
      !selectedItems.some((item) => item.ID == selectedValue)
    ) {
      setSelectedId(selectedValue);
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  async function Buscar() {
    /*  const fechaActual = formatearFecha(fechaActualSinParsear); */

    const data = await profesionalesService.BuscarHorarios(
      idprofesional,
      fecha
    );

    setItems(data);
   
  }

  useEffect(() => {
    Buscar();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>Horarios profesional</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
        <div>
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
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Fecha desde:
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar profesional"
                aria-label="Buscar profesional"
                aria-describedby="basic-addon2"
                type="date"
                /*   onChange={handleFechaChange} */
                /*  value={Fecha} */
              />
            </InputGroup>
          </div>

          <div>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                HORARIOS ACTUALES
              </InputGroup.Text>
            </InputGroup>

            <Table
              striped
              bordered
              hover
              style={{ width: "750px", fontSize: "12px" }}
            >
              <thead>
                <tr className="personalizarfila h-50">
                  <th style={{ textAlign: "center" }} key="0">
                    Día
                  </th>

                  <th style={{ textAlign: "center" }} key="1">
                    Mañana desde
                  </th>

                  <th key="20">Mañana hasta</th>

                  <th style={{ textAlign: "center" }} key="2">
                    Intervalo
                  </th>

                  <th style={{ textAlign: "center" }} key="3">
                    Tarde desde
                  </th>

                  <th key="22">Tarde hasta</th>

                  <th style={{ textAlign: "center" }} key="21">
                    Intervalo
                  </th>
                  <th style={{ textAlign: "center" }} key="5">
                    Noche desde
                  </th>

                  <th key="6">Noche hasta</th>

                  <th style={{ textAlign: "center" }} key="7">
                    Intervalo
                  </th>
                  <th style={{ textAlign: "center", width: "10%" }} key="8">
                    Seleccionar
                  </th>
                </tr>
              </thead>
              <tbody>
                {Items &&
                  Items.map((item) => (
                    <tr key={item.ID}>
                      <td style={{ textAlign: "left" }}>{item.dia}</td>
                      <td
                        style={{
                          backgroundColor: item.int_m > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.hmd}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_m > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.hmh}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_m > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.int_m}
                      </td>

                      <td
                        style={{
                          backgroundColor: item.int_t > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.htd}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_t > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                        s
                      >
                        {item.hth}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_t > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.int_t}
                      </td>

                      <td
                        style={{
                          backgroundColor: item.int_n > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.hnd}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_n > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                        s
                      >
                        {item.hnh}
                      </td>
                      <td
                        style={{
                          backgroundColor: item.int_n > 0 ? "#bbe8c9" : "red",
                          textAlign: "center",
                        }}
                      >
                        {item.int_n}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="select-item"
                          value={item.ID}
                          checked={selectedId == item.ID}
                          onChange={handleRadioChange}
                          style={{
                            transform: "scale(0.8)",
                            width: "30%",
                            height: "12px",
                          }} // Ajustar tamaño si es necesario
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default mdlhorarioprofesional;
