import React from "react";
import "../css/login.css";

function Login1() {
  return (
    <div id="fondo1">
      <div id = "loginform">
      <form action="">
        <div id="sigeturportal">
          <h3>Si.Ge.Tur. - Portal de turnos</h3>
        </div>
        <div style={{ marginTop: "45px" }}>
          <h4>Iniciar Sesión</h4>
          <h5>Correo eléctronico</h5>

          <input type="email" />
          <h5>Contraseña</h5>
          <input type="password" />
        </div>

        <div>
          <input onClick={<pizarradeturnos />}
            className="buttons"
            type="button"
            id="iniciarsesion"
            value="Ingresar"
            textAlign="right"
          />
        </div>
        <div>
          <h6>
            <a href="/">¿Olvido su contraseña?</a>{" "}
          </h6>
        </div>

        <div id="fondo2">
          <h5>¿NO TIENES UNA CUENTA?</h5>
          <h5>
            <a href="/Registrarconsultorio">
              Registrá tu consultorio o clínica
            </a>
          </h5>
        </div>
      </form>
      </div>
      <div id="fondo">
        <h1 classname="">Portal de turnos Si.Ge.Tur.</h1>

        <h2 classname="">
          Administrá los turnos <br></br>de tu consultorio o clínica
        </h2>

        <h4 className="">te ayudamos a gestionar y organizar </h4>
        <h4 className=""> los turnos de tu consultorio</h4>
        <h4 className="">pacientes / profesionales / turnos </h4>
      </div>
    </div>
  );
}

export default Login1;
