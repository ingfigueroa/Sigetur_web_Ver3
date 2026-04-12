import React, {useState, useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";



import "/src/css/registrarconsultorio.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {clientesServices} from "../../services/clientes.service";


import AbrirMDLMensaje from "../modales/mdlMensaje";



function RegistrarClientePasoDos() {

  const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [codigo, setCodigo] = useState("");

   const [searchParams] = useSearchParams();

 
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
  try {
    
    console.log(email + codigo)
    const data = await clientesServices.getValidarCodigoEmail(email, codigo);

  
    if (data === 0){
      setMensaje("No se encontró el código, vuelva a empezar el proceso de creación de cuenta.")
      openMdlMensaje();
    }else if (data > 0) {
      setMensaje("La validación del código y el email ha sido confirmada.");
      openMdlMensaje();

      
      setTimeout(() => {
        navigate("/registrarconsultorio", {
          state: { email: email }
        });
      }, 2000);
    }
     
   
    
  } catch (error) {
    alert("Error al enviar el mail");
  }
}; 

useEffect(() => {
    const cod = searchParams.get("codigo");

    if (cod) {
      setCodigo(cod);
    }
      
  }, []);

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
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }}>
          <a href="/" >
            <img style= {{marginBottom: "20px"}} src="./assets/Logo_2022_resolucion.jpg" alt="" />
          </a>
          <h3>Sistema de Gestión de Turnos para profesionales de la salud</h3>
        </div>
      <div>
        <div>
           <h1 style={{ 
        marginBottom: "25px",
        color: "#0277bd",
        fontFamily: "Roboto",
        fontSize: "30px"
      }}>Registrar CONSULTORIO - Paso 2</h1>
        </div>

        <div>
          <h5 className="rccuerpo-h5">
            <span className="bolded">Para válidar el código tiene que volver a ingresar el correo electrónico.</span>{" "}
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
       
        </div>
        <br />
        <div>
          <InputGroup className="mb-3">
        <InputGroup.Text>Código:</InputGroup.Text>
        <Form.Control
          style={{fontSize:"40px", textAlign: "center"}}
          placeholder="código"
          value={codigo}
          readOnly
         
        />

       
      </InputGroup>
       <InputGroup className="mb-3">
   

        <InputGroup.Text>Correo electrónico:</InputGroup.Text>
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
             <Button onClick={handleSubmit}>Válidar código</Button>
            
            
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


export default RegistrarClientePasoDos;
