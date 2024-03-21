import React from "react";
import "../css/registrarconsultorio.css";

function registrarconsultoriocuerpo() {
  return (
    <div id="rccuerpo1">
      
      <div>
        <div>
          <h1>Nueva Cuenta</h1>
        </div>

        <div>
          <h5 className="rccuerpo-h5"><span className="bolded">¿Cómo crear una cuenta en el Portal?</span> </h5>
            <br />
            <h5 className="rccuerpo-h5"> 1.- Ingresar el mail que identifica a la Clinica o Consultorio.</h5>
           
            <h5 className="rccuerpo-h5"> 2.- Tildar el captcha</h5>
            <h5 className="rccuerpo-h5"> 3.- Hacer click en el botón CREAR CUENTA.</h5>
            <br />
            <h5 className="rccuerpo-h5"> <span className="bolded">¿Qué hacer si se bloquea tu cuenta?</span> </h5>
            
            <h5 className="rccuerpo-h5"><span className="bolded">Opción 1:</span> aguardá 3hs hasta que se desbloquee e ingresá nuevamente con tu clave registrada.</h5>
            

            <h5 className="rccuerpo-h5"><span className="bolded">Opción 2:</span> restablecé tu clave ingresando al e-mail de aviso            que recibiste en tu correo.
          </h5>
        </div>
        <div>
          <input
            className="input"
            type="email"
            placeholder="Ingresar correo electrónico"
          
          />

          
        </div>

        <div className="volverallogin">
          <div className="volverallogin1">
            <h5>
              <a href="/Login">Volver al login</a>
            </h5>
          </div>
          <div className="volverallogin2">
            <button className="buttons">Crear cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default registrarconsultoriocuerpo;
