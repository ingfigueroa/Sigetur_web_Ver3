import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format, parse } from "date-fns";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { turnosService } from "/src/services/turnos.service";

const mdlturnodetalle_Ver1 = ({ show, handleClose, fila }) => {
  const [FechaLarga, SetFechaLarga] = useState(null);
  const [Fecha, SetFecha] = useState(null);
  const [Items, setItems] = useState(null);

  const formatearFecha = (fechaISO) => {
    try {
      // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
      const fechaObj = new Date(fechaISO);
  
      // Ajustar la fecha al UTC manualmente
      const fechaLocal = new Date(
        fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
      );
  
      // Formatear usando toLocaleString
      return (
        fechaLocal.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) 
        
      );
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha no válida";
    }
  };

  useEffect(() => {
    if (fila?.fecha) {
      SetFechaLarga(formatearFecha(fila.fecha));
    }
  }, [fila]);

/*   useEffect(() => {
    async function fetchData() {
      try {
        const fechaISO = fila.fecha;

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
        SetFechaLarga(fechaFormateada);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); */

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
        style={{ backgroundColor: "#044f82", color: "white", brightness: "100" }}
      >
        <Modal.Title>TURNO - DETALLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            marginBottom: "0px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              textAlign: "center",
              width: "50%",
            }}
          >
            <h1
              style={{
                fontSize: "55px",
                color: "#044f82",
                fontFamily: "verdana",
              }}
            >
             {fila.desde}
            </h1>
            <h1
              style={{
                fontSize: "15px",
                color: "#044f82",
              }}
            >
              {FechaLarga}
            </h1>
            <h1
              style={{
                fontSize: "15px",
                color: "#044f82",
              }}
            >
              {fila.estado}
            </h1>
          </div>
          <div
            style={{
              fontSize: "12px",
              textAlign: "left",
              color: "#044f82",
              width: "50%",
              marginTop: "20px",
            }}
          >
            <div style={{ width: "100%", display: "grid" }}>

              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Profesional."
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{ height: "25px" }}
                  color="white"
                >
                  {/*   <i class="fa-solid fa-magnifying-glass"></i> */}
                  <i class="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  style={{
                    textAlign: "center",
                    width: "25%",
                    height: "25px",
                    fontSize: "12px",
                  }}
                  aria-label="Buscar profesional"
                  aria-describedby="basic-addon2"
                  readOnly
                  value={fila.ApeNomProfe}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Paciente."
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{ height: "25px" }}
                  color="white"
                >
                  {/*   <i class="fa-solid fa-magnifying-glass"></i> */}
                  <i class="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  style={{
                    textAlign: "center",
                    width: "25%",
                    height: "25px",
                    fontSize: "12px",
                  }}
                 
                  aria-describedby="basic-addon2"
                  readOnly
                  value={fila.apeNom}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Servicio"
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{ height: "25px" }}
                  color="white"
                >
                  {/*   <i class="fa-solid fa-magnifying-glass"></i> */}
                  <i class="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  style={{
                    textAlign: "center",
                    width: "25%",
                    height: "25px",
                    fontSize: "12px",
                  }}
                  aria-describedby="basic-addon2"
                  readOnly
                  value={fila.servicio.trim()}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Obra Social"
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{ height: "28px" }}
                  color="white"
                >
                  {/*   <i class="fa-solid fa-magnifying-glass"></i> */}
                  <i class="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  style={{
                    textAlign: "center",
                    width: "25%",
                    height: "28px",
                    fontSize: "15px",
                  }}
                  aria-describedby="basic-addon2"
                  readOnly
                  value={fila.os}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "0px",
            textAlign: "center",
            width: "100%",
            backgroundColor: "red"
          }}
        >
          <h6
            style={{
              textAlign: "left",
              paddingTop: "5px"
            }}
          >
            Observaciones
          </h6>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              style={{
                textAlign: "left",
                width: "90%",
                height: "50px",
                fontSize: "12px",
              }}
              aria-describedby="basic-addon2"
              readOnly
              value={fila.obs}
            />
          </InputGroup>
          <div>
            <h6
              style={{
                textAlign: "left",
                paddingTop: "1px"
              }}
            >
              Detalle de estados
            </h6>
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
/*                */
                      const fechaFormateada = formatearFecha(item.fecha);
                    // Verifica los datos traídos desde la base de datos
                   
                    return (
                      <tr key={item.idturno}>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>
                          { fechaFormateada}
                        </td>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>
                          {item.estado}
                        </td>
                        <td style={{ textAlign: "center", fontSize: "10px" }}>
                          {item.observaciones}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"
        onClick={handleClose}
        >Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlturnodetalle_Ver1;
