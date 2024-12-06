import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

import { tiposexoService } from "/src/services/tiposexo.service.js";
import { pacientesService } from "../../services/pacientes.service";
import { tipodocumentoService } from "/src/services/tipoDocumento.service.js";

import MdlValidar from "../modales/mdlvalidar";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";



import "/src/css/registrarpaciente.css";


const registrarpaciente = ({ show, handleClose }) => {

  const [isDisabled, setIsDisabled] = useState(true);

  const [Apellido, setApellido] = useState('');
  const [Nombres, setNombres] = useState('');
  const [TipoDocumento, setTipoDocumento] = useState([]);
  const [NroDocumento, setNroDocumento] = useState([]);
  const [EMail, setEMail] = useState('');
  
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [TECelular, setTECelular] = useState('');

  const [TipoSexo, setTipoSexo] = useState([]);

 
  const [idTipoSexoSelected, setIDTipoSexoSelected] = useState('');
  const [TipoDocumentoSelected, setTipoDocumentoSelected] = useState('');
  

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModalAlta, setShowModalAlta] = useState(false);

  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const closeModalMessage = () => { 
    
    setShowModal(false);
  };
  const openModalAlta = () => {
    setModalMessage('ALTA EXITOSA');
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

 
 /*Carga Tipo de sexo*/
 useEffect(() => {
  async function fetchData() {
      try {
          const data = await tiposexoService.Buscar(); // Llama a la función asíncrona
          setTipoSexo(data); // Establece el estado con los datos obtenidos
      } catch (error) {
          console.error('Error fetching data:', error);
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
        console.error('Error fetching data:', error);
    }
}

fetchData(); // Ejecuta la función para obtener los datos
}, []); 


async function Grabar() {
  // agregar o modificar
  //validaciones
  // Validaciones
  if (!TipoDocumentoSelected) {
    showModalMessage("Debe seleccionar un tipo de documento");
    return;
  } else if (typeof NroDocumento !== 'string' || !NroDocumento.trim()) {
    showModalMessage("El campo 'Número de Documento' es obligatorio y debe ser un texto válido");
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
  }

  try
  {
  
    await pacientesService.GrabarAlta(Nombres, Apellido, TipoDocumentoSelected,NroDocumento, EMail, FechaNacimiento, TECelular, idTipoSexoSelected);

    setModalMessage('ALTA EXITOSA');

  }
  catch (error)
  {
    
   /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
    return;
  }
}

  return (
    <>
       <Modal show={show} onHide={handleClose} size="xl">
       <Modal.Header closeButton style={{backgroundColor: '#0277bd', color: 'white'}} >
        <Modal.Title >DAR DE ALTA UN PACIENTE</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{width: '100%', background: 'white'}}

      >
      <div style={{ display: "grid", width: "100%",  backgroundColor:"white",  }}>
        <div className="acomodarencabezadoprofesional" style={{ background:"#D6EAF8"}}>
         

          <div style={{ width: "70%", textAlign: "left", color: "black"}}>
         
           
          </div>
          <div style={{ width: "30%", textAlign: "right" }}>
          <button
              title="Listar pacientes"
              className="btn btn-sm btn-light btn-outline-primary acomodarbotonespt"
             
            >
              <i class="fa-solid fa-calendar-days"></i>
            </button>
           

           
           
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", backgroundColor:"white", paddingLeft: '5px', paddingRight:'5px' }}>
         
          <div style={{ width: "100%"}}>
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
                   <option value="" disabled>Seleccionar</option>
                  {TipoDocumento.map(documento => ( 
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
                  if (/^\d*$/.test(value)) { // Verifica que solo contenga números
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
              
                   onChange={(e) =>setIDTipoSexoSelected(e.target.value)}
                   value={idTipoSexoSelected}
                   
                  
              >
                <option value="" disabled>Seleccionar</option>
              {TipoSexo.map(sexo => (
                
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
                onChange={(e) =>setApellido(e.target.value.toUpperCase())}
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
                onChange={(e) =>setNombres(e.target.value.toUpperCase())}
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
                onChange={(e) =>setFechaNacimiento(e.target.value)}
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
                  if (/^\d*$/.test(value)) { // Verifica que solo contenga números
                    setTECelular(value);
                  }
                }}
             
                value={TECelular}
              />
             
            </InputGroup>
          
           
          </div>
        </div>
        
        <div style={{
            width: "100%",
            margin: "0 auto",
            backgroundColor: "white",
            textAlign: "right",
          }}>
        
        <ButtonGroup className="mb-2">
            <Button
             variant="success"
             onClick={() => Grabar() }
            >Grabar
            </Button>
            <Button variant="primary">Limpiar</Button>
            <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
          </ButtonGroup>
             
        </div>
        <MdlValidar 
        show = {showModal}
        handleClose ={closeModalMessage}
        modalMessage = {modalMessage}
         />
        <MdlAltaExitosa 
        show = {showModalAlta}
        handleClose ={closeModalAlta}
        modalMessage = {modalMessage}
         />

      </div>
    </Modal.Body>
    </Modal>
    </>
  );
}

export default registrarpaciente;