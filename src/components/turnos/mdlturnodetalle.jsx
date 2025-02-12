import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

import { es } from "date-fns/locale";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { turnosService } from "/src/services/turnos.service";

const mdlturnodetalle = ({ show, handleClose, fila }) => {
  const [observaciones, setObservaciones] = useState(null);

  const [Items, setItems] = useState(null);

  const fechaISO = fila.fecha;

  // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
  const fechaObj = new Date(fechaISO);

  // Ajustar la fecha al UTC manualmente
  const fechaLocal = new Date(
    fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
  );

  // Formatear usando toLocaleString o date-fns como prefieras
  const fechaLarga = fechaLocal.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleObservacionesChange = (e) => {
    const nuevaObservacion = e.target.value.toUpperCase();
    setObservaciones(nuevaObservacion);
  };

  const handleUpdateEstado = () => {};

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await turnosService.EstadosPorTurno(fila.idTurno); // Llama a la función asíncrona
        setItems(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    // Ejecuta la función para obtener los datos
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1e8449", color: "white" }}
      >
        <Modal.Title>TURNO - DETALLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div style={{ backgroundColor: "white", textAlign: "right" }}>
            {fila.estado !== "PENDIENTE" && (
              <Button
                variant="outline-secondary"
                id="button-addon1"
                style={{ marginRight: "5px" }}
                title="Enviar detalle por mail"
              >
                <i class="fa-regular fa-envelope"></i>
              </Button>
            )}

            {fila.estado !== "PENDIENTE" && (
              <Button
                style={{ marginRight: "5px" }}
                variant="outline-secondary"
                id="button-addon1"
                title="Visualizar Radiografías"
              >
                VerRx
              </Button>
            )}
          </div>
          <div>
            <h1> </h1>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Estado:
              </InputGroup.Text>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
                value={fila.estado}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Fecha:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fechaLarga}
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Hora:
              </InputGroup.Text>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.desde}
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Paciente:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.apeNom}
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Obra social:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.os}
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Profesional:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.ApeNomProfe}
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Servicio:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.servicio}
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Observaciones:
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                aria-describedby="basic-addon1"
                value={fila.obs}
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>
          </div>
          <div>
            <h4>Detalle de estados</h4>
            <Table bordered hover>
              <thead>
                <tr className="personalizarfila h-50">
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(136, 161, 184)",
                      width: "200px",
                    }}
                  >
                    Fecha
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(136, 161, 184)",
                    }}
                  >
                    Estado
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(136, 161, 184)",
                    }}
                  >
                    Observaciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {Items &&
                  Items.map((item) => {
                    const fechaISO = item.fecha;

                    // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
                    const fechaObj = new Date(fechaISO);

                    // Ajustar la fecha al UTC manualmente
                    const fechaLocal = new Date(
                      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
                    );

                    // Formatear usando toLocaleString o date-fns como prefieras
                    const fechaFormateada =
                      fechaLocal.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) +
                      " " +
                      fechaLocal.toLocaleTimeString("es-ES");
                    // Verifica los datos traídos desde la base de datos
                    return (
                      <tr key={item.idturno}>
                        <td style={{ textAlign: "center", fontSize: "12px" }}>
                          {fechaFormateada}
                        </td>
                        <td style={{ textAlign: "center", fontSize: "12px" }}>
                          {item.estado}
                        </td>
                        <td style={{ textAlign: "center", fontSize: "12px" }}>
                          {item.observaciones}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
        <hr />
        <div>
          <InputGroup>
            <InputGroup.Text
              style={{ backgroundColor: "#679bb9", color: "white" }}
            >
              ¿Desea agregar un comentario u observación?
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              onChange={handleObservacionesChange}
              value={observaciones}
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleUpdateEstado}>
          Aplicar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlturnodetalle;
