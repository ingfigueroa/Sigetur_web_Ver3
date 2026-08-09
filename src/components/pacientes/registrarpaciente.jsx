// React
import React, { useState, useEffect, useContext } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

// Servicios
import { pacientesService } from "../../services/pacientes.service";
import { tiposexoService } from "/src/services/tiposexo.service.js";
import { tipodocumentoService } from "/src/services/tipodocumento.service.js";
import { provinciasService } from "/src/services/provincias.service.js";
import { localidadesService } from "/src/services/localidades.service.js";

// Componentes
import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";
import AbrirMDLMensaje from "../modales/mdlMensaje";

// Utilidades
import { calcularEdadDiaMesAnio } from "../../components/utils/fecha";

// Contexto
import { AuthContext } from "/src/context/AuthContext";

// CSS
import "/src/css/registrarpaciente.css";
const registrarpaciente = ({ show, handleClose, idcliente, idusuario }) => {
 const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "¿Desea grabar el nuevo paciente?",
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "REGISTRAR PACIENTE",
  );


     const [Apellido, setApellido] = useState("");
const [Nombres, setNombres] = useState("");
const [NroDocumento, setNroDocumento] = useState("");
const [FechaNacimiento, setFechaNacimiento] = useState("");
const [EMail, setEMail] = useState("");
const [TECelular, setTECelular] = useState("");
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState("");
  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState("");

  
  const [modalTitulo, setModalTitulo] = useState();
  const [modalCuerpo, setModalCuerpo] = useState();

const [TipoDocumento, setTipoDocumento] = useState([]);
const [TipoSexo, setTipoSexo] = useState([]);
const [provincias, setProvincias] = useState([]);
const [localidades, setLocalidades] = useState([]);

 const [idprovincia, setIDProvincia] = useState(0);
  const [idlocalidad, setIDLocalidad] = useState(0);

const [showModal, setShowModal] = useState(false);
const [showModalAlta, setShowModalAlta] = useState(false);
const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState(false);
const [showMDLMensaje, setShowMDLMensaje] = useState(false);

const [mensaje, setMensaje] = useState("");
const [modalMessage, setModalMessage] = useState("");
         

 const openMdlEstaSeguro = () => {
 
      if (!validar()){
          console.log("Pasa por aca")
         
          return;
      }

    setModalTitulo("REGISTRAR PACIENTE")
    setModalCuerpo("¿Está seguro de registrar el paciente?")

    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
   

  };

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const closeModalMessage = () => {
    setShowModal(false);
  };

  
  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
  };
  const openModalAlta = () => {
    setModalMessage("ALTA EXITOSA");
    setShowModalAlta(true);
  };

  const closeModalAlta = () => {
    setShowModalAlta(false);
  };

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const [selectedValue1, setSelectedValue1] = useState("");

  const [abrirComponente, setabrirComponente] = useState(true);

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

      if (!validarEmail(EMail)) {
        showModalMessage("El correo electrónico no es válido");
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
         


        function limpiar() {
            setApellido("");
            setNombres("");
            setNroDocumento("");
            setFechaNacimiento("");
            setIDTipoSexoSelected("");
            setTipoDocumentoSelected("Seleccionar");
            setEMail("");
          }

    const BuscarPacientePorDNI = async () => {
          if (!NroDocumento) return;

          try {
              
              const data = await pacientesService.Buscar(
                idcliente,
                Apellido,
                NroDocumento,
                1,
                10
              );
          

            if (data.total === 1) {
              setMensaje("Ya existe un paciente con el DNI ingresado.");
              setNroDocumento(0)
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


   async function Grabar() {
    // agregar o modificar
    //validaciones
    // Validaciones

    
  
    try {
    

    const response = await pacientesService.GrabarAlta({
      idcliente: idcliente,
      Nombres,
      Apellido,
      TipoDocumento: TipoDocumentoSelected,
      NroDocumento,
      EMail,
      FechaNacimiento,
      TECelular,
      Sexo: idTipoSexoSelected,
      UserID: idusuario,
      idprovincia,
      idlocalidad
    });
      setMensaje(response.message);

      openMdlMensaje();
      return true;
  }catch (error) {
    console.error(error);
    return false;
}
  }


  const mdlSiNo = async (respuesta) => {
    closeMdlEstaSeguro(); // cerramos primero el modal de confirmación

    if (respuesta) {
      try {
         
       const bandera = await Grabar(); // ejecutamos la función de grabar
        
        if (bandera){
           setMensaje("Se grabó con éxito el NUEVO PACIENTE."); // mensaje a mostrar
        openMdlMensaje(); // abrimos el modal de mensaje
        handleClose();
        }else{
           setMensaje("No se grabó el NUEVO PACIENTE."); // mensaje a mostrar
        openMdlMensaje(); // abrimos el modal de mensaje
        handleClose();
        }
       
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

  /*Carga Tipo de documento*/
/*   useEffect(() => {
    setEdad(calcularEdadDiaMesAnio(FechaNacimiento));
  }, [FechaNacimiento]); */



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
          <Modal.Title>REGISTRAR UN PACIENTE</Modal.Title>
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
                    * Tipo documento
                  </InputGroup.Text>
                  <select
                    style={{width:"15%"}}
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
                    * Nro.
                  </InputGroup.Text>
                  <Form.Control
                      placeholder="Ingresar número de documento"
                      aria-label="Ingresar nro de documento"
                      aria-describedby="basic-addon2"
                      type="text"
                      style={{ width: "10%" }}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setNroDocumento(value);
                        }
                      }}
                      onBlur={BuscarPacientePorDNI}
                      value={NroDocumento}
                    />

                   <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    * Sexo
                  </InputGroup.Text>
                  <select
                    onChange={(e) => setIDTipoSexoSelected(e.target.value)}
                    value={idTipoSexoSelected}
                    style={{ width: "15%" }}
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
                    * Apellido
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
                    * Nombres
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
                    * Fecha de nacimiento
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
                    * Correo electrónico
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingresar correo electrónico"
                    aria-label="Ingresar correo electrónico"
                    aria-describedby="basic-addon2"
                    type="email"
                    value={EMail}
                    onChange={(e) => setEMail(e.target.value)}
                  />
                  <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    * Celular
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
                  
                  {/* <InputGroup.Text
                    style={{ backgroundColor: "#679bb9", color: "white" }}
                  >
                    Edad
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Edad"
                    aria-label="Edad"
                    aria-describedby="basic-addon2"
                    type="text"
                    value={edad}
                  /> */}
                </InputGroup>

<InputGroup className="mb-3">
                <InputGroup.Text
                  style={{ backgroundColor: "#679bb9", color: "white" }}
                >
                 * Provincia que reside
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
                  * Localidad que reside
                </InputGroup.Text>

                <select
                  style={{ width: "30%" }}
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
                  onClick={openMdlEstaSeguro}
                  // onClick={() => Grabar() }
                >
                  Grabar
                </Button>
                <Button variant="primary" onClick={() => limpiar()}>
                  Limpiar
                </Button>
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
            <MdlAltaExitosa
              show={showModalAlta}
              handleClose={closeModalAlta}
              modalMessage={modalMessage}
            />
          </div>
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

export default registrarpaciente;
