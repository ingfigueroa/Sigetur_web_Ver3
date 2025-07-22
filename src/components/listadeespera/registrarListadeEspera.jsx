import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import MdlListarProfesionales from "../profesionales/mdllistarprofesionales";
import { profesionalesService } from "/src/services/profesional.service";
import { pacientesService } from "/src/services/pacientes.service";
import { listadeesperaService } from "/src/services/listadeespera.service";
import { horasService } from "/src/services/horas.service";

import MdlListarPacientes from "../pacientes/mdllistarpacientes";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";



const registrarlistadeespera = ({ show, handleClose,  idpaciente, idprofesional  }) => {

    const [modalMessage, setModalMessage] = useState("");
    const [modalMessageTitulo, setModalMessageTitulo] = useState("");

    const [fechadesde, setFechaDesde] = useState("");
    const [fechahasta, setFechaHasta] = useState("");
    const [horaDesde, setHoraDesde] = useState("");
   const [mdlAltaExitosa, setMdlAltaExitosa] = useState(null);
    const [horaHasta, setHoraHasta] = useState("");
    const [idhorahasta, setIDHoraHasta] = useState("");
    const [idhoradesde, setIDHoraDesde] = useState("");
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);
    const [Apellido, SetApellido] = useState("");
    const [VarDNIPaciente, SetDNIPaciente] = useState("");
    const [IDProfesional, SetIDProfesional] = useState(null);
    const [profesion, setProfesion] = useState(null);
    const [IDProfesion, SetIDProfesion] = useState(null);
    const [idusuario, SetIDUsuario] = useState(2);
    const [apeyNomProfesional, setapeyNomProfesional] = useState(null);
    const [apeyNomPaciente, setapeyNomPaciente] = useState(null);
    const [Items, setItems] = useState(null);
    const [mdlListaProfesionales, setModalListarProfesionales] = useState(false);
    const [mdlListaPacientes, setModalListarPacientes] = useState(false);
    const [idPaciente, SetIdPaciente] = useState("");
    const [observaciones, setObservaciones] = useState(null);
    const [horarios, setHorarios] = useState([]);
  

    
  const openModalAlta = () => {
    setModalMessage("ALTA EXITOSA");
    setMdlAltaExitosa(true);
  };

  const closeModalAlta = () => {
    setMdlAltaExitosa(false);
  };

  const openModalAltaExitosa = () => {
    console.log("Pasa por aca: alta exitosa")
    setModalMessage("Se registró una fila de la lista de espera con éxito.")
    setModalMessageTitulo("REGISTRAR LISTA DE ESPERA")
    setMdlAltaExitosa (true);
  };

  const closeModalAltaExitosa = () => {
    setMdlAltaExitosa(false);
  };

    const openMdlListarProfesionales = () => {
      setModalListarProfesionales(true);
    };
  
    const closeMdlListarProfesionales = () => {
      setModalListarProfesionales(false);
    };
  
    const openMdlListarPacientes = () => {
      setModalListarPacientes(true);
    };
  
    const closeMdlListarPacientes = () => {
      setModalListarPacientes(false);
    };
  
    const estiloInputGroupText = {
      backgroundColor: "#679bb9",
      color: "white",
      height: "38px",
    };
  
    const estiloFormControl = {
      backgroundColor: "#eeeeee",
      color: "black",
      height: "38px",
    };
  
    async function BuscarProfesionalyProfesion(idprofesional) {
      const data = await profesionalesService.BuscarId(idprofesional);
  
      if (data) {
        setItems(data); // Asignar los datos a `Items`
  
        // Asegúrate de que `Apellido` y `Nombres` existen en `data`
        if (data[0].Apellido && data[0].Nombres) {
          setapeyNomProfesional(`${data[0].Apellido}, ${data[0].Nombres}`); // Concatenar apellido y nombres
          setProfesion(data[0].tprofesion);
        } else {
          console.error(
            "Los datos del profesional no contienen Apellido o Nombres."
          );
        }
  
        if (data[0].especialidad) {
          setProfesion(data[0].especialidad); // Asignar especialidad
          SetIDProfesion(data[0].idtipoprofesion);
        }
      }
      setItems([]);
      //generar array de las páginas para mostrar en select del paginador
    }
  
    async function BuscarPaciente(idpaciente) {
      try {
        const data = await pacientesService.BuscarPorId(idpaciente);
        // Asignar los valores recibidos a los estados del formulario
  
        if (data) {
          setItems(data); // Asignar los datos a `Items`
  
          // Asegúrate de que `Apellido` y `Nombres` existen en `data`
          if (data[0].Apellido && data[0].Nombres) {
            setapeyNomPaciente(`${data[0].Apellido}, ${data[0].Nombres}`); // Concatenar apellido y nombres
            SetDNIPaciente(data[0].NroDocumento);
          } else {
            console.error(
              "Los datos del profesional no contienen Apellido o Nombres."
            );
          }
  
          if (data[0].especialidad) {
            setProfesion(data[0].especialidad); // Asignar especialidad
            SetIDProfesion(data[0].idtipoprofesion);
          }
          setItems([]);
        }
      } catch (error) {
        console.error("Error al buscar paciente:", error);
      }
  
      //generar array de las páginas para mostrar en select del paginador
    }
  
    const recibirDatoDelHijo = (datoRecibido) => {
      SetIDProfesional(datoRecibido);
  
      BuscarProfesionalyProfesion(datoRecibido);
      /* limpiarTabla(); */
    };
  
    const recibirDatoDelHijoPaciente = (datoRecibido) => {
      SetIdPaciente(datoRecibido);
      
      BuscarPaciente(datoRecibido);
    };
  
    const Limpiar = () => {
      setapeyNomPaciente(""); // Concatenar apellido y nombres
      SetDNIPaciente("");
      setProfesion(""); // Asignar especialidad
      SetIDProfesion("");
      setapeyNomProfesional(""); // Concatenar apellido y nombres
      setProfesion("");
      setHoraDesde("");
      setHoraHasta("");
      setFechaDesde("");
      setFechaHasta("");
      setDiasSeleccionados([]);
      setObservaciones("");
      setItems([]);
    };
  
    const diasSemana = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
  
    useEffect(() => {
      async function obtenerHorarios() {
        try {
          const data = await horasService.getBuscar(); // Esta función debe llamar al procedimiento
          setHorarios(data);
        } catch (error) {
          console.error("Error al obtener horarios", error);
        }
      }
  
      obtenerHorarios();
    }, []);
  
    // Buscar datos del profesional si viene
    useEffect(() => {
      if (!idprofesional) {
        return;
      } else {
        SetIDProfesional(idprofesional);
  
        BuscarProfesionalyProfesion(idprofesional);
      }
    }, [idprofesional]);
  
    // Buscar datos del paciente si viene
    useEffect(() => {
      if (!idPaciente) {
        return;
      } else {
        SetIdPaciente(idpaciente);
        console.log(idPaciente);
        BuscarPaciente(idpaciente);
      }
    }, [idpaciente]);
  
    const toggleDia = (dia) => {
      setDiasSeleccionados((prev) =>
        prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
      );
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Mapeo de días a bits
      const diasBit = {
        Lunes: 0,
        Martes: 0,
        Miercoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sabado: 0,
        Domingo: 0,
      };
  
      diasSeleccionados.forEach((dia) => {
        diasBit[dia] = 1;
      });
  
      
      
   
      try {
       const data = await listadeesperaService.AltaTurnoListadeEspera( IDProfesional,
        idPaciente,
        idhoradesde,
        idhorahasta,
        fechadesde,
        fechahasta,
        diasBit.Lunes,
        diasBit.Martes,
        diasBit.Miercoles,
        diasBit.Jueves,
        diasBit.Viernes,
        diasBit.Sabado,
        diasBit.Domingo,
        observaciones,
        idusuario);
        console.log("por aca pasará: openaltaexitosa")
       openModalAltaExitosa();
       
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    };
  
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0277bd", color: "white" }}
        >
          <Modal.Title>REGISTRAR LISTA DE ESPERA</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", background: "white" }}>
          <div className="p-3 border rounded" style={{ width: "100%" }}>
            <div>
              <hr />
            </div>
            <Form onSubmit={handleSubmit}>
              <div
                className="acomodarencabezadopizaturnos"
                style={{ width: "100%", gap: "10px" }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Profesional
                  </InputGroup.Text>
                  <Form.Control
                    style={estiloFormControl}
                    placeholder="Buscar por apellido de profesional"
                    aria-label="Buscar profesional"
                    type="text"
                    value={apeyNomProfesional}
                    required
                  />
                  <Button
                    title="Buscar por profesional"
                    variant="outline-secondary"
                    style={{ height: "38px" }}
                    onClick={openMdlListarProfesionales}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Servicio que presta
                  </InputGroup.Text>
                  <Form.Control
                    style={estiloFormControl}
                    placeholder="Servicio que presta el profesional"
                    aria-label="Buscar profesional"
                    type="text"
                    value={profesion}
                  />
                </InputGroup>
              </div>

              <div
                className="acomodarencabezadopizaturnos"
                style={{ width: "100%", gap: "10px" }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Paciente
                  </InputGroup.Text>
                  <Form.Control
                    style={estiloFormControl}
                    placeholder="Buscar por apellido de paciente"
                    aria-label="Buscar paciente"
                    type="text"
                    onChange={(e) => SetApellido(e.target.value.toUpperCase())}
                    value={apeyNomPaciente}
                  />

                  <Button
                    title="Buscar por paciente"
                    variant="outline-secondary"
                    style={{ height: "38px" }}
                    onClick={openMdlListarPacientes}
                    /*  onClick={Buscar} */
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    DNI
                  </InputGroup.Text>

                  <Form.Control
                    style={estiloFormControl}
                    placeholder="DNI del paciente"
                    aria-label="DNI"
                    type="text"
                    value={VarDNIPaciente}
                  />
                </InputGroup>
              </div>
              <div>
                <hr />
              </div>
              <div
                className="acomodarencabezadopizaturnos"
                style={{ width: "100%", gap: "10px" }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Fecha desde
                  </InputGroup.Text>
                  <Form.Control
                    style={estiloFormControl}
                    type="date"
                    value={fechadesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Fecha hasta
                  </InputGroup.Text>
                  <Form.Control
                    style={estiloFormControl}
                    type="date"
                    value={fechahasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Hora desde
                  </InputGroup.Text>
                  <Form.Select
                    style={estiloFormControl}
                    value={idhoradesde}
                    onChange={(e) => setIDHoraDesde(e.target.value)}
                  >
                    <option value="">Desde</option>
                    {horarios.map((hora) => (
                      <option key={hora.idHorario} value={hora.idhorario}>
                        {hora.hora}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Hora hasta
                  </InputGroup.Text>
                  <Form.Select
                    style={estiloFormControl}
                    value={idhorahasta}
                    onChange={(e) => {
                      setIDHoraHasta(e.target.value); // guarda el id
                    }}
                  >
                    <option value="">Hasta</option>
                    {horarios.map((hora) => (
                      <option key={hora.idHorario} value={hora.idhorario}>
                        {hora.hora}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div
                className="acomodarencabezadopizaturnos"
                style={{ width: "100%" }}
              >
                <InputGroup
                  className="mb-3"
                  style={{
                    width: "30%",
                  }}
                >
                  <InputGroup.Text style={estiloInputGroupText}>
                    Elegir los días posibles para el turno:
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <div
                    className="acomodarencabezadopizaturnos"
                    style={{
                      backgroundColor: "#679bb9",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      height: "40px",
                    }}
                  >
                    {diasSemana.map((dia) => (
                      <Form.Check
                        key={dia}
                        type="checkbox"
                        label={dia}
                        checked={diasSeleccionados.includes(dia)}
                        onChange={() => toggleDia(dia)}
                      />
                    ))}
                  </div>
                </InputGroup>
              </div>

              <div>
                <hr />
              </div>
              <div
                className="acomodarencabezadopizaturnos"
                style={{
                  width: "100%",
                }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text style={estiloInputGroupText}>
                    Observaciones
                  </InputGroup.Text>
                  <Form.Control
                    as={"textarea"}
                    rows={2}
                    placeholder="Registrar observaciones"
                    aria-label="Registrar Observaciones"
                    type="text-area"
                    style={{ backgroundColor: "#eeeeee" }}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div>
                <hr />
              </div>
              <div
                className="acomodarencabezadopizaturnos"
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "flex-end", // alineación a la derecha
                  alignItems: "center", // centrado vertical si querés
                  gap: "10px", // espacio entre botones
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  style={{ height: "40px" }}
                >
                  Grabar
                </Button>
                <Button
                  variant="success"
                  onClick={Limpiar}
                  style={{ height: "40px" }}
                >
                  Limpiar
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {mdlAltaExitosa && (
        <MdlAltaExitosa
          show={openModalAltaExitosa}
          handleClose={handleClose}
          varMensaje={modalMessage}
          varMensajeTitulo={modalMessageTitulo}
        />
      )}

      {mdlListaProfesionales && (
        <MdlListarProfesionales
          show={openMdlListarProfesionales}
          handleClose={closeMdlListarProfesionales}
          enviarAlPadre={recibirDatoDelHijo}
        />
      )}

      {mdlListaPacientes && (
        <MdlListarPacientes
          show={openMdlListarPacientes}
          handleClose={closeMdlListarPacientes}
          enviarAlPadre={recibirDatoDelHijoPaciente}
        />
      )}
    </>
  );
};

export default registrarlistadeespera;