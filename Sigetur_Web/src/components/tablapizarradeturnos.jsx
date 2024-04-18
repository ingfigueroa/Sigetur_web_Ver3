import React, { useState } from "react";

import Table from "react-bootstrap/Table";

import "../css/tablapizaturnos.css";
import MdlAltaTurno from "./mdlaltaturno";
import MdlTurnoDetalle from "./mdlturnodetalle";
import Mdlanularturno from "./mdlanularturno";
import Mdlturnoregistrarcobro from "./mdlturnoregistrarcobro";

function tablapizarradeturnos() {


  const data = [
    { Estado: 'LIB', Hora: "08:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: 'LIB', Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: 'LIB', Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    {
      Estado: "PRE-COB",
      Hora: "10:00",
      Paciente: "FIGUEROA, FLORENCIA PAULA",
      DNI: 40662065,
      Obra_social: "PARTICULAR",
    },
    { Estado:'LIB', Hora: "10:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: 'LIB', Hora: "11:00", Paciente: "", DNI: "", Obra_social: "" },
    {
      Estado: "PEN-COB",
      Hora: "10:00",
      Paciente: "FIGUEROA, FLORENCIA PAULA",
      DNI: 40662065,
      Obra_social: "PARTICULAR",
    },
    { Estado: 'LIB', Hora: "09:00", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: 'LIB', Hora: "09:30", Paciente: "", DNI: "", Obra_social: "" },
    {
      Estado: "PRE-COB",
      Hora: "10:00",
      Paciente: "FIGUEROA, CAROLINA",
      DNI: 40662065,
      Obra_social: "DASPU",
    },
    { Estado: 'LIB', Hora: "10:30", Paciente: "", DNI: "", Obra_social: "" },
    { Estado: 'LIB', Hora: "11:00", Paciente: "", DNI: "", Obra_social: "" },
  ];



  function TableRow({ item }) {
    
    let filaColor;

  // Establecer el color de fondo basado en el estado
  switch (item.Estado) {
    case "LIB":
      filaColor = "blue"; // Cambiar a azul para LIB
      break;
    case "PRE-COB":
      filaColor = "green"; // Cambiar a verde para PRE-COB
      break;
    case "PEN-COB":
      filaColor = "red"; // Cambiar a rojo para PEN-COB
      break;
    default:
      filaColor = "transparent"; // Color transparente por defecto
  }

    return (
      <tr style={{ backgroundColor: filaColor }}>
        <td style={{ textAlign: "center"}}>{item.Estado}</td>
        <td style={{ textAlign: "center" }}>{item.Hora}</td>
        <td style={{ textAlign: "center"}}>{item.Paciente}</td>
        <td style={{ textAlign: "center"}}>{item.DNI}</td>
        <td style={{ textAlign: "center" }}>{item.Obra_social}</td>
        <td style={{ textAlign: "center" }}>
          <button className="btn btn-sm btn-light btn-danger">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button className="btn btn-sm btn-light btn-info">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            title="Registrar Turno"
            className="btn btn-sm btn-light btn-primary"
            onClick={openMdlAltaTurno}
          >
            <i class="fa-solid fa-up-right-from-square"></i>
          </button>
          <button
            title="Anular turno"
            className="btn btn-sm btn-light btn-danger"
            onClick={openMdlAnularTurno}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <button
            title="Detalle del turno"
            className="btn btn-sm btn-light btn-success"
            onClick={openMdlTurnoDetalle}
          >
            <i class="fa-solid fa-file-invoice-dollar"></i>
          </button>
          <button
            title="Registrar cobro"
            className="btn btn-sm btn-light btn-success"
            variant="outline-secondary"
            onClick={openMdlurnoRegistrarCobro}
          >
            <i class="fa-solid fa-dollar-sign"></i>
          </button>
        </td>
      </tr>
    );
  }

  const [mdlAltaTurno, setModalAltaTurno] = useState(false);

  const openMdlAltaTurno = () => {
    setModalAltaTurno(true);
  };

  const closeMdlAltaTurno = () => {
    setModalAltaTurno(false);
  };

  const [mdlTurnoDetalle, setModalTurnoDetalle] = useState(false);

  const openMdlTurnoDetalle = () => {
    setModalTurnoDetalle(true);
  };

  const CloseMdlTurnoDetalle = () => {
    setModalTurnoDetalle(false);
  };

  const [mdlAnularTurno, setModalAnularTurno] = useState(false);

  const openMdlAnularTurno = () => {
    setModalAnularTurno(true);
  };

  const closeMdlAnularTurno = () => {
    setModalAnularTurno(false);
  };

  const [mdlturnoregistrarcobro, setmModalTurnoRegistrarCobro] =
    useState(false);

  const openMdlurnoRegistrarCobro = () => {
    setmModalTurnoRegistrarCobro(true);
  };

  const closeMdlurnoRegistrarCobro = () => {
    setmModalTurnoRegistrarCobro(false);
  };

  const valorLimite = "LIB";

  return (
    <div>
      <div className="acomodartabla">
        <Table bordered hover>
          <thead >
            <tr className="personalizarfila h-50">
              <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }} key="0">
                Estado
              </th>

              <th style={{backgroundColor: "rgb(136, 161, 184)"}} key="1">Hora</th>

              <th style={{backgroundColor: "rgb(136, 161, 184)"}} key="2">Paciente</th>
              <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }} key="3">
                DNI
              </th>

              <th style={{backgroundColor: "rgb(136, 161, 184)"}} key="4">Obra social</th>

              <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }} key="6">
                Cobrado
              </th>

              <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }} key="7">
                Sobreturno
              </th>

              <th style={{ textAlign: "center", backgroundColor: "rgb(136, 161, 184)" }} key="8">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableRow key={item.Estado} item={item} />
            ))}
          </tbody>
        </Table>
      </div>
      {mdlAltaTurno && (
        <MdlAltaTurno show={openMdlAltaTurno} handleClose={closeMdlAltaTurno} />
      )}

      {mdlTurnoDetalle && (
        <MdlTurnoDetalle
          show={openMdlTurnoDetalle}
          handleClose={CloseMdlTurnoDetalle}
        />
      )}

      {mdlAnularTurno && (
        <Mdlanularturno
          show={openMdlAnularTurno}
          handleClose={closeMdlAnularTurno}
        />
      )}
      {mdlturnoregistrarcobro && (
        <Mdlturnoregistrarcobro
          show={openMdlurnoRegistrarCobro}
          handleClose={closeMdlurnoRegistrarCobro}
        />
      )}
    </div>
  );
}

export default tablapizarradeturnos;
