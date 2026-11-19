import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import { tiposexoService } from "/src/services/tiposexo.service.js";
import { profesionesService } from "/src/services/profesiones.service.js";
import { profesionalesService } from "/src/services/profesional.service.js";
import { tipodocumentoService } from "/src/services/tipodocumento.service.js";
import { provinciasService } from "/src/services/provincias.service.js";
import { localidadesService } from "/src/services/localidades.service.js";
import { usuariosService } from "/src/services/usuarios.service.js";

import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";
import AbrirMDLMensaje from "../modales/mdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import "/src/css/registrarprofesional.css";
import { Email } from "@mui/icons-material";
import { formatearFecha_a_MM_DD_YYYY, getFechaISO} from "../utils/fecha";


const registrarprofesional = ({ show, handleClose, ClienteID, UserID }) => {



 const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Desea grabar un nuevo profesional?",
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "REGISTRAR PROFESIONAL",
  );
  
    const [showMDLMensaje, setShowMDLMensaje] = useState("");
    const [mensaje, setMensaje] = useState("");

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);

  const [Apellido, setApellido] = useState("");
  const [Nombres, setNombres] = useState("");
  const [TipoDocumento, setTipoDocumento] = useState([]);
  const [NroDocumento, setNroDocumento] = useState(0);
  const [EMail, setEMail] = useState("");

  const [mdlAltaExitosa, setMdlAltaExitosa] = useState(null);

  const [FechaNacimiento, setFechaNacimiento] = useState("");
  const [TECelular, setTECelular] = useState("");
  const [CuitCuil, setCuitCuil] = useState("");
  const [TipoSexo, setTipoSexo] = useState([]);
  const [MatriculaNro, setMatriculaNro] = useState("");
  const [TipoProfesion, setTipoProfesion] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState("");
  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState("");
  const [idTipoProfesionSelected, setIdTipoProfesionSelected] = useState("");
  const [idusuario, setIDusuario] = useState(UserID);
  const [idprofesional, setIDProfesional] = useState("0");
  const [idprovincia, setIDProvincia] = useState(0);
  const [idlocalidad, setIDLocalidad] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessageTitulo, setModalMessageTitulo] = useState("");
  const [showModalAlta, setShowModalAlta] = useState(false);
  const [nuevo, setNuevo] = useState("");


 function limpiar() {
            setApellido("");
            setNombres("");
            setNroDocumento("");
            setFechaNacimiento("");
            setIDTipoSexoSelected("");
            setTipoDocumentoSelected("Seleccionar");
            setEMail("");
            setMatriculaNro("");
            setTECelular("");
            setTipoProfesion([]);
            setIDLocalidad("");
            setLocalidades([]);
            cargarLocalidades(idProv);
            setLocalidades([])
          }

  const acomodardatosprofesional = (registros) => {

  const profesional = registros[0];



  if (!profesional) return;

  setApellido(profesional.Apellido || "");
  setNombres(profesional.Nombres || "");
// setTipoDocumento(profesional.TipoDocumento || 0);
  setNroDocumento(profesional.NroDocumento || 0);
  setEMail(profesional.EMail || "");

  setFechaNacimiento(getFechaISO(profesional.FechaNacimiento) || "");

  setTECelular(profesional.TECelular || "");
  setCuitCuil(profesional.CuitCuil || "");
  setMatriculaNro(profesional.matriculanro || "");

  setIDTipoSexoSelected(Number(profesional.Sexo) || 0);
  
  setTipoDocumentoSelected(profesional.TipoDocumento || "");
  setIdTipoProfesionSelected(profesional.idtipoprofesion || "");

  setIDProvincia(profesional.IDProvincia || 0);
  cargarLocalidades(idprovincia)
   
  setIDLocalidad(profesional.IDLocalidad || 0);

};
  
 function validar() {

    
     if (!TipoDocumentoSelected) {
        showModalMessage("Debe seleccionar un tipo de documento");
        return false;
      }
      
      if (typeof NroDocumento !== "string" || !NroDocumento.trim()) {
        showModalMessage(
          "El campo 'Número de Documento' es obligatorio y debe ser un texto válido"
        );
        return false;
      }

      if (!/^\d{7,8}$/.test(NroDocumento)) {
        showModalMessage("El DNI debe contener entre 7 y 8 dígitos");
        return false;
      }

      
      if (!idTipoSexoSelected) {
        showModalMessage("Debe seleccionar un sexo");
        return false;
      }

      if (!Apellido.trim()) {
        showModalMessage("El campo 'Apellido' es obligatorio");
        return false;
      }

      if (!Nombres.trim()) {
        showModalMessage("El campo 'Nombres' es obligatorio");
        return false;
      }
      if (typeof FechaNacimiento !== "string" || !FechaNacimiento.trim()) {
        showModalMessage(
          "El campo 'Fecha de Nacimiento' es obligatorio y debe ser una fecha válida"
        );
        return false;
      }

      const fechaNacimiento = new Date(FechaNacimiento);

      if (isNaN(fechaNacimiento.getTime())) {
        showModalMessage(
          "El campo 'Fecha de Nacimiento' debe contener una fecha válida"
        );
        return false;
      }

      if (fechaNacimiento > new Date()) {
        showModalMessage(
          "La fecha de nacimiento no puede ser posterior a la fecha actual"
        );
        return false;
      }

      if (!validarEmail(EMail)) {
        showModalMessage("El formato de correo electrónico no es válido");
        return false;
      }

    if (!CuitCuil.trim()) {
      showModalMessage("El campo 'CUIT/CUIL' es obligatorio");
      return false; 
    } 
      if (!idTipoProfesionSelected > 0) {
      showModalMessage("Debe seleccionar un tipo de profesión");
      return false;
    }
    if (!MatriculaNro.trim()) {
      showModalMessage("El campo 'Número de Matrícula' es obligatorio");
      return false;
    }
       if (!TECelular.trim()) {
        showModalMessage("El campo 'Teléfono Celular' es obligatorio");
        return false;
      }

      if (!idprovincia > 0) {
        showModalMessage("Debe seleccionar una provincia");
        return false;
      }

      if (!idlocalidad > 0) {
        showModalMessage("Debe seleccionar una localidad");
        return false;
      }
      return true;
    }

 const openMdlEstaSeguro = (titulo,cuerpo,bandera) => {
  

    if (bandera == 0){
      if (!validar()){
          
          return;
      }
    }
    
     setModalMensajeCuerpo(cuerpo)
     setModalMensajeTitulo(titulo)
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
   

  };
  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {

    setShowMDLMensaje(false);
   
  };

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

 const BuscaProfesionalPorDNIidCliente = async (varDNI, idcliente) => {
  try {

  
    const data = await profesionalesService.Buscar(
      idcliente,
      "",
      varDNI,
      1,
      10
    );

    return data.total === 1;

  } catch (error) {
    
    throw error;
  }
};
const BuscaProfesionalSoloDNIActivoOtroCliente = async (varDNI) => {
  try {
    const data = await profesionalesService.BuscarSoloDNIActivoOtroCliente(varDNI);

    return data;

  } catch (error) {
   
   
    throw error;
  }
};

