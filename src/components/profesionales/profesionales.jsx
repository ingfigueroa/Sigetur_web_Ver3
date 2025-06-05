import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";

import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "/src/css/sigetur.css";
import "/src/css/pizarradeturnos.css";

import { profesionalesService } from "/src/services/profesional.service";
import MdlAltaProfesionales from "./registrarprofesional";
import Mdlhorarioprofesional from "../profesionales/mdlhorarioprofesional";
import Mdlanulartodoslosturnos from "../turnos/mdlanulartodoslosturnos";
import MdlEditarProfesionales from "./modificarprofesionales";

import modalDialogService from "/src/services/modalDialog.service";

function Profesionales() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Apellido, SetApellido] = useState("");

  const [VarDNI, SetDNI] = useState(null);

  const [apeyNom, setapeyNom] = useState(null);

  const [idusuario, setUsuario] = useState("2");

  const [idProfesional, setIDProfesional] = useState(0);

  const [mdlRegistrarProfesional, setModalRegistrarProfesional] = useState(false);

    const [mdlEditarProfesional, setMdlEditarProfesional] = useState(false);


  const [mdlHoraProfe, setModalHoraProfe] = useState(false);

  const [mdlAnularTodosLosTurnos, setModalAnularTodosLosTurnos] = useState(false);

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Fecha, SetFecha] = useState(new Date().toLocaleDateString());

  const [mdlListaEspera, setModalListaEspera] = useState(false);

  const closeMdlListaEspera = () => {
    setModalListaEspera(false);
  };

  const openMdlListaEspera = () => {
    setModalListaEspera(true);
  };

  const openMdlHoraProfe = (item) => {
    setIDProfesional(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); // Eliminar espacios en blanco innecesarios
    setModalHoraProfe(true);
  };

