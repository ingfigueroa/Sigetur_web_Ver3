import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

import { profesionalesService } from "/src/services/profesional.service";
import { profesionesService } from "/src/services/profesiones.service.js";

import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

const mdllistarprofesionales = ({ show, handleClose, enviarAlPadre }) => {
  const [Apellido, SetApellido] = useState(null);
  const [VarDNI, SetDNI] = useState(null);
  const [items, setItems] = useState(null);
  const [TipoProfesion, setTipoProfesion] = useState([]);
  const [idTipoProfesionSelected, setIdTipoProfesionSelected] = useState("");
  const [idProfesionEnviar, setIdProfesionEnviar] = useState("");

  const seleccionarProfesional = (idProfesional) => {
    enviarAlPadre(idProfesional);
    handleClose(); // Envía el id al componente padre
  };
  /*Carga Tipo de profesiones*/
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await profesionesService.Buscar(); // Llama a la función asíncrona
        setTipoProfesion(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);

  async function Buscar() {
    const data = await profesionalesService.Buscar(
      Apellido,
      VarDNI,
      idTipoProfesionSelected
    );
    setItems(data);
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl" style={{ width: "100%" }}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>Buscar profesionales</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>
        <div className="acomodarencabezadopizaturnos">
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
                backgroundColor: "#679bb9",
                color: "white",
                height: "28px",
              }}
            >
              Profesional
            </InputGroup.Text>
            <Form.Control
              style={{
                textAlign: "center",
                
                height: "28px",
              }}
              placeholder="Buscar por apellido"
              aria-label="Buscar profesional"
              aria-describedby="basic-addon2"
              onChange={(e) => SetApellido(e.target.value.toUpperCase())}
              value={Apellido}
              autoFocus
            />

            <Button
             size="sm"
              title="Buscar por APELLIDO"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "28px" }}
              color=""
              onClick={() => Buscar()}
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
              DNI
            </InputGroup.Text>

            <Form.Control
          
              placeholder="Buscar por DNI"
              aria-label="Profesión"
              aria-describedby="basic-addon2"
              style={{ marginght: "20px", height:"28px" }}
              onChange={(e) => SetDNI(e.target.value)}
              value={VarDNI}
            />
            <Button
               size="sm"
         
              title="Buscar por DNI"
              variant="outline-secondary"
              id="button-addon1"
              style={{ height: "28px" }}
              color="white"
              onClick={() => Buscar()}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
          <InputGroup.Text
            style={{
              backgroundColor: "#679bb9",
              color: "white",
              height: "28px",
            }}
          >
            Profesión
          </InputGroup.Text>
          <select
            style={{
              backgroundColor: "white",

              height: "28px",
            }}
            onChange={(e) => setIdTipoProfesionSelected(e.target.value)}
            value={idTipoProfesionSelected}
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {TipoProfesion.map((profesion) => (
              <option key={profesion.id} value={profesion.id}>
                {profesion.descripcion}
              </option>
            ))}
          </select>

          <Button
          size="sm"
         
          
            title="Buscar por profesión"
            variant="outline-secondary"
            id="button-addon1"
            style={{ height: "28px" }}
            color="white"
            onClick={() => Buscar()}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
        </div>

        <Table bordered hover>
          <thead>
            <tr className="personalizarfila h-50">
              <th
                style={{
                  textAlign: "left",
                  backgroundColor: "rgb(136, 161, 184)",
                  height: "28px"
                }}
              >
                Apellido
              </th>

              <th
                style={{
                  textAlign: "left",
                  backgroundColor: "rgb(136, 161, 184)",
                  height: "28px"
                }}
                key="1"
              >
                Nombres
              </th>

              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(136, 161, 184)",
                  height: "28px"
                }}
                key="2"
              >
                Profesión
              </th>

              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(136, 161, 184)",
                  height: "28px"
                }}
                key="3"
              >
                DNI
              </th>

              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "rgb(136, 161, 184)",
                  height: "28px"
                }}
                key="8"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((Item) => (
                <tr key={Item.ID}>
                  <td style={{ textAlign: "left", fontSize: "12px" }}>
                    {Item.Apellido}
                  </td>
                  <td style={{ textAlign: "left", fontSize: "12px" }}>
                    {Item.Nombres}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "12px" }}>
                    {Item.especialidad}
                  </td>
                  <td style={{ textAlign: "center", fontSize: "12px" }}>
                    {Item.NroDocumento}
                  </td>

                  <td style={{ textAlign: "center", fontSize: "12px" }}>
                    <Button
                      variant="outline-success"
                      size="sm"
                      style={{ width: "70%" }}
                      onClick={() => seleccionarProfesional(Item.ID)}
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
                //<TableRow item={item} />
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdllistarprofesionales;
