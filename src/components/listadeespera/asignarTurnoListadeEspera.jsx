import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { turnosService } from "/src/services/turnos.service";
import { listadeesperaService } from "/src/services/listadeespera.service";
import { obrassocialesService } from "/src/services/obrassociales.service";

import "/src/css/personalizar-modales.css";
import AbrirMDLMensaje from "../modales/MdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

const asignarTurnoListadeEspera = ({
  show,
  handleClose,
  idprofesional,
  idpaciente,
  apeynomprofesional,
  apeynompaciente,

  idlistadeespera,
}) => {
  const [Items, setItems] = useState(null);

  
    const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
      "¿Está seguro de ASIGNAR un TURNO a la fila de la LISTA DE ESPERA?"
    );
  
    const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
      "LISTA DE ESPERA - ASIGNAR un TURNO"
    );

  const [idTurno, setIDTurno] = useState("");

  const [observaciones, setObservaciones] = useState("");
  const [showMDLMensaje, setShowMDLMensaje] = useState("");

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [osPorPaciente, setOsPorPaciente] = useState([]);
  const [idObraSocialPacienteSelected, setIdObraSocialPacienteSelected] =
    useState("");

  const [idusuario, setIDUsuario] = useState("2");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
  };

  
  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
    setShowMDLMensaje(true)
  };

  const verificarGrabar = () =>{
    openMdlEstaSeguro()
  }
  
  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar
     Grabar()
     
    } else {
      console.log("Usuario canceló la operación");
    }
  };

  async function BuscarosPorPaciente(idpaciente) {
    try {
      const data = await obrassocialesService.BuscarPorPaciente(idpaciente); // Llama a la función asíncrona
      setOsPorPaciente(data); // Establece el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function Grabar() {
    await listadeesperaService.AsignarTurnoListaDeEspera(
      idlistadeespera,
      idTurno,
      idpaciente,
      idObraSocialPacienteSelected,
      observaciones,
      idusuario
    );

    setMensaje("Turno asignado con éxito.");
    setShowMDLMensaje(true);
    handleClose();
  }

  const estiloInputGroup = {
    backgroundColor: "#679bb9",
    width: "15%",
    color: "white",
    height: "25px",
  };

  const estiloFormControl = {
    fontSize: "20px",
    resize: "none",
    height: "25px",
    
    textAlign: "center",
  };

  const estiloFormSelect = {
    fontSize: "15px",

    height: "25px",
    fontWeight: "bold",
    textAlign: "center",
    width: "60%",
  };

  async function BuscarTurno() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setIDTurno(clipboardText);

      // Validación: vacío o no numérico
      if (
        !clipboardText ||
        isNaN(clipboardText) ||
        !Number.isInteger(Number(clipboardText))
      ) {
        setMensaje(
          "El contenido del portapapeles no es un ID válido de turno."
        );
        setShowMDLMensaje(true);
        return;
      }

      const data = await turnosService.TurnoLibreID(clipboardText);

      // Validar si el servicio devolvió algo útil
      if (!data) {
        setMensaje("No se encontró ningún turno con el ID proporcionado.");
        setShowMDLMensaje(true);
        return;
      }

      if (idprofesional !== data.idprofesional) {
        setMensaje(
          "El profesional del turno elegido, no es el mismo que eligió el paciente."
        );
        setShowMDLMensaje(true);
        return;
      }

      BuscarosPorPaciente(idpaciente);

      setItems(data);
    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener detalles del turno.");
      setShowMDLMensaje(true);
    }
  }

  const handleFechaChange = (fecha) => {
    if (!fecha) return null;

    const fechaISO = fecha;

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

    return fechaLarga;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName="personalizar-modales"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#044f82",
            color: "white",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <Modal.Title>LISTA DE ESPERA - ASIGNAR UN TURNO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", display: "grid" }}>
              <InputGroup className="mb-3">
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#044f82",
                    textAlign: "center",
                  }}
                >
                  Asignar turno al paciente:
                </h3>

                <Form.Control
                  readOnly
                  style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "30px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                  value={apeynompaciente}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#044f82",
                    textAlign: "center",
                  }}
                >
                  Con el profesional:
                </h3>

                <Form.Control
                  readOnly
                  style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "30px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                  value={apeynomprofesional}
                />
              </InputGroup>
              <hr />
            </div>
            <div style={{ width: "100%" }}>
              <InputGroup className="mb-3">
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#044f82",
                    textAlign: "center",
                  }}
                >
                  Generar Búsqueda:
                </h3>
                <Button
                  size="sm"
                  title="Buscar turno"
                  variant="outline-secondary"
                  style={{ marginLeft: "10px", height: "30px" }}
                  onClick={() => {
                    BuscarTurno();
                  }}
                >
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
              </InputGroup>
            </div>
            <h3>Datos del turno para asignar</h3>
            <InputGroup className="mb-3">
              <InputGroup.Text style={estiloInputGroup}>
                Profesional:
              </InputGroup.Text>

              <Form.Control
                readOnly
                style={estiloFormControl}
                value={Items?.profesional || "sin dato"}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text style={estiloInputGroup}>
                Servicio:
              </InputGroup.Text>

              <Form.Control
                readOnly
                style={estiloFormControl}
                value={(Items?.servicio || "sin dato").trim()}
              />
            </InputGroup>
            <div
              style={{
                backgroundColor: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text style={estiloInputGroup}>
                  Fecha:
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  style={estiloFormControl}
                  value={handleFechaChange(Items?.fecha) || "sin dato"}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    width: "40%",
                    color: "white",
                    height: "25px",
                  }}
                >
                  Elegir obra social del paciente:
                </InputGroup.Text>
                <select
                  style={estiloFormSelect}
                  onChange={(e) =>
                    setIdObraSocialPacienteSelected(e.target.value)
                  }
                  value={idObraSocialPacienteSelected}
                >
                  <option value="" disabled>
                    Seleccionar{" "}
                  </option>
                  {osPorPaciente.map((os) => (
                    <option key={os.id} value={os.id}>
                      {os.Descripcion}
                    </option>
                  ))}
                </select>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text style={estiloInputGroup}>
                  Hora:
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  rows={1}
                  style={estiloFormControl}
                  value={Items?.hora || "sin dato"}
                />
                <InputGroup.Text style={estiloInputGroup}>
                  Estado:
                </InputGroup.Text>

                <Form.Control
                  readOnly
                  style={estiloFormControl}
                  value={Items?.estado || "sin estado"}
                />
              </InputGroup>
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
            <h6 style={{ textAlign: "left" }}>Observaciones</h6>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="3"
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  height: "50px",
                }}
                onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={verificarGrabar}>
              Grabar
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cancelar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {showMDLMensaje && (
        <AbrirMDLMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mensaje}
        />
      )}

      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo={mdlMensajeCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}
    </>
  );
};

export default asignarTurnoListadeEspera;