useEffect(() => {
  document.title = "Si.Ge.Tur. - Profesionales";
}, []);

  useEffect(() => {
    // Esto se ejecutará cuando idProfesional cambie
    
  }, [idProfesional]);

  const closeMdlHoraProfe = () => {
    setModalHoraProfe(false);
  };

  const openMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(true);
  };

  const closeMdlRegistrarProfe = () => {
    setModalRegistrarProfesional(false);
    Buscar(1)
  };

  const openMdlEditarProfesional = (item) => {
    setIDProfesional(item.ID)
    setMdlEditarProfesional(true);
  };

  const closeMdlEditarProfesional = () => {
    setMdlEditarProfesional(false);
    Buscar(1)
    
  };

  const openMdlAnularTodosLosTurnos = (item) => {
    // setModalSiNoMensaje("¿Está seguro de anular el turno?")
    setIDProfesional(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); // Eliminar espacios en blanco innecesarios
    SetFecha(formatearFecha(Fecha));

    setModalAnularTodosLosTurnos(true);
  };

  const closeMdlAnularTodosLosTurnos = () => {
    setModalAnularTodosLosTurnos(false);
  };

  const fechaActualSinParsear = new Date().toLocaleDateString();

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await profesionalesService.Buscar(Apellido, VarDNI);
    modalDialogService.BloquearPantalla(false);

    setItems(data);

    setRegistrosTotal(data.length);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await profesionalesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  async function Limpiar(params) {
      SetApellido("")
      SetDNI("")
      setItems([])
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  const formatearFecha = (fecha) => {
    let fechaActualParseada;

    // Caso 1: formato yyyy-MM-dd
    if (/\d{4}-\d{2}-\d{2}/.test(fecha)) {
      fechaActualParseada = parse(fecha, "yyyy-MM-dd", new Date());
    }
    // Caso 2: formato d/M/yyyy
    else if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(fecha)) {
      fechaActualParseada = parse(fecha, "d/M/yyyy", new Date());
    }

    // Formatear la fecha en dd/MM/yyyy
    return format(fechaActualParseada, "yyyy-MM-dd");
  };

  const fechaActual = formatearFecha(fechaActualSinParsear);

  return (
    <>
      <div
        style={{
          display: "grid",
          width: "100%",
          margin: "15px 15px",
          backgroundColor: "white",
        }}
      >
        <form>
          <div className="acomodarencabezadopizaturnos">
           

            <div style={{ width: "30%", textAlign: "left" }}>
              <button
                title="Registrar nuevo profesional"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={(event) => {
                  event.preventDefault();
                  openMdlRegistrarProfe();
                }}
              >
                <i class="fa-solid fa-plus"></i>
              </button>

              <button
                title="Imprimir"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={() => Imprimir()}
              >
                <i class="fa fa-print"></i>
              </button>
            </div>
          </div>
         

          <div className="acomodarencabezadopizaturnos">
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                Profesional
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por apellido de profesional"
                aria-label="Buscar profesional"
                aria-describedby="basic-addon2"
                type="text"
                onChange={(e) => SetApellido(e.target.value.toUpperCase())}
                value={Apellido}
                autoFocus
              />

              <Button
                title="Buscar por profesional"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => Buscar(1)}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "#679bb9",
                  color: "white",
                  height: "38px",
                }}
              >
                DNI
              </InputGroup.Text>
              <Form.Control
                placeholder="Buscar por DNI"
                aria-label="Profesión"
                aria-describedby="basic-addon2"
                style={{ marginght: "20px" }}
                onChange={(e) => SetDNI(e.target.value)}
                value={VarDNI}
              />
              <Button
                title="Buscar por DNI"
                variant="outline-secondary"
                id="button-addon1"
                style={{ height: "38px" }}
                color="white"
                onClick={() => Buscar(1)}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
              
                <Button variant="success" onClick={() => Limpiar()}>
                  Limpiar
                </Button>
                
             
            </InputGroup>
          </div>
          
        </form>

        <div className="">
          <Table bordered hover>
            <thead>
              <tr className="h-50">
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Apellido
                </th>

                <th
                  style={{
                    textAlign: "left",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                >
                  Nombres
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="2"
                >
                  Especialidad
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="3"
                >
                  DNI
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="4"
                >
                  EMail
                </th>
                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="5"
                >
                  Estado
                </th>

                <th
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                  }}
                  key="6"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.ID}>
                    <td style={{ textAlign: "center" }}>{Item.ID}</td>
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
                      {Item.EMail}
                    </td>
                    <td style={{ textAlign: "center", fontSize: "12px" }}>
                      {Item.IDEstado === 1 ? (
                        <Button
                          variant="success"
                          size="sm"
                          style={{ width: "70%" }}
                        >
                          activo
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ width: "70%" }}
                        >
                          pasivo
                        </Button>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        title="Editar profesional"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={() => openMdlEditarProfesional(Item)} 
                        //onClick={openMdlEditarProfesional(Item)}
                      >
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
                      <button
                        title="Horarios profesional"
                        className="btn btn-sm btn-light btn-primary"
                        onClick={() => openMdlHoraProfe(Item)}
                      >
                        <i class="fa-solid fa-clock"></i>
                      </button>
                      <button
                        title="Lista de espera"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={openMdlListaEspera}
                      >
                        <i class="fa-solid fa-book-open-reader"></i>
                      </button>
                      <button
                        title="Agenda Semanal"
                        className="btn btn-sm btn-light btn-danger"
                      >
                        <i class="fa-solid fa-calendar-days"></i>
                      </button>
                    {/*   <button
                        title="Cancelar turnos por fecha"
                        className="btn btn-sm btn-light btn-danger"
                        onClick={() => openMdlAnularTodosLosTurnos(Item)}
                        value={Fecha}
                      >
                        <i class="fa-solid fa-power-off"></i>
                      </button> */}
                    </td>
                  </tr>
                  //<TableRow item={item} />
                ))}
            </tbody>
          </Table>
        </div>
        {/* Paginación */}
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
          </div>
        </div>
      </div>

      {mdlRegistrarProfesional && (
        <MdlAltaProfesionales
          show={openMdlRegistrarProfe}
          handleClose={closeMdlRegistrarProfe}
        />
      )}

      {mdlEditarProfesional && (
        <MdlEditarProfesionales
          show={openMdlEditarProfesional}
          handleClose={closeMdlEditarProfesional}
          idprofesional={idProfesional}
        />
      )}

      {mdlHoraProfe && (
        <Mdlhorarioprofesional
          show={openMdlHoraProfe}
          handleClose={closeMdlHoraProfe}
          idprofesional={idProfesional}
          fecha={fechaActual}
          profesional={apeyNom}
        />
      )}

      {mdlAnularTodosLosTurnos && (
        <Mdlanulartodoslosturnos
          show={setModalAnularTodosLosTurnos}
          handleClose={closeMdlAnularTodosLosTurnos}
          fecha={Fecha}
          idprofesional={idProfesional}
          idusuario={idusuario}
          apeynom={apeyNom}
          vienede="profesionales"
          observaciones="POR PEDIDO DEL PROFESIONAL, SE CANCELAN LOS TURNOS DE ESTE DÍA."
        />
      )}
    </>
  );
}

export default Profesionales;
