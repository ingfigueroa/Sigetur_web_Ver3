import React from "react";
import "../css/funcionalidades.css";
import { ListGroup } from "react-bootstrap";

const Funcionalidades1 = () => {
  return (
    <>
      <div id="funcionalidades">
        <div className="dividirdiv">
          <img src="../assets/fondo.jpg" alt="" />

          <div className="dividirdiv1">
            <h6>
            <strong>REGISTRAR PROFESIONALES</strong> <br />
              <br />
              Se va a registrar un profesional para luego poder asignarles días
              y horarios en los que va a atender, entre los datos a registrar
              del profesional tenemos:
            </h6>
            <div>
            <ListGroup >
              <ListGroup.Item as="li">Datos personales</ListGroup.Item>
              <ListGroup.Item as="li">Titulo en la carrera de grado</ListGroup.Item>
              <ListGroup.Item as="li">Matricula</ListGroup.Item>
              
            </ListGroup>
            </div>
           
          </div>
        </div>
        <div className="dividirdiv">
          <div className="dividirdiv1">
          <h6>
          <strong>REGISTRAR PACIENTES</strong> <br />
              <br />
              Se va a registrar un paciente para luego poder darle un turno con un determinado profesional, en un día y horario definido en la atención del profesional, entre los datos a registrar
              del paciente tenemos:
            </h6>
            <div>
            <ListGroup >
              <ListGroup.Item as="li">Apellido y Nombres</ListGroup.Item>
              <ListGroup.Item as="li">Dirección</ListGroup.Item>
              <ListGroup.Item as="li">Correo electrónico</ListGroup.Item>
              <ListGroup.Item as="li">Obra social</ListGroup.Item>
              
            </ListGroup>
            </div>
           
          </div>

          <img src="../assets/rp.webp" alt="" />
        </div>

        <div className="dividirdiv">
          <img src="../assets/pizarradeturnos.png" alt="" />

          <div className="dividirdiv1">
          <h6>
          <strong>PIZARRA DE TURNOS</strong> <br />
              <br />
              La pizarra de turnos nos permite buscar un profesional, definir una fecha y luego definir una hora para registrar el turno:
            </h6>
            <div>
            <ListGroup >
            <ListGroup.Item as="li">Paciente</ListGroup.Item>
              <ListGroup.Item as="li">Profesional</ListGroup.Item>
              <ListGroup.Item as="li">Día y hora</ListGroup.Item>
              <ListGroup.Item as="li">Obra social</ListGroup.Item>
              
            </ListGroup>
            </div>
          </div>
        </div>
        <div>
          <div className="dividirdiv">
            <div className="dividirdiv1">
            <h6>
          <strong>REGISTRAR FOTO-RADIOGRAFIAS</strong> <br />
              <br />
              El sistema proporciona la opciòn de relacionar radiografías con un paciente ya registrado, los pasos a seguir son muy simples:
            </h6>
            <div>
            <ListGroup >
            <ListGroup.Item as="li">Buscar foto-radiografía</ListGroup.Item>
              <ListGroup.Item as="li">Buscar el paciente</ListGroup.Item>
              <ListGroup.Item as="li">Confirmar el proceso</ListGroup.Item>
            
              
            </ListGroup>
            </div>
            </div>
            <img src="../assets/fotoradiografia.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Funcionalidades1;
