import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "/src/css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import AbrirMDLMensaje from "../modales/mdlMensaje";
import {loginService} from "../../services/login.service";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 // const [token, setToken] = useState(123456)
  
   const token = searchParams.get("token");

  const [status, setStatus] = useState("invalid");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [idusuario, setIdUsuario] = useState(0);

  const [showMDLMensaje, setShowMDLMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const openMdlMensaje = () => setShowMDLMensaje(true);
  const closeMdlMensaje = () => setShowMDLMensaje(false);

  // 🔐 Validar token al cargar
  useEffect(() => {
     const validar = async () => {

      //valida el token que viene del mail
      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
       
        const response = await loginService.validarTokenResetPassword(token);
   
        const resultado = response;
        console.log(resultado)
        setIdUsuario(resultado);
if (resultado === 0) {
        // ❌ inválido
        setMensaje("El enlace es inválido o ha expirado.");
        openMdlMensaje();
          setTimeout(() => {
              navigate("/login", {
                
              });
            }, 2000);
        
      } else {
        // ✅ válido
          // guardate el email para usarlo después
       // setEmail(data.email);
         
        setStatus("valid");
        return;
        };
       
          
        
      } catch (error) {
       
        setStatus("invalid");
      }
    };
   
    validar();
}, [token]);

const validarPassword = (password, repeatPassword) => {
  if (!password || !repeatPassword) {
    return "Todos los campos son obligatorios";
  }

  if (password !== repeatPassword) {
    return "Las contraseñas no coinciden";
  }

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  // al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    return "Debe contener al menos una letra mayúscula";
  }

  // al menos un número
  if (!/[0-9]/.test(password)) {
    return "Debe contener al menos un número";
  }

  // opcional: carácter especial
  if (!/[!@#$%^&*]/.test(password)) {
    return "Debe contener al menos un carácter especial (!@#$...)";
  }

  return null; // todo OK
};

  // 🔄 Submit nueva contraseña
 const handleSubmit = async () => {



  const error = validarPassword(password, repeatPassword);

  if (error) {
    setMensaje(error);
    openMdlMensaje();
    return;
  }


  try {
    const response = await loginService.updatePassword(password, idusuario);
   
    if (response === 1){

        setMensaje("La contraseña se actualizó correctamente");
            openMdlMensaje();
           setTimeout(() => {
              navigate("/login");
            }, 2000);
    }else{

       setMensaje("La contraseña NO SE ACTUALIZO correctamente");
            openMdlMensaje();
            setTimeout(() => {
              navigate("/");
            }, 2000);

    }

    

  } catch (error) {
    setMensaje("Error al actualizar la contraseña");
    openMdlMensaje();
  }
};

  // 🧠 Estados de pantalla
  if (status === "loading") return <div>Cargando...</div>;

  if (status === "invalid") {
    return (
      <div className="fondoprincipal">
        <h2>El enlace no es válido o expiró</h2>
        <Button onClick={() => navigate("/forgot-password")}>
          Solicitar nuevo enlace
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fondoprincipal">
          <div style={{
                width: "100%",
                height: "65px",
                backgroundColor: "#1565c0",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
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
          <h3 style={{ margin: 0, marginLeft: "15px", fontWeight: "400" }}>Sistema de Gestión de Turnos para profesionales de la salud</h3>
        </div>

<div
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center", // 👈 centra horizontal
    marginTop: "40px"
  }}
>
  <div
    style={{
      width: "60%",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,1,1.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center" // 👈 centra contenido interno
    }}
  >
    <h1
      style={{
        marginBottom: "25px",
        color: "#0277bd",
        fontSize: "30px",
        textAlign: "center" // 👈 centra el texto
      }}
    >
      ACTUALIZAR CONTRASEÑA
    </h1>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
      }}
    >
      <InputGroup style={{ width: "60%" }} className="mb-3">
        <InputGroup.Text>Nueva contraseña:</InputGroup.Text>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <InputGroup style={{ width: "60%" }} className="mb-3">
        <InputGroup.Text>Repetir contraseña:</InputGroup.Text>
        <Form.Control
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </InputGroup>
    </div>

    <div style={{ marginTop: "20px" }}>
      <Button onClick={handleSubmit}>
        Cambiar contraseña
      </Button>
    </div>
  </div>
      </div>
      </div>
      

      {showMDLMensaje && (
        <AbrirMDLMensaje
          show={showMDLMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mensaje}
        />
      )}
    </>
  );
}

export default ResetPassword;