const BuscaProfesionalSoloDNIActivoTablaProfesionales = async (varDNI) => {
  try {
    const data = await profesionalesService.BuscaProfesionalSoloDNIActivoTablaProfesionales(varDNI);

    return data;

  } catch (error) {
   
   
    throw error;
  }
};

  const BuscaUsuarioPorEmail = async () => {
            if (!EMail) return;
  
            try {
                
                const data = await usuariosService.BuscarUsuarioxEMail(
                  EMail
                 
                );
            
               
              if (data.total === 1) {
                setMensaje("Ya existe el EMAIL ingresado.");
                setEMail("")
                openMdlMensaje()
  
                
                // Completar los datos del formulario
                // setApellido(respuesta.data.apellido);
                // setNombre(respuesta.data.nombre);
                // ...
              } 
            } catch (error) {
              console.error(error);
            }
          };
          
   const BuscaProfesionalPorEMAIL = async () => {
            if (!EMail) return;
  
            try {
                
                const data = await profesionalesService.BuscarProfesionalxEMail(
                  EMail
                 
                );
            
                console.log(data)
              if (data.total === 1) {
                setMensaje("Ya existe un profesional con el EMAIL ingresado.");
                setEMail("")
                openMdlMensaje()
  
                
                // Completar los datos del formulario
                // setApellido(respuesta.data.apellido);
                // setNombre(respuesta.data.nombre);
                // ...
              } 
            } catch (error) {
              console.error(error);
            }
          };




