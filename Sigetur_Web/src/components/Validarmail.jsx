import React, { Component } from "react";

import "../css/registrarconsultorio.css";

export class Validarmail extends Component {
  static propTypes = {};

  render() {


    return (

      <div className="volverallogin">
        <div>
          <input
            className="input"
            type="email"
            id="nuevacuenta"
            name="ingresarmail"
            value="Ingresar correo electrónico"
            textAlign="right"
            placeholder="Ingresar correo electrónico"
            border="none"
          />
          
          <h1></h1>
        </div>
        <div>
         
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
    );
  }
}

export default Validarmail;
