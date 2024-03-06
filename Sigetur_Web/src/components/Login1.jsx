import React, { Component } from "react";
import "../css/login.css";



function Login1() {
  return (
    <section id="fondo1">
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
          <input
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
      
          <h5>
            ¿NO TIENES UNA CUENTA?
          </h5>
          <h5>
           
              <a href="/Registrarconsultorio">
                Registrá tu consultorio o clínica
              </a>
            
          </h5>
        </div>
      </form>
    </section>
  );
}

export default Login1;
