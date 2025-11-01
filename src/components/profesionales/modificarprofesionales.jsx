import React, { useState, useEffect } from "react";



import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import MdlUpdateHorariosProfesional from "../profesionales/mdlupdatehorariosprofesional";

import { tiposexoService } from "/src/services/tiposexo.service.js";
import { profesionesService } from "/src/services/profesiones.service.js";
import { profesionalesService } from "/src/services/profesional.service.js";
import { tipodocumentoService } from "/src/services/tipoDocumento.service.js";
import { provinciasService } from "/src/services/provincias.service.js";


import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";

import "/src/css/registrarprofesional.css";


const modificarprofesional = ({ show, handleClose, idprofesional }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");

  const [item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  const [mdlUpdateHorariosProfesional, setMdlUpdateHorariosProfesional] = useState(false);

    const [apeynom, setApeyNom] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Nombres, setNombres] = useState("");
  const [TipoDocumento, setTipoDocumento] = useState([]);
  const [idTipoDocumento, setIDTipoDocumento] = useState("");
  const [NroDocumento, setNroDocumento] = useState([]);
  const [EMail, setEMail] = useState("");


  const [FechaNacimiento, setFechaNacimiento] = useState("");
  const [TECelular, setTECelular] = useState("");
  const [CuitCuil, setCuitCuil] = useState("");
  const [TipoSexo, setTipoSexo] = useState([]);
  const [idTipoSexo, setIDTipoSexo] = useState("");
  const [MatriculaNro, setMatriculaNro] = useState("");
  const [TipoProfesion, setTipoProfesion] = useState([]);
  const [profesion, setProfesion] = useState("");
  const [items, setItems] = useState([]);
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState("");
  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState("");
  const [idTipoProfesionSelected, setIdTipoProfesionSelected] = useState("");
  const [idusuario, setIDusuario] = useState(2);
  const [idProfesional, setIDProfesional] = useState("");
   
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

  
  const openMdlUpdateHorariosProfesionales = () => {
   /*  setIDProfesional(item.ID);
    const apyNom = `${item.Apellido || ""}, ${item.Nombres || ""}`; // Concatenar manejando valores nulos
    setapeyNom(apyNom.trim()); // Eliminar espacios en blanco innecesarios */
    setMdlUpdateHorariosProfesional(true);
  };

   const closeMdlUpdateHorariosProfesionales = () => {
    setMdlUpdateHorariosProfesional(false);
  };

  const openModalModificacionExitosa = () => {
    setModalMessage("Se modificó el profesional con éxito.")
    setModalMessageTitulo("MODIFICAR PROFESIONAL")
    setMdlAltaExitosa (true);
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
        const data = await profesionalesService.BuscarId(idprofesional); 
        setItems(data); 
        setIDProfesional(idprofesional)
        setApellido(data[0].Apellido)
        setNombres(data[0].Nombres)
        setApeyNom(data[0].Apellido + ", " + data[0].Nombres )
        setIDTipoDocumento(data[0].TipoDocumento)
        setNroDocumento(data[0].NroDocumento)
        setEMail(data[0].email)
        setCuitCuil(data[0].CuitCuil)
       // setFechaNacimiento(data[0].FechaNacimiento)
        setTECelular(data[0].TECelular)
        setMatriculaNro(data[0].matriculanro)
        setIdTipoProfesionSelected(data[0].idtipoprofesion)
        setIDTipoSexoSelected(data[0].idsexo)
      
        setProfesion(data[0].tprofesion)

        //const fechaLarga = format(new Date(data[0].FechaNacimiento), "yyyy-MM-dd", {locale: es});
        const formattedDate = new Date(data[0].FechaNacimiento).toISOString().split('T')[0]; // Solo la parte de la fecha
       
/*   // Convertir la fecha a la zona horaria local sin cambiar el día
  const zonedDate = utcToZonedTime(data[0].FechaNacimiento, 'America/Argentina/Buenos_Aires');
  const formattedDateForInput = format(zonedDate, 'yyyy-MM-dd'); */
  setFechaNacimiento(formattedDate);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData(); 
  }, []); // Se ejecuta solo una vez al montar el componente
  
  

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [sexoData, documentoData, profesionData, provinciaData] = await Promise.all([
          tiposexoService.Buscar(),
          tipodocumentoService.Buscar(),
          profesionesService.Buscar(),
          //profesionalesService.BuscarPorID(idprofesional),
          provinciasService.Buscar(),
        ]);
        setTipoSexo(sexoData);
        setTipoDocumento(documentoData);
        setTipoProfesion(profesionData);
        
        setProvinciaSeleccionada(provinciaData);
        setNuevo(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInitialData();
  }, []);


  async function GrabarModificacion() {
    // agregar o modificar
    //validaciones
    // Validaciones
   
    if (!idTipoDocumento) {
      showModalMessage("Debe seleccionar un tipo de documento");
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
    } else if (!NroDocumento) {
      
      showModalMessage("El campo 'Número de Documento' es obligatorio");
      return;
    } else if (!validarEmail(EMail)) {
      showModalMessage("El correo electrónico no es válido");
      return;
    } else if (!FechaNacimiento) {
      showModalMessage("El campo 'Fecha de Nacimiento' es obligatorio");
      return;
    } else if (!TECelular) {
      showModalMessage("El campo 'Teléfono Celular' es obligatorio");
      return;
    } else if (!CuitCuil) {
      showModalMessage("El campo 'CUIT/CUIL' es obligatorio");
      return;
    } else if (!MatriculaNro) {
      showModalMessage("El campo 'Número de Matrícula' es obligatorio");
      return;
    } else if (!idTipoProfesionSelected) {
      showModalMessage("Debe seleccionar un tipo de profesión");
      return;
    }

    try {

      
      await profesionalesService.GrabarAlta(
        idProfesional,
        Nombres,
        Apellido,
        idTipoDocumento,
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

      openModalModificacionExitosa();
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      return;
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" 
      backdrop="static"   // evita que se cierre al hacer clic fuera
        keyboard={false}    // evita que se cierre con la tecla ESC
    >
        <Modal.Header
          
          style={{ backgroundColor: "#0277bd", color: "white" }}
        >
          <Modal.Title>MODIFICAR DATOS DEL PROFESIONAL</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%", background: "white" }}>
          <div
            style={{ display: "grid", width: "100%", backgroundColor: "white" }}
          >
           
           

            <div style={{ width: "30%", textAlign: "left" }}>
              <button
                title="Modificar horarios del profesional"
                className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
                 onClick={() => openMdlUpdateHorariosProfesionales()}
              >
                <i class="fa-solid fa-clock"></i>
              </button>

           
            </div>
          
         
<hr></hr>
            
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
                      setEMail(items.email);
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
                <Button variant="success" onClick={() => GrabarModificacion()}>
                  Grabar datos
                </Button>
                <Button variant="warning">Limpiar</Button>
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

       {mdlUpdateHorariosProfesional && (
        <MdlUpdateHorariosProfesional
          show={openMdlUpdateHorariosProfesionales}
          handleClose={closeMdlUpdateHorariosProfesionales}
          idprofesional={idProfesional}
          profesion={profesion}
          profesional={apeynom}
        />
      )}

    </>
  );
};

export default modificarprofesional;
