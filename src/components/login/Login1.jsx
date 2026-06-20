import {React, useState} from "react";

import { useSearchParams, useNavigate } from "react-router-dom";

import "/src/CSS/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { clientesServices } from "/src/services/clientes.service.js";


function Login1() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

 const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
    
  
     const [showMDLMensaje, setShowMDLMensaje] = useState("");

       const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    
    
  };
const handleSubmit = async () => {
  try {


    const response = await clientesServices.getLoginUsuario(usuario,password);
   console.log(response)
    const { isValid, user, token } = response;
 

    if (isValid) {

      // 🔐 guardar token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🚀 navegar
      setTimeout(() => {
        navigate("/sigetur", {
          state: { user }
        });
      }, 500);

    } else {
      setMensaje("Contraseña o usuario incorrecto");
      openMdlMensaje();
    }

  } catch (error) {
    console.log(error);
  }
};
    

  

  return (
    <div id="fondo1">
      <div id="loginform" style={{background:"#e2dede"}}>
        <Form action="">
          <div className="portaldeturnos">
            <a href="/">
              <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
            </a>
          </div>
        
          <Form >
            <Form.Group className="mb-3" 
            >
              <h5>
           Correo eléctronico
              </h5>
              <Form.Control 
              type="email" placeholder="Ingrese su email"
               style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '2px solid blue',
                    borderRadius: '5px'
              }}
              onChange={(e) => setUsuario(e.target.value)}
                    
                    value={usuario}
                     />
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <h5>
                Contraseña
              </h5>
              <Form.Control
               style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '2px solid blue',
                    borderRadius: '5px'
              }}
              type="password" placeholder="Password"
              
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              
              />
            </Form.Group>
            <div >
              <div class="d-grid col-11 " >
             <Button variant="outline-primary"
                  size="lm"
                  
                  style={{marginLeft: "20px"}}
                  onClick={handleSubmit}
              >   Iniciar Sesión  
               </Button>
              </div>
              <div>
                <h6>
            <a href="/emailresetpassword">
              <strong>¿Olvido su contraseña?</strong>
            </a>{" "}
          </h6>
              </div>
            </div>
            
            
          </Form>

         
          <br />
          
            <h4 style={{marginBottom: 0}}>¿NO TIENES UNA CUENTA?</h4>
            <h6 style={{margin: 0}}>
              <a href="/crearcuentapasouno">
                <strong> Registrá tu consultorio o clínica</strong>
              </a>
            </h6>
          
        </Form>
      </div>
      <div id="fondo">
        <h1 classname="">Portal de turnos - Si.Ge.Tur.</h1>
        

        <h2 classname="">
          Administrá los turnos <br></br>de tu consultorio o clínica
        </h2>

        <h4 className="">te ayudamos a GESTIONAR y ORGANIZAR tu consultorio</h4>
        <h4 className="">pacientes / profesionales / turnos </h4>
      </div>
    </div>
    

  );
  {showMDLMensaje && (
            <AbrirMDLMensaje
              show={openMdlMensaje}
              handleClose={closeMdlMensaje}
              modalMessage={mensaje}
            />
          )}
}


export default Login1;
