import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import { tiposexoService } from "/src/services/tiposexo.service.js";
import { profesionesService } from "/src/services/profesiones.service.js";
import { profesionalesService } from "/src/services/profesional.service.js";
import { tipodocumentoService } from "/src/services/tipoDocumento.service.js";
import { provinciasService } from "/src/services/provincias.service.js";
import { localidadesService } from "/src/services/localidades.service.js";

import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";

import "/src/css/registrarprofesional.css";
import axios from "axios";

const registrarprofesional = ({ show, handleClose }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

  const [item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  const [Apellido, setApellido] = useState("");
  const [Nombres, setNombres] = useState("");
  const [TipoDocumento, setTipoDocumento] = useState([]);
  const [NroDocumento, setNroDocumento] = useState([]);
  const [EMail, setEMail] = useState("");

  const [mdlAltaExitosa, setMdlAltaExitosa] = useState(null);

  const [FechaNacimiento, setFechaNacimiento] = useState("");
  const [TECelular, setTECelular] = useState("");
  const [CuitCuil, setCuitCuil] = useState("");
  const [TipoSexo, setTipoSexo] = useState([]);
  const [MatriculaNro, setMatriculaNro] = useState("");
  const [TipoProfesion, setTipoProfesion] = useState([]);
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState("");
  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState("");
  const [idTipoProfesionSelected, setIdTipoProfesionSelected] = useState("");
  const [idusuario, setIDusuario] = useState(2);
  const [idprofesional, setIDProfesional] = useState("0");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessageTitulo, setModalMessageTitulo] = useState("");
  const [showModalAlta, setShowModalAlta] = useState(false);
  const [nuevo, setNuevo] = useState("");

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const closeModalMessage = () => {
    setShowModal(false);
  };

  const openModalAlta = () => {
    setModalMessage("ALTA EXITOSA");
    setMdlAltaExitosa(true);
  };

  const closeModalAlta = () => {
    setMdlAltaExitosa(false);
  };

  const openModalAltaExitosa = () => {
    setModalMessage("Se registró el profesional con éxito.")
    setModalMessageTitulo("REGISTRAR PROFESIONAL")
    setMdlAltaExitosa (true);
  };

  const closeModalAltaExitosa = () => {
    setMdlAltaExitosa(false);
  };


  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /*Carga Tipo de sexo*/
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await tiposexoService.Buscar(); // Llama a la función asíncrona
        setTipoSexo(data); // Establece el estado con los datos obtenidos
        setNuevo(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);

  /*Carga Tipo de documento*/
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await tipodocumentoService.Buscar(); // Llama a la función asíncrona
        setTipoDocumento(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await provinciasService.Buscar(); // Llama a la función asíncrona
        setProvinciaSeleccionada(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);

  /* Carga provincias*/
  useEffect(() => {
    if (provinciaSeleccionada > 0) {
      const fetchLocalidades = async () => {
        const data = await localidadesService.Buscar(provinciaSeleccionada); // Función para obtener ciudades basadas en la provincia seleccionada
        setLocalidades(data);
      };
      fetchLocalidades();
    }
  }, [provinciaSeleccionada]);

  async function Grabar() {
    // agregar o modificar
    //validaciones
    // Validaciones
    if (!TipoDocumentoSelected) {
      showModalMessage("Debe seleccionar un tipo de documento");
      return;
    } else if (typeof NroDocumento !== "string" || !NroDocumento.trim()) {
      showModalMessage(
        "El campo 'Número de Documento' es obligatorio y debe ser un texto válido"
      );
      return;
    } else if (!idTipoSexoSelected) {
      showModalMessage("Debe seleccionar un sexo");
      return;
    } else if (!Apellido.trim()) {
      showModalMessage("El campo 'Apellido' es obligatorio");
      return;
    } else if (!Nombres.trim()) {
      showModalMessage("El campo 'Nombres' es obligatorio");
      return;
    } else if (!NroDocumento.trim()) {
      showModalMessage("El campo 'Número de Documento' es obligatorio");
      return;
    } else if (!validarEmail(EMail)) {
      showModalMessage("El correo electrónico no es válido");
      return;
    } else if (!FechaNacimiento) {
      showModalMessage("El campo 'Fecha de Nacimiento' es obligatorio");
      return;
    } else if (!TECelular.trim()) {
      showModalMessage("El campo 'Teléfono Celular' es obligatorio");
      return;
    } else if (!CuitCuil.trim()) {
      showModalMessage("El campo 'CUIT/CUIL' es obligatorio");
      return;
    } else if (!MatriculaNro.trim()) {
      showModalMessage("El campo 'Número de Matrícula' es obligatorio");
      return;
    } else if (!idTipoProfesionSelected) {
      showModalMessage("Debe seleccionar un tipo de profesión");
      return;
    }

    try {
      
      await profesionalesService.GrabarAlta(
        idprofesional,
        Nombres,
        Apellido,
        TipoDocumentoSelected,
        NroDocumento,
        EMail,
        FechaNacimiento,
        TECelular,
        idTipoSexoSelected,
        CuitCuil,
        MatriculaNro,
        idTipoProfesionSelected,
        idusuario,
        nuevo
      );

      openModalAltaExitosa();
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      return;
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0277bd", color: "white" }}
        >
          <Modal.Title>DAR DE ALTA UN PROFESIONAL</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", background: "white" }}>
          <div
            style={{ display: "grid", width: "100%", backgroundColor: "white" }}
          >
         
            <div
              style={{
                display: "flex",
                width: "100%",
                backgroundColor: "white",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              <div style={{ width: "100%" }}>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Tipo documento
                  </InputGroup.Text>
                  <select
                    onChange={(e) => setTipoDocumentoSelected(e.target.value)}
                    value={TipoDocumentoSelected}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {TipoDocumento.map((documento) => (
                      <option key={documento.id} value={documento.id}>
                        {documento.descripcion}
                      </option>
                    ))}
                  </select>

                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Nro.
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar número de documento"
                    aria-label="Ingresar nro de documento"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        // Verifica que solo contenga números
                        setNroDocumento(value);
                      }
                    }}
                    value={NroDocumento}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon1"
                    color="white"
                    disabled={isDisabled}
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </Button>
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Sexo
                  </InputGroup.Text>
                  <select
                    onChange={(e) => setIDTipoSexoSelected(e.target.value)}
                    value={idTipoSexoSelected}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {TipoSexo.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>
                        {sexo.descripcion}
                      </option>
                    ))}
                  </select>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Apellido
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar apellido"
                    aria-label="Ingresar apellido"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => setApellido(e.target.value.toUpperCase())}
                    value={Apellido}
                  />

                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Nombres
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar nombres"
                    aria-label="Ingresar nombres"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => setNombres(e.target.value.toUpperCase())}
                    value={Nombres}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Fecha de nacimiento
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar fecha de nacimiento"
                    aria-label="Ingresar fecha de nacimiento"
                    aria-describedby="basic-addon2"
                    type="date"
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    value={FechaNacimiento}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Correo electrónico
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar correo electrónico"
                    aria-label="Ingresar correo electrónico"
                    aria-describedby="basic-addon2"
                    type="email"
                    onChange={(e) => {
                      const email = e.target.value;
                      setEMail(email);
                      if (!validarEmail(email)) {
                        // Aquí podrías mostrar un mensaje de error o aplicar algún estilo al campo
                      }
                    }}
                    value={EMail}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Celular
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar número de celular"
                    aria-label="Ingresar número de celular"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        // Verifica que solo contenga números
                        setTECelular(value);
                      }
                    }}
                    value={TECelular}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    CUIT/CUIL
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar CUIT/CUIL"
                    aria-label="Ingresar CUIT/CUIL"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        // Verifica que solo contenga números
                        setCuitCuil(value);
                      }
                    }}
                    value={CuitCuil}
                  />
                </InputGroup>
                <InputGroup className="mb-3"></InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Profesión
                  </InputGroup.Text>
                  <select
                    style={{ width: "60%" }}
                    onChange={(e) => {
                      setIdTipoProfesionSelected(e.target.value);
                     
                    }}
                    value={idTipoProfesionSelected}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {TipoProfesion.map((profesion) => (
                      <option key={profesion.ID} value={profesion.ID}>
                        {profesion.descripcion}
                      </option>
                    ))}
                  </select>
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    MATRICULA
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar matrícula"
                    aria-label="Ingresar matrícula"
                    aria-describedby="basic-addon2"
                    type="text"
                    onChange={(e) => setMatriculaNro(e.target.value)}
                    value={MatriculaNro}
                  />
                </InputGroup>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "white",
                textAlign: "right",
              }}
            >
              <ButtonGroup className="mb-2">
                <Button variant="success" onClick={() => Grabar()}>
                  Grabar
                </Button>
                <Button variant="primary">Limpiar</Button>
                <Button variant="primary" onClick={handleClose}>
                  Cerrar
                </Button>
              </ButtonGroup>
            </div>
            <MdlValidar
              show={showModal}
              handleClose={closeModalMessage}
              modalMessage={modalMessage}
            />
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
    </>
  );
};

export default registrarprofesional;
