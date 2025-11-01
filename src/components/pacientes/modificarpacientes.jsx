import React, { useState, useEffect } from "react";

import "/src/css/registrarprofesional.css";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import { tiposexoService } from "/src/services/tiposexo.service.js";

import { pacientesService } from "/src/services/pacientes.service.js";
import { tipodocumentoService } from "/src/services/tipoDocumento.service.js";


import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";



import { calcularEdad, getFechaISO } from "../../components/utils/fecha";


const modificarpaciente = ({ show, handleClose, idpaciente }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [Apellido, setApellido] = useState("");
  const [Nombres, setNombres] = useState("");

  const [TipoDocumento, setTipoDocumento] = useState([]);
  const [idTipoDocumento, setIDTipoDocumento] = useState("");
  const [NroDocumento, setNroDocumento] = useState([]);
  const [EMail, setEMail] = useState("");

  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("")
  const [TECelular, setTECelular] = useState("");
  const [CuitCuil, setCuitCuil] = useState("");
  const [TipoSexo, setTipoSexo] = useState([]);


  const [items, setItems] = useState([]);
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState("");

  const [idusuario, setIDusuario] = useState(2);
  const [idPaciente, setIDPaciente] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessageTitulo, setModalMessageTitulo] = useState("");
  const [nuevo, setNuevo] = useState("");
  const [mdlAltaExitosa, setMdlAltaExitosa] = useState(null);


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

  const openModalModificacionExitosa = () => {
    setModalMessage("Se modificaron los datos del PACIENTE con éxito.");
    setModalMessageTitulo("MODIFICAR PACIENTE");
    setMdlAltaExitosa(true);
  };

  const closeModalModificacionExitosa = () => {
    setMdlAltaExitosa(false);
  };

  

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    
    async function fetchData() {
      try {
       
        const data = await pacientesService.BuscarPorId(idpaciente);
        
        setItems(data);
        setIDPaciente(idpaciente);
        setApellido(data[0].Apellido);
        setNombres(data[0].Nombres);
        setIDTipoDocumento(data[0].TipoDocumento);
       
        setNroDocumento(data[0].NroDocumento);
        setEMail(data[0].EMail);
        
        // setFechaNacimiento(data[0].FechaNacimiento)
        setTECelular(data[0].TECelular);
        
        
        setIDTipoSexoSelected(data[0].idsexo);


      /*   //const fechaLarga = format(new Date(data[0].FechaNacimiento), "yyyy-MM-dd", {locale: es});
        const formattedDate = new Date(data[0].FechaNacimiento)
          .toISOString()
          .split("T")[0]; // Solo la parte de la fecha */

        
        setFechaNacimiento(getFechaISO(data[0].FechaNacimiento));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [sexoData, documentoData, profesionData, provinciaData] =
          await Promise.all([
            tiposexoService.Buscar(),
            tipodocumentoService.Buscar(),

            //profesionalesService.BuscarPorID(idprofesional),
          ]);
        setTipoSexo(sexoData);
        setTipoDocumento(documentoData);

        setNuevo(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    
    if (fechaNacimiento) {
      setEdad(calcularEdad(fechaNacimiento));
    }
  }, [fechaNacimiento]);

  async function Grabar() {
    // agregar o modificar
    //validaciones
    // Validaciones

    if (!idTipoDocumento) {
      showModalMessage("Debe seleccionar un tipo de documento");
      return;
    } else if (!NroDocumento) {
      showModalMessage("El campo 'Número de Documento' es obligatorio");
      return;
    } else if (!idTipoSexoSelected) {
      showModalMessage("Debe seleccionar el sexo");
      return;
    } else if (!Apellido.trim()) {
      showModalMessage("El campo Apellido es obligatorio");
      return;
    } else if (!Nombres.trim()) {
      showModalMessage("El campo Nombres es obligatorio");
      return;
    } else if (!FechaNacimiento) {
      showModalMessage("El campo 'Fecha de Nacimiento' es obligatorio");
      return;
    } else if (!validarEmail(EMail)) {
 
      showModalMessage("El correo electrónico no es válido");
      return;
    } else if (!TECelular) {
      showModalMessage("El campo 'Teléfono Celular' es obligatorio");
      return;
    }
    
    try {
      await pacientesService.GrabarAlta(
        idpaciente,
        Nombres,
        Apellido,
        idTipoDocumento,
        NroDocumento,
        EMail,
        FechaNacimiento,
        TECelular,
        idTipoSexoSelected,
        idusuario,
        nuevo
      );

      openModalModificacionExitosa();
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      return;
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl"  backdrop="static">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0277bd", color: "white" }}
        >
          <Modal.Title>MODIFICAR UN PACIENTE</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", background: "white" }}>
           <div style={{ width: "30%", textAlign: "left" }}>
              <button
                title="Activar OBRAS SOCIALES"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={(event) => {
                  event.preventDefault();
                  openModalAsignarObraSocial();
                }}
              >
               <i class="fa-regular fa-hospital"></i>
              </button>

            {/*   <button
                title="Imprimir listado de PACIENTES"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                onClick={() => Imprimir()}
              >
                <i class="fa fa-print"></i>
              </button> */}
            </div>
          
         
          <hr></hr>
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
                    onChange={(e) => setIDTipoDocumento(e.target.value)}
                    value={idTipoDocumento}
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
                    value={fechaNacimiento}
                  />
                   <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Edad:
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Edad"
                    aria-label="Edad"
                    aria-describedby="basic-addon2"
                    type="text"
                    value={edad + " años"}
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
          show={openModalModificacionExitosa}
          handleClose={handleClose}
          varMensaje={modalMessage}
          varMensajeTitulo={modalMessageTitulo}
        />
      )}

    </>
  );
};

export default modificarpaciente;
