import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import "../css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {correosServices} from "../services/correos.service";

import AbrirMDLMensaje from "./modales/mdlMensaje";



function registrarconsultoriocuerpo() {

  

   const [email, setEmail] = useState("");

 
  const [showMDLMensaje, setShowMDLMensaje] = useState("");
  const [mensaje, setMensaje] = useState("");
    
  
    const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
    
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
    console.log(email)
   
    const data = await correosServices.CrearCuenta(email);
    
    setMensaje(data.message);
    openMdlMensaje();
   
    
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

  return (
    <>
    <div id="rccuerpo1">
      <div>
        <div>
           <h1 style={{ 
            marginBottom: "25px",
            color: "#0277bd",
            fontFamily: "Roboto",
            fontSize: "30px"
          }}>
        Registrar CONSULTORIO - Paso 1</h1>
        </div>

        <div>
          <h5 className="rccuerpo-h5">
            <span className="bolded">¿Cómo crear una cuenta en el Portal?</span>{" "}
          </h5>
          <br />
          <h5 className="rccuerpo-h5">
            {" "}
            1.- Ingresar el mail que identifica a la Clinica o Consultorio.
          </h5>

          <h5 className="rccuerpo-h5"> 2.- Tildar el captcha</h5>
          <h5 className="rccuerpo-h5">
            {" "}
            3.- Hacer click en el botón CREAR CUENTA.
          </h5>
          <br />
          <h5 className="rccuerpo-h5">
            {" "}
            <span className="bolded">
              ¿Qué hacer si se bloquea tu cuenta?
            </span>{" "}
          </h5>

          <h5 className="rccuerpo-h5">
            <span className="bolded">Opción 1:</span> aguardá 3hs hasta que se
            desbloquee e ingresá nuevamente con tu clave registrada.
          </h5>

          <h5 className="rccuerpo-h5">
            <span className="bolded">Opción 2:</span> restablecé tu clave
            ingresando al e-mail de aviso que recibiste en tu correo.
          </h5>
        </div>
        <br />
        <div>
          <InputGroup className="mb-3">
        <InputGroup.Text>Ingresar mail</InputGroup.Text>
        <Form.Control
          placeholder="Ingrese su mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            
            <InputGroup className="mb-3 justify-content-center">
              <InputGroup.Text style={{ textAlign: "center" }}>
                <a href="/Login">Volver al login</a>
              </InputGroup.Text>
            </InputGroup>
          </div>

           <div className="volverallogin1">
             <Button onClick={handleSubmit}>Crear cuenta</Button>
            {/* <InputGroup className="mb-3" style={{ textAlign: "center" }}>
              <InputGroup.Text >
                <a href="/configuracion">Crear cuenta</a>
              </InputGroup.Text>
            </InputGroup> */}
          </div>
          {/* <div className="volverallogin2">
            <Button
              variant="outline-primary"
              size="lm"
              style={{ marginLeft: "40px" }}
            >
              
              Crear cuenta
            </Button>
          </div> */}
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
