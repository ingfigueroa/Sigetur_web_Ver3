import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import "/src/css/pizarradeturnos.css";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { pacientesService } from "/src/services/pacientes.service";

import { format, parseISO } from "date-fns";

const mdlpacienteultimosturnos = ({
  show,
  handleClose,
  idpaciente,
  paciente,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [Items, setItems] = useState(null);
  const [cantidadTurnos, setCantidadTurnos] = useState(0);

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

    const data = await pacientesService.BuscarUltimosTurnos(idpaciente);
   
    setItems(data);
    setCantidadTurnos(data.length)
    
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
        <Modal.Title>PACIENTE - Ultimos turnos</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
        <div>
          <div> 
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                PACIENTE
              </InputGroup.Text>
              <Form.Control
                value={paciente}
                aria-label="First name"
                style={{ backgroundColor: "#d5dbdb", color: "black" }}
              />
            </InputGroup>
          </div>

          <div>
            <InputGroup className="mb-3" size="sm">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                CANTIDAD DE TURNOS ENCONTRADOS: {cantidadTurnos}
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
                    Estado
                  </th>

                  <th style={{ textAlign: "center" }} key="1">
                    Fecha
                  </th>

                  <th key="20">Hora</th>

                  <th style={{ textAlign: "center" }} key="2">
                    Profesional
                  </th>

                  <th style={{ textAlign: "center" }} key="3">
                    Servicio
                  </th>

                  <th style={{ textAlign: "center" }} key="21">
                    Obra Social
                  </th>
                </tr>
              </thead>
              <tbody>
                {Items &&
                  Items.map((item) => {
                    let buttonVariant;
                    let buttonText;

                    // Definir variantes y textos según el estado
                    switch (item.sigla) {
                      case "ANU":
                        buttonVariant = "dark";
                        buttonText = item.Estado;
                        break;
                      case "PEN":
                        buttonVariant = "warning";
                        buttonText = item.Estado;
                        break;
                      case "PRE":
                        buttonVariant = "primary";
                        buttonText = item.Estado;
                        break;

                      case "ACA":
                        buttonVariant = "info";
                        buttonText = item.Estado;
                        break;
                      case "ASA":
                        buttonVariant = "danger";
                        buttonText = item.Estado;
                        break;
                      case "PEN COB":
                        buttonVariant = "warning";
                        buttonText = item.Estado;
                        break;
                      case "PRE COB":
                        buttonVariant = "primary";
                        buttonText = item.Estado;
                        break;
                      case "NCI":
                        buttonVariant = "secondary";
                        buttonText = item.Estado;
                        break;
                      case "PRE NCOB":
                        buttonVariant = "primary";
                        buttonText = item.Estado;
                        break;

                      case "LIB":
                        buttonVariant = "success";
                        buttonText = item.Estado;

                        break;
                    }
                    return (
                      <tr key={item.ID}>
                        <td
                          style={{
                           
                            textAlign: "left"
                          }}
                        >
                          <Button
                          variant={buttonVariant}
                          size="sm"
                          style={{ width: "70%", textAlign: "center" }}
                          
                          
                        >
                          {buttonText}
                        </Button>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                         {format(parseISO(item.Fecha), "dd/MM/yyyy")}
                        </td>{" "}
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {format(parseISO(item.Hora), "HH:mm")}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.Profesional}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.Servicio}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.Obrasocial}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default mdlpacienteultimosturnos;
