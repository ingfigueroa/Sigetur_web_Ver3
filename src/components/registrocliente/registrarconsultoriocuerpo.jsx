import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import "/src/css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


import {correosServices} from "../../services/correos.service";
import { usuariosService } from "../../services/usuarios.service.js";

import AbrirMDLMensaje from "../modales/mdlMensaje";



function registrarconsultoriocuerpo() {

  const navigate = useNavigate();

  const [EMail, setEMail] = useState("");

  const [showMDLClinica, setShowMDLClinica] = useState(false);
 
  const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");
    
  
    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
    
  };

  
    const [formData, setFormData] = useState({
      tipoCliente: "",
      razonSocial: "",
      email: "",
      cuil: "",
      celular: "",
      idprovincia: "",
      idlocalidad: ""
  
    });
  

     const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const BuscarUsuarioPorEmail = async () => {
              if (!EMail) return;
    
              try {
             
                  const data = await usuariosService.BuscarUsuarioxEMail(EMail);
              
                 
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
                setMensaje(error);
                openMdlMensaje();
              }
            };
    
  const emailValido = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {



      if (!EMail || !emailValido(EMail)) {
        setMensaje('Debe ingresar una cuenta de correo con formato válido.');
        openMdlMensaje();
        return;
      }

  try {

   
    const data = await correosServices.CrearCuenta(EMail);

setMensaje(
  `${data.message} Se envió el token al correo electrónico ingresado.`
);
            openMdlMensaje();
            setTimeout(() => {
                      navigate("/login", {
                        
                      });
            }, 5000);
   
    
  } catch (error) {
  if (error.response) { 
    return error.response.data;
  }

  if (error.request) {
    return {
      ok: false,
      message: 'No hubo respuesta del servidor'
    };
  }

  return {
    ok: false,
    message: error.message
  };
}
}; 

const volveallogin = async () => {
   setTimeout(() => {
              navigate("/login", {
                
              });
            }, 500);
};

  return (
    <>
    <div id="rccuerpo1">
      <div > 
       <div >
          {/* <h3 >
            <span className="bolded">Crear una cuenta en el Portal</span>{" "}
          </h3> */}
            
          <h1 style={{ 
            marginBottom: "25px",
            color: "#0277bd",
            fontFamily: "Roboto",
           
          }}>Registrar CONSULTORIO - Paso 1</h1>

         
          <br />
          <h5 className="rccuerpo-h5">
            {" "}
            1.- Elegir si es un CONSULTORIO o una CLINICA la quevas a registrar.
          </h5>

          <h5 className="rccuerpo-h5">
            {" "}
            2.- Ingresar el mail que identifica a MI CONSULTORIO.
          </h5>

          
          <h5 className="rccuerpo-h5">
            {" "}
            3.- Hacer click en el botón ENVIAR CODIGO.
          </h5>
          <br />
         
          <br />
          <br />
           
             
           
          <InputGroup className="mb-3">
           <InputGroup.Text>Tipo de Cliente</InputGroup.Text>
            <Form.Select
  name="tipoCliente"
  value={formData.tipoCliente}
onChange={(e) => {
  const tipo = e.target.value;

  if (tipo === "CLINICA") {
    setShowMDLClinica(true);

    setFormData({
      ...formData,
      tipoCliente: ""
    });

    return;
  }

  setFormData({
    ...formData,
    tipoCliente: tipo
  });
}}

>
  <option value="">Seleccione...</option>
  <option value="CONSULTORIO">MI CONSULTORIO</option>
  <option value="CLINICA">MI CLINICA</option>
</Form.Select>
</InputGroup>
 <InputGroup className="mb-3">
        <InputGroup.Text>Ingresar mail</InputGroup.Text>
        <Form.Control
          placeholder="Ingrese su mail"
           onChange={(e) => {
                      const email = e.target.value;
                      setEMail(email);
                      if (!validarEmail(email)) {
                        // Aquí podrías mostrar un mensaje de error o aplicar algún estilo al campo
                      }
                    }}
                     onBlur={BuscarUsuarioPorEmail}
                    value={EMail}
        />
      </InputGroup>
        </div>
         
          {/* CAPTCHA */}
  {/*     <div className="mb-3">
        <ReCAPTCHA
          sitekey="TU_SITE_KEY_AQUI"
          onChange={handleCaptcha}
        />
      </div> */}

        <div className="volverallogin">
          
        
          <div className="volverallogin1">
             <Button onClick={volveallogin}>Volver al LOGIN</Button>
            
            
          </div>

           <div className="volverallogin1">
             <Button  variant="outline-success" 
             onClick={handleSubmit}>Enviar código</Button>
            
          </div>
        
        </div>
      </div>
    </div>

    <Modal
  show={showMDLClinica}
  onHide={() => setShowMDLClinica(false)}
  centered
>
<Modal.Header style={{backgroundColor: "#1565c0", color: "white"}} closeButton>
  <div className="d-flex align-items-center gap-3">
   {/*  <img
     src="./assets/Logo_2022_resolucion.jpg"
      alt="Logo SIGETUR"
      style={{
        width: "55px",
        height: "55px",
        objectFit: "contain"
      }}
    /> */}

    <Modal.Title>
      Para registrar una CLÍNICA - Comunicate
    </Modal.Title>
  </div>
</Modal.Header>

<Modal.Body>
  <p>
    Para registrar una clínica, comunicate con SIGETUR por cualquiera de estos medios:
  </p>

  <div className="d-flex align-items-center gap-3 mb-3">
    <FontAwesomeIcon
      icon={faEnvelope}
      style={{ color: "#0277bd", fontSize: "24px", width: "30px" }}
    />

    <p>sigetur@gmail.com</p>
  </div>

  <div className="d-flex align-items-center gap-3 mb-3">
    <FontAwesomeIcon
      icon={faPhone}
      style={{ color: "#198754", fontSize: "24px", width: "30px" }}
    />

   <p>
      +54 9 351-6557517
    </p>
  </div>

  <div className="d-flex align-items-center gap-3 mb-3">
    <FontAwesomeIcon
      icon={faInstagram}
      style={{ color: "#C13584", fontSize: "26px", width: "30px" }}
    />

    <a
      href="https://www.instagram.com/sigetur/"
      target="_blank"
      rel="noopener noreferrer"
    >
      @sigetur
    </a>
  </div>
</Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowMDLClinica(false)}
    >
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>
      {showMDLMensaje && (
            <AbrirMDLMensaje
              show={openMdlMensaje}
              handleClose={closeMdlMensaje}
              modalMessage={mensaje}
            />
          )}

          </>
  );
}


export default registrarconsultoriocuerpo;
