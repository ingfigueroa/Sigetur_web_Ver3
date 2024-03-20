import React from "react";
import "../css/login.css";

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
    </div>
  );
}

export default Login1;
