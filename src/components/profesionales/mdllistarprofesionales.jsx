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
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);
  const [Paginas, setPaginas] = useState([]);

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

  async function Buscar(_pagina) {
     if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await profesionalesService.Buscar(
      Apellido,
      VarDNI,
      idTipoProfesionSelected,
      _pagina,
      CantidaddeRegistros
    );
    setItems(data.registros);
    
     setRegistrosTotal(data.total);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    
    for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl" style={{ width: "100%"}}>
      <Modal.Header
        closeButton
       style={{ backgroundColor: "#99a3a4", color: "black" }}
      >
        <Modal.Title>Buscar profesionales</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>
        <div className="acomodarencabezadopizaturnos">
          <InputGroup className="mb-3">
            <InputGroup.Text
              style={{
              backgroundColor: "#ccd1d1",
                color: "black",
                height: "28px",
                fontWeight: "bold",
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
               backgroundColor: "#ccd1d1",
                color: "black",
                height: "28px",
                fontWeight: "bold",
              }}
            >
              DNI
            </InputGroup.Text>

            <Form.Control
              placeholder="Buscar por DNI"
              aria-label="Profesión"
              aria-describedby="basic-addon2"
              style={{ marginght: "20px", height: "28px" }}
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
              onClick={() => Buscar(1)}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
          <InputGroup.Text
            style={{
            backgroundColor: "#ccd1d1",
              color: "black",
              height: "28px",
              fontWeight: "bold",
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
                 backgroundColor: "#ccd1d1",
                  height: "28px",
                }}
              >
                Apellido
              </th>

              <th
                style={{
                  textAlign: "left",
                 backgroundColor: "#ccd1d1",
                  height: "28px",
                }}
                key="1"
              >
                Nombres
              </th>

              <th
                style={{
                  textAlign: "center",
                 backgroundColor: "#ccd1d1",
                  height: "28px",
                }}
                key="2"
              >
                Profesión
              </th>

              <th
                style={{
                  textAlign: "center",
                backgroundColor: "#ccd1d1",
                  height: "28px",
                }}
                key="3"
              >
                DNI
              </th>

              <th
                style={{
                  textAlign: "center",
                 backgroundColor: "#ccd1d1",
                  height: "28px",
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
        {/* Paginación */}
        <div><hr /></div>
        <div className="paginador">
          <div className="row">
            <div className="col">
              <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
              Pagina: &nbsp;
              <select
                value={Pagina}
                onChange={(e) => {
                  Buscar(e.target.value);
                }}
              >
                {Paginas?.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; de {Paginas?.length}
            </div>

            <div className="col">
              Mostrar de a: &nbsp;
              <select
                value={CantidaddeRegistros}
                onChange={(e) => {
                  setCantidaddeRegistros(e.target.value);
                }}
              >
                {[10, 15, 20, 25].map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; registros.
            </div>
          </div>
        </div>
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
