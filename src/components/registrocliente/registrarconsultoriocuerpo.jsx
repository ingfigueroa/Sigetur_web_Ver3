import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import "/src/css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";


import {correosServices} from "../../services/correos.service";
import { usuariosService } from "../../services/usuarios.service.js";

import AbrirMDLMensaje from "../modales/mdlMensaje";



function registrarconsultoriocuerpo() {

  const navigate = useNavigate();

  const [EMail, setEMail] = useState("");

 
  const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");
    
  
    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
    
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
    

const handleSubmit = async () => {

  const emailValido = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

      if (!email || !emailValido(email)) {
        setMensaje('Debe ingresar una cuenta de correo con formato válido.');
        openMdlMensaje();
        return;
      }

  try {

   
    const data = await correosServices.CrearCuenta(email);
    
    setMensaje(data.message);
    openMdlMensaje();
    setTimeout(() => {
              navigate("/login", {
                
              });
            }, 2000);
   
    
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
 <h3 >
            <span className="bolded">Crear una cuenta en el Portal</span>{" "}
          </h3>
<br />
          <h1 style={{ 
            marginBottom: "25px",
            color: "#0277bd",
            fontFamily: "Roboto",
           
          }}>Registrar CONSULTORIO - Paso 1</h1>

         
          <br />
          <h5 className="rccuerpo-h5">
            {" "}
            1.- Ingresar el mail que identifica a la Clinica o MI CONSULTORIO.
          </h5>

          
          <h5 className="rccuerpo-h5">
            {" "}
            2.- Hacer click en el botón ENVIAR CODIGO.
          </h5>
          <br />
         
          <br />
          <br />
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