const validarProfesional = async (varDNI) => {

  try {

    // Primero verifico si ya está registrado en el consultorio
    const existeCliente = await BuscaProfesionalPorDNIidCliente(varDNI, ClienteID);
    if (existeCliente) {
      setMensaje("Ya existe un profesional registrado en el\n CONSULTORIO con ese DNI.");
      setNroDocumento("");
      openMdlMensaje();
      return;
    }
    // Busca profesional activo en otro consultorio
    const response = await BuscaProfesionalSoloDNIActivoOtroCliente(varDNI);

     if (response.total) {
              
              
            //  acomodardatosprofesional(response.registros);
              console.log("Llega hasta aca pero no entra por profesional existente")
              
              setMensaje("PROFESIONAL EXISTENTE\nEl DNI del profesional ya esta activo en otro consultorio.\nPara registrar al profesional en este consultorio, se tiene que dar la baja en el consultorio antiguo.\nTambién se puede dar de baja mandando un mail a sigetur@gmail.com desde la cuenta del mismo profesional");
              openMdlMensaje();
              return;
        }
        //busca profesionales activos en la tabla profesionales
         const existeProfesional = await BuscaProfesionalSoloDNIActivoTablaProfesionales(varDNI);

     if (existeProfesional.total) {
              acomodardatosprofesional(existeProfesional.registros);
              openMdlEstaSeguro("DATOS DEL PROFESIONAL", "El profesional tiene registrados los datos.\n¿Desea grabar el profesional en el consultorio?",1);
              return;
        }
  } catch (error) {
    
    setMensaje("Error al validar los datos del profesional");
    openMdlMensaje();
  }
};          

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

   async function Grabar() {
    try {

      const response = await profesionalesService.GrabarAlta(
        ClienteID,
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
        UserID,
        idprovincia,
        idlocalidad,
        nuevo
      );
    return true;
     
      
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */

     setMensaje(error)
     openMdlMensaje();
      return;
    }
  }

  const cargarLocalidades = async (idprovincia) => {
   
      try {

    if (idprovincia > 0) {
        
        const response = await localidadesService.Buscar(idprovincia);
        setLocalidades(response);

        }
      } catch (error) {
        //console.error("Error al cargar localidades:", error);
        setLocalidades([]);
      }
};

  const mdlSiNo = async (respuesta) => {
    closeMdlEstaSeguro(); // cerramos primero el modal de confirmación

    if (respuesta) {
      try {
         
      const bandera = await Grabar();


      if (bandera === true) {
          


      setMensaje(
          "Se creó el profesional.\n\n" +
          "Para activar la cuenta del profesional siga estos pasos:\n\n" +
          "1.- Tiene que ir a LOGIN.\n\n" +
          "2.- Olvidé mi contraseña.\n\n" +
          "3.- Resetear la password usando el mail que ingresó del profesional."
      );

     

      openMdlMensaje();


      } else {
    

          setMensaje("No se pudo crear el profesional");
          openMdlMensaje();
      }
        /* if (bandera){
            setMensaje("Se grabó con éxito el NUEVO PACIENTE."); // mensaje a mostrar
            openMdlMensaje(); // abrimos el modal de mensaje
            handleClose();
        }else{
           setMensaje("No se grabó el NUEVO PACIENTE."); // mensaje a mostrar
        openMdlMensaje(); // abrimos el modal de mensaje
        handleClose();
        } */
       
      } catch (error) {
        setMensaje("Ocurrió un error al grabar");
        openMdlMensaje();
      }
    } else {
      setMensaje("Usuario canceló la operación");
      openMdlMensaje(); // opcional, si querés mostrar que canceló
    }
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
        
        setProvincias(data); // Establece el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Ejecuta la función para obtener los datos
  }, []);


 

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{  color:"white",
            backgroundColor: "#198754", }}
        >
          <Modal.Title>REGISTRAR UN PROFESIONAL</Modal.Title>
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
                    style={{ width: "30%"}}
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
                    onBlur={() => validarProfesional(NroDocumento)}
                    value={NroDocumento}
                  />
                 <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Sexo
                  </InputGroup.Text>
                  <select
                  style={{ width: "15%"}}
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
                  style={{ width: "18%"}}
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
                  style={{ width: "18%"}}
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
                    style={{ width: "40%"}}
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
                     onBlur={BuscaUsuarioPorEmail}
                    value={EMail}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Celular
                  </InputGroup.Text>
                  <Form.Control
                  style={{ width: "15%"}}
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
                <InputGroup className="mb-3"></InputGroup>
                <InputGroup className="mb-3">
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
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Profesión
                  </InputGroup.Text>
                  <select
                    style={{ width: "40%" }}
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

              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Provincia que reside
                </InputGroup.Text>

                <select
                  style={{ width: "34%" }}
                  value={idprovincia}
                  onChange={(e) => {
                    const idProv = e.target.value;

                    setIDProvincia(idProv);
                    setIDLocalidad("");
                    setLocalidades([]);

                    // Próximo paso:
                    cargarLocalidades(idProv);
                  }}
                >
                  <option value="">Seleccionar</option>

                  {provincias.map((prov) => (
                    <option key={prov.ID} value={prov.ID}>
                      {prov.Nombre}
                    </option>
                  ))}
                </select>

                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                  Localidad que reside
                </InputGroup.Text>

                <select
                  style={{ width: "34%" }}
                  value={idlocalidad}
                  disabled={!idprovincia}
                  onChange={(e) => {
                    setIDLocalidad(e.target.value);
                  }}
                >
                  <option value="">Seleccionar</option>

                  {localidades.map((localidad) => (
                    <option key={localidad.ID} value={localidad.ID}>
                      {localidad.localidad}
                    </option>
                  ))}
                </select>
              </InputGroup>

              </div>
            </div>
<hr />
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
                 onClick={() => openMdlEstaSeguro("REGISTRAR PROFESIONAL","¿Desea grabar un nuevo profesional?", 0)}>
                                 
                  Grabar
                </Button>
                <Button variant="primary" onClick={() => limpiar()}>Limpiar</Button>
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
          <MdlValidar
                        show={showModal}
                        handleClose={closeModalMessage}
                        modalMessage={modalMessage}
                      />
                      <MdlAltaExitosa
                        show={showModalAlta}
                        handleClose={closeModalAlta}
                        modalMessage={modalMessage}
                      />
                    
        </Modal.Body>
      </Modal>

       
        {showMDLEstaSeguro && (
              <MDLEstaSeguro
                show={openMdlEstaSeguro}
                handleClose={closeMdlEstaSeguro}
                mensajetitulo={mdlMensajeTitulo}
                mensajecuerpo={mdlMensajeCuerpo}
                enviaralpadre={mdlSiNo} // esta función recibe la respuesta
              />
            )}

               {showMDLMensaje && (
                    <AbrirMDLMensaje
                      show={showMDLMensaje}
                      handleClose={closeMdlMensaje}
                      modalMessage={mensaje}
                    />
                  )}
    </>
  );
};

export default registrarprofesional;
