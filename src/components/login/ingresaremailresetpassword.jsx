import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import "/src/css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {loginService} from "../../services/login.service";

import AbrirMDLMensaje from "../modales/mdlMensaje";



function ingresarEmailResetPassword() {

     const navigate = useNavigate();

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
   
    const data = await loginService.tokenResetPassword(email);

    if (data){
    
    setMensaje("Se envió el token al correo electrónico ingresado. Chequee y use el enlace.");
    openMdlMensaje();

          setTimeout(() => {
              navigate("/login", {
                
              });
            }, 5000);
    

          } else {
              setMensaje("Hubo un error y no se pudo enviar el token por correo.");
              openMdlMensaje();
                     setTimeout(() => {
              navigate("/login", {
                
              });
            }, 2000);
    
          }   

            
  } catch (error) {
    console.log(error)
  if (error.response) { 
    console.log(error)
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
      <div className="fondoprincipal">
       <div style={{
              width: "100%",
              height: "65px",
              backgroundColor: "#1565c0",
              display: "flex",
              alignItems: "center",
              padding: "0 0px",
              color: "white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1000
            }}>
            <a href="/" >
            <img style= {{marginBottom: "20px"}} src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>
          <h3>Sistema de Gestión de Turnos para profesionales de la salud</h3>
        </div>
      <div > 
       <div >
          <h1 style={{ 
            marginBottom: "25px",
            color: "#0277bd",
            fontFamily: "Roboto",
            fontSize: "30px"
          }}>ACTUALIZAR CONTRASEÑA</h1>

          
          <br />
          <h5 className="rccuerpo-h5">
            {" "}
            1.- Ingresar el mail que identifica al usuario.
          </h5>

          <h5 className="rccuerpo-h5"> 2.- Tildar el captcha</h5>
          <h5 className="rccuerpo-h5">
            {" "}
            3.- Hacer click en el botón ENVIAR CODIGO.
          </h5>
          <br />
         
        
          <InputGroup className="mb-3">
        <InputGroup.Text>Ingresar mail</InputGroup.Text>
        <Form.Control
          placeholder="Ingrese su mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
        </div>
         
   

        <div className="volverallogin">
          
          <div className="volverallogin1">
            
          
            <InputGroup className="mb-3 justify-content-center">
              <InputGroup.Text style={{ textAlign: "center" }}>
                <a href="/Login">Volver al login</a>
              </InputGroup.Text>
            </InputGroup>
          </div>

           <div className="volverallogin1">
             <Button onClick={handleSubmit}>Enviar código</Button>
            
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

export default ingresarEmailResetPassword;
