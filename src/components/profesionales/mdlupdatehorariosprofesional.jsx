import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import "/src/css/pizarradeturnos.css";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { diasSemana } from "../../components/utils/fecha";

import { profesionalesService } from "/src/services/profesional.service";

import { horasService } from "/src/services/horas.service";
import { intervalosService } from "/src/services/intervalos.service";
import { diassemanaService } from "/src/services/diassemana.service";

const mdlupdatehorariosprofesional = ({
  show,
  handleClose,
  idprofesional,
  fecha,
  profesional,
}) => {
  const [horas, setHoras] = useState({ noche: [], manana: [], tarde: [] });
  const [intervalos, setIntervalos] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);

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
  const [horarios, setHorarios] = useState([]); // tabla secundaria

  /* 
  const handleChangeIntervalos = (index, campo, valor) => {
    const nuevoValor = parseInt(valor, 10); // 👈 lo convertís a número
    // tu lógica para actualizar estado
  }; */

  // Estado con lo que se va seleccionando
  const [seleccion, setSeleccion] = useState({
    iddia: "",
    dia: "",
    mananaDesde: "",
    mananaHasta: "",
    intervaloManana: "",
    tardeDesde: "",
    tardeHasta: "",
    intervaloTarde: "",
    nocheDesde: "",
    nocheHasta: "",
    intervaloNoche: "",
  });

  const handleChange = (campo, valor) => {
    setSeleccion({
      ...seleccion,
      [campo]: valor,
    });
    console.log(seleccion);
  };

  // Función para agregar un horario

  // Función para agregar un horario
  const agregarHorario = () => {
    // 1) Validar que haya un día seleccionado
    if (!seleccion.dia) {
      alert("Debe seleccionar un día antes de agregar.");
      return;
    }

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
      mananaDesde: "",
      mananaHasta: "",
      intervaloManana: "",
      tardeDesde: "",
      tardeHasta: "",
      intervaloTarde: "",
      nocheDesde: "",
      nocheHasta: "",
      intervaloNoche: "",
    });
    console.log(horarios);
  };

  const getCellStyle = (valor) => ({
  backgroundColor: valor ? "#d4edda" : "#f8d7da", // verde si tiene valor, rojo si está vacío
});

  /* 
  // agregar fila a la tabla secundaria
  const agregarHorario = () => {
    console.log("pasa por aca?");
    setHorarios((prev) => [...prev, seleccion]);
    setSeleccion({
      dia: "",
      mananaDesde: "",
      mananaHasta: "",
      intervaloManana: "",
      tardeDesde: "",
      tardeHasta: "",
      intervaloTarde: "",
      nocheDesde: "",
      nocheHasta: "",
      intervaloNoche: "",
    });
    console.log(horarios);
  };
 */
  useEffect(() => {
    Buscar();
    BuscarIntervalos();
    BuscarDiasSemana();
  }, []);

  useEffect(() => {
    console.log("Horarios actualizados:", horarios);
  }, [horarios]);

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#198754", color: "black" }}
      >
        <Modal.Title>PROFESIONAL - NUEVOS HORARIOS</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%", fontSize: "15px" }}>
        <div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#a3cfbb", color: "black" }}
              >
                PROFESIONAL
              </InputGroup.Text>
              <Form.Control
                value={profesional}
                aria-label="First name"
                style={{ backgroundColor: "#d5dbdb", color: "black" }}
              />

              <InputGroup.Text
                style={{ backgroundColor: "#a3cfbb", color: "black" }}
              >
                PROFESION:
              </InputGroup.Text>
              <Form.Control
                //value={profesion}
                aria-label="First name"
                style={{ backgroundColor: "#d5dbdb", color: "black" }}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#a3cfbb",
                  color: "black",
                  height: "38px",
                  width: "20%",
                }}
              >
                NUEVO HORARIO DESDE:
              </InputGroup.Text>
              <Form.Control
                placeholder="Fecha de comienzo de cambio de horarios del profesional"
                aria-label="Fecha de cambios de horario del profesional"
                aria-describedby="basic-addon2"
                type="date"
                style={{ width: "20%" }}
                // onChange={handleFechaChange}
                // value={formatearFechaLargaConelAnio(fecha)}
              />

              <Form.Control
                //value={profesion}
                aria-label="First name"
                style={{
                  backgroundColor: "#d5dbdb",
                  color: "black",
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
                }}
              >
                <tr>
                  <th rowSpan="1" style={{ backgroundColor: "white" }}></th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#198754", textAlign: "center" }}
                  >
                    Mañana
                  </th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#198754", textAlign: "center" }}
                  >
                    Tarde
                  </th>
                  <th
                    colSpan="3"
                    style={{ backgroundColor: "#198754", textAlign: "center" }}
                  >
                    Noche
                  </th>
                  <th rowSpan="1" style={{ backgroundColor: "white" }}></th>
                </tr>

                <tr>
                  <th
                    style={{
                      backgroundColor: "#a3cfbb",
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
                      backgroundColor: "#a3cfbb",
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
                      value={seleccion.mananaDesde}
                      onChange={(e) =>
                        handleChange("mananaDesde", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.manana.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Mañana Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.mananaHasta}
                      onChange={(e) =>
                        handleChange("mananaHasta", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.manana.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Intervalo Mañana */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.intervaloManana}
                      onChange={(e) =>
                        handleChange("intervaloManana", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.descripcion}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Tarde Desde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.tardeDesde}
                      onChange={(e) =>
                        handleChange("tardeDesde", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.tarde.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Tarde Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.tardeHasta}
                      onChange={(e) =>
                        handleChange("tardeHasta", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.tarde.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Intervalo Tarde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.intervaloTarde}
                      onChange={(e) =>
                        handleChange("intervaloTarde", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.descripcion}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Noche Desde */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.nocheDesde}
                      onChange={(e) =>
                        handleChange("nocheDesde", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.noche.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Noche Hasta */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.nocheHasta}
                      onChange={(e) =>
                        handleChange("nocheHasta", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {horas.noche.map((h) => (
                        <option key={h.ID} value={h.Descripcion}>
                          {h.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Intervalo Noche */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={seleccion.intervaloNoche}
                      onChange={(e) =>
                        handleChange("intervaloNoche", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      {intervalos.map((int) => (
                        <option key={int.id} value={int.descripcion}>
                          {int.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Botón */}
                  <td>
                    <button
                      title="Agregar horarios a la tabla"
                      className="btn btn-sm btn-light "
                      onClick={() => agregarHorario()}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>

            <h5>Horarios nuevos</h5>
            {/* TABLA FINAL */}
           <Table bordered striped hover responsive size="sm" responsive>
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
                        <td style={getCellStyle(h.mananaDesde)}>
                          {h.mananaDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.mananaHasta)}>
                          {h.mananaHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.intervaloManana)}>
                          {h.intervaloManana || "-"}
                        </td>

                        {/* Tarde */}
                        <td style={getCellStyle(h.tardeDesde)}>
                          {h.tardeDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.tardeHasta)}>
                          {h.tardeHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.intervaloTarde)}>
                          {h.intervaloTarde || "-"}
                        </td>

                        {/* Noche */}
                        <td style={getCellStyle(h.nocheDesde)}>
                          {h.nocheDesde || "-"}
                        </td>
                        <td style={getCellStyle(h.nocheHasta)}>
                          {h.nocheHasta || "-"}
                        </td>
                        <td style={getCellStyle(h.intervaloNoche)}>
                          {h.intervaloNoche || "-"}
                        </td>

                        {/* Acciones */}
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              setHorarios((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            Eliminar
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
                <Button variant="success">Grabar nuevos horarios</Button>
                <Button variant="warning">Limpiar</Button>
                <Button variant="primary">Cerrar</Button>
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
