import React from "react";
import "../css/login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function Login1() {
  return (
    <div id="fondo1">
      <div id="loginform">
        <form action="">
          <div className="portaldeturnos">
            <a href="/">
              <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
            </a>
          </div>
          <h4>
            <strong>Iniciar Sesión</strong>
          </h4>

          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <h5>
                <strong> Correo eléctronico</strong>
              </h5>
              <Form.Control 
              type="email" placeholder="Ingrese su email"
              style={{backgroundColor:'rgb(136, 161, 184)', color:'white'}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <h5>
                <strong>Contraseña</strong>
              </h5>
              <Form.Control
              style={{backgroundColor:'rgb(136, 161, 184)', color:'white'}} 
              type="password" placeholder="Password" />
            </Form.Group>
            
              <Button variant="outline-primary"
                  size="lm"
                  style={{marginLeft:"40px"}}
              >   Ingresar   </Button>
            
          </Form>

          <h6>
            <a href="/">
              <strong>¿Olvido su contraseña?</strong>
            </a>{" "}
          </h6>

          <h4>¿NO TIENES UNA CUENTA?</h4>
          <h6>
            <a href="/Registrarconsultorio">
              <strong> Registrá tu consultorio o clínica</strong>
            </a>
          </h6>
        </form>
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

    /*<div id="fondo1">
      <div id="loginform">
        <form action="">
          <div className="portaldeturnos">
            <a href="/">
              <img src="./assets/Logo_2022_resolucion.jpg" alt="" />
            </a>
          </div>
          <h4>Iniciar Sesión</h4>
          <h5>Correo eléctronico</h5>
         
          <input type="email" />
          <h5>Contraseña</h5>
          <input type="password" />

          <input
            onClick={<pizarradeturnos />}
            className="buttons"
            type="button"
            id="iniciarsesion"
            value="Ingresar"
            textAlign="right"
          />

          <h6>
            <a href="/">¿Olvido su contraseña?</a>{" "}
          </h6>

          <h4>¿NO TIENES UNA CUENTA?</h4>
          <h6>
            <a href="/Registrarconsultorio">
              Registrá tu consultorio o clínica
            </a>
          </h6>
        </form>
      </div>
      <div id="fondo">
        <h1 classname="">Portal de turnos - Si.Ge.Tur.</h1>

        <h2 classname="">
          Administrá los turnos <br></br>de tu consultorio o clínica
        </h2>

        <h4 className="">te ayudamos a GESTIONAR y ORGANIZAR tu consultorio</h4>
        <h4 className="">pacientes / profesionales / turnos </h4>
      </div>
    </div>*/
  );
}

export default Login1;
