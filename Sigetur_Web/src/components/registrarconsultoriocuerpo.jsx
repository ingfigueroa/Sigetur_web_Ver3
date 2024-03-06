import React from "react";
import "../css/registrarconsultorio.css";


function registrarconsultoriocuerpo() {
  return (
    <div id="rccuerpo">
      <div id="rccuerpo1">
        <div>
          <h1>Nueva cuenta</h1>
        </div>

        <div>
          <h5 className="rccuerpo-h5">
            
            <strong>¿Cómo crear una cuenta en el Portal?</strong> <br></br>
            <br />
            1.- Ingresar el mail que identifica a la Clinica o Consultorio.
            <br />
            2.- Tildar el captcha.  <br />
            3.- Hacer click en el botón CREAR CUENTA. <br />
            <br />

            <strong>¿Qué hacer si se bloquea tu cuenta?</strong> <br /> <br />
            Opción 1: aguardá 3hs hasta que se desbloquee e ingresá nuevamente
            con tu clave registrada. Opción 2: restablecé tu clave ingresando al
            e-mail de aviso que recibiste en tu correo.
          </h5>

          <div>
            <Validarmail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default registrarconsultoriocuerpo;
