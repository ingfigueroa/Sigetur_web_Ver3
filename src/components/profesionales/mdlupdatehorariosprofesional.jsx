import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import "/src/css/pizarradeturnos.css";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import {
  getFechaActualISO,
  formatearFechaLarga,
  validarHorasDesdeHastaIntervalo,
  getFechaISO,
  formatearFechaLargaConelAnio
} from "../../components/utils/fecha";

import { profesionalesService } from "/src/services/profesional.service";

import { horasService } from "/src/services/horas.service";
import { intervalosService } from "/src/services/intervalos.service";
import { diassemanaService } from "/src/services/diassemana.service";

const mdlupdatehorariosprofesional = ({
  show,
  handleClose,
  idprofesional,
  profesion,
  profesional,
  idcliente,
  idusuario
}) => {

 
  const [horas, setHoras] = useState({ noche: [], manana: [], tarde: [] });
  const [intervalos, setIntervalos] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [fechaCambioHorario, setFechaCambioHorario] = useState(
    getFechaActualISO(new Date())
  );
  const [itemsFechaCambioHorario, setItemsFechaCambioHorario] = useState([]);
  const [fechaLargarMostrar, setFechaLargaMostrar] = useState("");

  const [errorFecha, setErrorFecha] = useState(true);
  const [validarBotonAgregarHorario, setValidarBotonAgregarHorario] = useState(false);

  const [fechaDesdeCambioHorario, setFechaDesdeCambioHorario] = useState("");

  
  const [horarios, setHorarios] = useState([]); // tabla secundaria

  const [mensaje, setMensaje] = useState("");

  async function Buscar() {
    /*  const fechaActual = formatearFecha(fechaActualSinParsear); */

    const data = await horasService.getHorasMananaTardeNoche();
    setHoras(data);
  }

  async function BuscarIntervalos() {
    /*  const fechaActual = formatearFecha(fechaActualSinParsear); */

    const data = await intervalosService.getBuscar();
    setIntervalos(data);
  }

  async function BuscarDiasSemana() {
    /*  const fechaActual = formatearFecha(fechaActualSinParsear); */

    const data = await diassemanaService.getBuscar();
    setDiasSemana(data);
  }

  async function validarFechaCambioHorario(fechaSeleccionada) {
    // Llamás al servicio con el idprofesional (que deberías tenerlo en un estado o prop)
   
    const data = await profesionalesService.getBuscarFechaCambioHorario(
      idcliente,
      idprofesional
    );

    const fechaultimoTurno_1 = getFechaISO(data[0].fechaultimoturno);

    setFechaDesdeCambioHorario(fechaultimoTurno_1);

    if (new Date(fechaultimoTurno_1) >= new Date(fechaSeleccionada)) {
      const mensaje = `Hay turnos definidos después de la fecha elegida: ${fechaSeleccionada}. No se puede elegir esta fecha.`;
      setFechaLargaMostrar(
        "NO SE PUEDE EN ESTA FECHA CREAR UN CAMBIO DE HORARIOS."
      );
      setFechaCambioHorario(fechaSeleccionada);
      setErrorFecha(true); // 👈 marcamos error
      setValidarBotonAgregarHorario(false);
    
      return;
    }

    // Actualizar el estado si la fecha es válida
    setFechaCambioHorario(fechaSeleccionada);
    setFechaLargaMostrar(formatearFechaLargaConelAnio(fechaSeleccionada, true));
    setValidarBotonAgregarHorario(true);
    setErrorFecha(false); // 👈 quitamos error
  }
const updateHorarios = async (idcliente,idprofesional, fechadesde) => {
  try {
    console.log(horarios)
    const payload = horarios.map(item => ({
      idusuario,
      idcliente,
      idprofesional,
      iddia: item.iddia,
      mananatrabaja: item.trabajaManana,
      idmananadesde: item.idMananaDesde || null,
      idmananahasta: item.idMananaHasta || null,
      idmananaintervalo: item.idIntervaloManana || null,
      tardetrabaja: item.trabajaTarde,
      idtardedesde: item.idTardeDesde || null,
      idtardehasta: item.idTardeHasta || null,
      idtardeintervalo: item.idIntervaloTarde || null,
      nochetrabaja: item.trabajaNoche,
      idnochedesde: item.idNocheDesde || null,
      idnochehasta: item.idNocheHasta || null,
      idnocheintervalo: item.idIntervaloNoche || null,
      fechadesde,
    }));
    console.log(payload)
    await profesionalesService.putCambioHorarioMultiple(payload);
    console.log("Horarios enviados correctamente");
  } catch (error) {
    console.error("Error al enviar horarios:", error);
  }
};


  const [seleccion, setSeleccion] = useState({
 
    iddia: "",
    dia: "",

    trabajaManana: parseInt("0"),
    idMananaDesde: "",
    descripcionMananaDesde: "",
    idMananaHasta: "",
    descripcionMananaHasta: "",
    idIntervaloManana: "",
    descripcionIntervaloManana: "",

    trabajaTarde: parseInt("0"),
    idTardeDesde: "",
    descripcionTardeDesde: "",
    idTardeHasta: "",
    descripcionTardeHasta: "",
    idIntervaloTarde: "",
    descripcionIntervaloTarde: "",

    trabajaNoche: parseInt("0"),
    idNocheDesde: "",
    descripcionNocheDesde: "",
    idNocheHasta: "",
    descripcionNocheHasta: "",
    idIntervaloNoche: "",
    descripcionIntervaloNoche: "",
  });

  function limpiar() {
    setHorarios([]);
    const hoyISO = getFechaActualISO(); // YYYY-MM-DD
    setFechaCambioHorario(hoyISO);
    setFechaLargaMostrar(formatearFechaLargaConelAnio(hoyISO, true));
  }

  // Función para agregar un horario
  const agregarHorario = () => {
    let resultadoManana = false;
    let resultadoTarde = false;
    let resultadoNoche = false;
    let mensaje = "No se ha seleccionado ningún horario.";

    // 1) Validar que haya un día seleccionado
    if (!seleccion.dia) {
      mensaje = "Debe seleccionar un día antes de agregar.";
      alert(mensaje);
      return;
    }

    if (
      seleccion.trabajaManana === 0 &&
      seleccion.trabajaTarde === 0 &&
      seleccion.trabajaNoche === 0
    ) {
      mensaje = "Debe seleccionar algún horario.";
      alert(mensaje);

      return;
    }

    if (seleccion.trabajaManana === 1) {
      resultadoManana = validarHorasDesdeHastaIntervalo(
        seleccion.ordenarPorMananaDesde,
        seleccion.ordenarPorMananaHasta,
        seleccion.idIntervaloManana,
        "TURNO MAÑANA: "
      );
      mensaje = resultadoManana.mensaje;
      if (!resultadoManana.valido) {
        alert(mensaje); // o mostrarlo en un modal/mensaje de error
        return;
      }
    }

    if (seleccion.trabajaTarde === 1) {
      resultadoTarde = validarHorasDesdeHastaIntervalo(
        seleccion.ordenarPorTardeDesde,
        seleccion.ordenarPorTardeHasta,
        seleccion.idIntervaloTarde,
        "TURNO TARDE: "
      );
      mensaje = resultadoTarde.mensaje;
      if (!resultadoTarde.valido) {
        alert(mensaje); // o mostrarlo en un modal/mensaje de error
        return;
      }
    }

    if (seleccion.trabajaNoche === 1) {
      resultadoNoche = validarHorasDesdeHastaIntervalo(
        seleccion.ordenarPorNocheDesde,
        seleccion.ordenarPorNocheHasta,
        seleccion.idIntervaloNoche,
        "TURNO NOCHE: "
      );
      mensaje = resultadoNoche.mensaje;
      if (!resultadoNoche.valido) {
        alert(mensaje); // o mostrarlo en un modal/mensaje de error
        return;
      }
    }

    //validar horario mañana

    // 2) Validar que el día no esté repetido
    const yaExiste = horarios.some((h) => h.iddia === seleccion.iddia);
    if (yaExiste) {
      alert(`El día ${seleccion.dia} ya fue cargado.`);
      return;
    }
    // 3) Agregar fila
    setHorarios((prev) => [...prev, seleccion]);

    // 4) Reset selección
    setSeleccion({
      iddia: "",
      dia: "",

      trabajaManana: parseInt("0"),
      idMananaDesde: "",
      descripcionMananaDesde: "",
      ordenarPorMananaDesde: "",
      idMananaHasta: "",
      descripcionMananaHasta: "",
      ordenarPorMananaHasta: "",
      idIntervaloManana: "",
      descripcionIntervaloManana: "",

      trabajaTarde: parseInt("0"),
      idTardeDesde: "",
      descripcionTardeDesde: "",
      ordenarPorTardeDesde: "",
      idTardeHasta: "",
      descripcionTardeHasta: "",
      ordenarPorTardeHasta: "",
      idIntervaloTarde: "",
      descripcionIntervaloTarde: "",

      trabajaNoche: parseInt("0"),
      idNocheDesde: "",
      descripcionNocheDesde: "",
      ordenarPorNocheDesde: "",
      idNocheHasta: "",
      descripcionNocheHasta: "",
      ordenarPorNocheHasta: "",
      idIntervaloNoche: "",
      descripcionIntervaloNoche: "",
    });
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    //VALIDAR Q UE NO HAYA TURNOS
    setFechaCambioHorario(nuevaFecha);
    setFechaLargaMostrar(formatearFechaLargaConelAnio(nuevaFecha, true));
  };

  const getCellStyle = (valor) => ({
    backgroundColor: valor ? "#05df72" : "#fb2c36", // verde si tiene valor, rojo si está vacío
    textAlign: "center",
  });

  useEffect(() => {
    Buscar();
    BuscarIntervalos();
    BuscarDiasSemana();

    const hoyISO = getFechaActualISO(); // YYYY-MM-DD
    setFechaCambioHorario(hoyISO);
    setFechaLargaMostrar(formatearFechaLargaConelAnio(hoyISO, true));
  
    validarFechaCambioHorario(fechaCambioHorario)

    // BuscarFechaCambioHorario();
    // setFechaCambioHorario(getFechaISO(itemsFechaCambioHorario.proximolunes))
  }, []);
  
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static" // evita que se cierre al hacer clic fuera
      keyboard={false} // evita que se cierre con la tecla ESC
    >
      <Modal.Header  style={{  color:"white",
            backgroundColor: "#198754", }}>
        <Modal.Title>
          PROFESIONAL - PLANIFICACIÓN DE NUEVOS HORARIOS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
        <div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#E2E8F0", color: "black" }}
              >
                PROFESIONAL
              </InputGroup.Text>
              <Form.Control
                value={profesional}
                aria-label="First name"
                style={{ backgroundColor: "white", color: "black" }}
              />

              <InputGroup.Text
                style={{ backgroundColor: "#E2E8F0", color: "black" }}
              >
                PROFESION:
              </InputGroup.Text>
              <Form.Control
                value={profesion}
                aria-label="First name"
                style={{ backgroundColor: "white", color: "black" }}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#E2E8F0",
                  color: "black",
                  height: "38px",
                  width: "20%",
                }}
              >
                NUEVOS HORARIOS DESDE:
              </InputGroup.Text>
              <Form.Control
                placeholder="Fecha de comienzo de cambio de horarios del profesional"
                type="date"
                style={{ width: "20%" }}
                onChange={(e) => validarFechaCambioHorario(e.target.value)}
                value={fechaCambioHorario}
              />

              <Form.Control
                value={fechaLargarMostrar}
                aria-label="First name"
                style={{
                  backgroundColor: errorFecha ? "red" : "#157347", // 👈 rojo si error
                  color: "white", // 👈 texto visible en rojo
                  width: "60%",
                }}
              />
            </InputGroup>
          </div>

          <div>
            <h5>Definir los horarios de un día. Luego agregarlos. </h5>
            <Table bordered size="xl" responsive>
              <thead
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                <tr>
                  <th rowSpan="1" style={{ backgroundColor: "white" }}></th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#CAD5E2", textAlign: "center" }}
                  >
                    Mañana
                  </th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#90A1B9", textAlign: "center" }}
                  >
                    Tarde
                  </th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#62748E", textAlign: "center" }}
                  >
                    Noche
                  </th>
                  <th rowSpan="1" style={{ backgroundColor: "white" }}></th>
                </tr>

                <tr
                  style={{
                    textAlign: "center",
                  }}
                >
                  <th
                    style={{
                      backgroundColor: "#E2E8F0",
                    }}
                  >
                    Día
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Primer turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Último turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Intervalo
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Primer turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Último turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Intervalo
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Primer turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Último turno
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    Intervalo
                  </th>
                  <th
                    style={{
                      backgroundColor: "#E2E8F0",
                    }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Día */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.dia}
                      onChange={(e) => {
                        const selectedOption = diasSemana.find(
                          (d) => d.descripcion === e.target.value
                        );
                        setSeleccion((prev) => ({
                          ...prev,
                          dia: selectedOption.descripcion,
                          iddia: selectedOption.ID,
                          
                        }));
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {diasSemana.map((d) => (
                        <option key={d.ID} value={d.descripcion}>
                          {d.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Mañana Desde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idMananaDesde || ""} // el value debe ser el ID
                      onChange={(e) => {
                        const selectedOption = horas.manana.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idMananaDesde: selectedOption.ID, // guardás el ID
                            descripcionMananaDesde: selectedOption.Descripcion, // guardás la descripción
                            trabajaManana: parseInt("1"),
                            ordenarPorMananaDesde:
                              selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idMananaDesde: "",
                            descripcionMananaDesde: "",
                            trabajaManana: parseInt("0"),
                            ordenarPorMananaDesde: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.manana.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Mañana Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idMananaHasta || ""} // el value debe ser el ID
                      onChange={(e) => {
                        // Ejemplo dentro del onChange de alguno de los selects:

                        const selectedOption = horas.manana.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idMananaHasta: selectedOption.ID, // guardás el ID
                            descripcionMananaHasta: selectedOption.Descripcion, // guardás la descripción
                            trabajaManana: parseInt("1"),
                            ordenarPorMananaHasta:
                              selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idMananaHasta: "",
                            descripcionMananaHasta: "",
                            trabajaManana: parseInt("0"),
                            ordenarPorMananaHasta: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.manana.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Intervalo Mañana */} {/* Intervalo Mañana*/}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idIntervaloManana || ""} // el value tiene que ser el ID
                      onChange={(e) => {
                        const selectedOption = intervalos.find(
                          (h) => h.id === parseInt(e.target.value) // aseguramos comparar números
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloManana: selectedOption.id, // guardás el ID
                            descripcionIntervaloManana:
                              selectedOption.descripcion, // guardás la descripción
                          }));
                        } else {
                          // si elige "Seleccionar", reseteamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloManana: "",
                            descripcionIntervaloManana: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.id}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Tarde Desde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idTardeDesde || ""} // el value debe ser el ID
                      onChange={(e) => {
                        const selectedOption = horas.tarde.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idTardeDesde: selectedOption.ID, // guardás el ID
                            descripcionTardeDesde: selectedOption.Descripcion, // guardás la descripción
                            trabajaTarde: parseInt("1"),
                            ordenarPorTardeDesde: selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idTardeDesde: "",
                            descripcionTardeDesde: "",
                            trabajaTarde: parseInt("0"),
                            ordenarPorTardeDesde: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.tarde.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* tarde Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idTardeHasta || ""} // el value debe ser el ID
                      onChange={(e) => {
                        const selectedOption = horas.tarde.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idTardeHasta: selectedOption.ID, // guardás el ID
                            descripcionTardeHasta: selectedOption.Descripcion, // guardás la descripción
                            trabajaTarde: parseInt("1"),
                            ordenarPorTardeHasta: selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idTardeHasta: "",
                            descripcionTardeHasta: "",
                            trabajaTarde: parseInt("0"),
                            ordenarPorTardeHasta: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.tarde.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Intervalo Tarde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idIntervaloTarde || ""} // el value tiene que ser el ID
                      onChange={(e) => {
                        const selectedOption = intervalos.find(
                          (h) => h.id === parseInt(e.target.value) // aseguramos comparar números
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloTarde: selectedOption.id, // guardás el ID
                            descripcionIntervaloTarde:
                              selectedOption.descripcion, // guardás la descripción
                          }));
                        } else {
                          // si elige "Seleccionar", reseteamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloTarde: "",
                            descripcionIntervaloTarde: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.id}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Noche Desde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idNocheDesde}
                      onChange={(e) => {
                        const selectedOption = horas.noche.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idNocheDesde: selectedOption.ID, // guardás el ID
                            descripcionNocheDesde: selectedOption.Descripcion, // guardás la descripción
                            trabajaNoche: parseInt("1"),
                            ordenarPorNocheDesde: selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idNocheDesde: "",
                            descripcionNocheDesde: "",
                            trabajaNoche: parseInt("0"),
                            ordenarPorNocheDesde: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.noche.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Noche Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idNocheHasta}
                      onChange={(e) => {
                        const selectedOption = horas.noche.find(
                          (h) => h.ID === parseInt(e.target.value)
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idNocheHasta: selectedOption.ID, // guardás el ID
                            descripcionNocheHasta: selectedOption.Descripcion, // guardás la descripción
                            trabajaNoche: parseInt("1"),
                            ordenarPorNocheHasta: selectedOption.ordenarporesto,
                          }));
                        } else {
                          // Si se elige "Seleccionar" (value=""), limpiamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idNocheHasta: "",
                            descripcionNocheHasta: "",
                            trabajaNoche: parseInt("0"),
                            ordenarPorNocheHasta: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {horas.noche.map((h) => (
                        <option key={h.ID} value={h.ID}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Intervalo Noche */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.idIntervaloNoche}
                      onChange={(e) => {
                        const selectedOption = intervalos.find(
                          (h) => h.id === parseInt(e.target.value) // aseguramos comparar números
                        );

                        if (selectedOption) {
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloNoche: selectedOption.id, // guardás el ID
                            descripcionIntervaloNoche:
                              selectedOption.descripcion, // guardás la descripción
                          }));
                        } else {
                          // si elige "Seleccionar", reseteamos
                          setSeleccion((prev) => ({
                            ...prev,
                            idIntervaloNoche: "",
                            descripcionIntervaloNoche: "",
                          }));
                        }
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.id}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* Botón */}
                  <td className="text-center">
                    <button
                      title="Agregar horarios a la tabla"
                      //className="btn btn-sm btn-light "
                      className={`btn btn-sm ${validarBotonAgregarHorario ? "btn-success" : "btn-danger"}`}
                      onClick={() => agregarHorario()}
                      disabled={!validarBotonAgregarHorario}
                      
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>

            <h5>Horarios nuevos</h5>
            {/* TABLA FINAL */}
            <Table bordered striped hover responsive size="sm">
              <thead
                style={{
                  backgroundColor: "#083149ff",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                <tr>
                  <th>Día</th>
                  <th>Mañana desde</th>
                  <th>Mañana hasta</th>
                  <th>Intervalo</th>
                  <th>Tarde desde</th>
                  <th>Tarde hasta</th>
                  <th>Intervalo</th>
                  <th>Noche desde</th>
                  <th>Noche hasta</th>
                  <th>Intervalo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {horarios.length > 0 ? (
                  [...horarios]
                    .sort((a, b) => a.iddia - b.iddia)
                    .map((h, index) => (
                      <tr key={index}>
                        <td>{h.dia}</td>

                        {/* Mañana */}
                        <td style={getCellStyle(h.idMananaDesde)}>
                          {h.descripcionMananaDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.idMananaHasta)}>
                          {h.descripcionMananaHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.idIntervaloManana)}>
                          {h.descripcionIntervaloManana || "-"}
                        </td>

                        {/* Tarde */}
                        <td style={getCellStyle(h.idTardeDesde)}>
                          {h.descripcionTardeDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.idTardeHasta)}>
                          {h.descripcionTardeHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.idIntervaloTarde)}>
                          {h.descripcionIntervaloTarde || "-"}
                        </td>

                        {/* Noche */}
                        <td style={getCellStyle(h.idNocheDesde)}>
                          {h.descripcionNocheDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.idNocheHasta)}>
                          {h.descripcionNocheHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.idIntervaloNoche)}>
                          {h.descripcionIntervaloNoche || "-"}
                        </td>

                        {/* Acciones */}
                        <td>
                          <Button
                            title="Eliminar la fila de la tabla"
                            variant="danger"
                            textAlign="center"
                            size="sm"
                            onClick={() =>
                              setHorarios((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <i class="fa-solid fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      No hay horarios cargados
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "white",
                textAlign: "right",
              }}
            >
              <ButtonGroup className="mb-2">
              <Button
                variant="success"
                onClick={() => updateHorarios(idcliente, idprofesional, fechaCambioHorario)}
                disabled={horarios.length === 0}
              >
                Grabar nuevos horarios
              </Button>
                <Button variant="warning" onClick={limpiar}>
                  Limpiar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Cerrar
                </Button>
              </ButtonGroup>
            </div>

            {/*  //<pre>{JSON.stringify(horarios, null, 2)}</pre> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default mdlupdatehorariosprofesional;
