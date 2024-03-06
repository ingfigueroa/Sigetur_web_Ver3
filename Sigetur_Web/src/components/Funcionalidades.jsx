import React, {Component} from 'react'

import '../css/acordeon.css';
import { Accordion } from 'react-bootstrap';

export default class Funcionalidades extends Component {
  render() {
    return (
    <Accordion id="acordeon" defaultActiveKey="" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header >Organizar TURNOS</Accordion.Header>
        <Accordion.Body>
        El manejo de PIZARRA de TURNO por PROFESIONAL, tiene como 
características tener organizado los turnos por hora y con el intervalo definido previamente

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" height="50px">
        <Accordion.Header>Enviar CORREOS a PACIENTES</Accordion.Header>
        <Accordion.Body>
          Enviar CORREOS a PACIENTES es una característica orientada a la interacción PACIENTE-CONSULTORIO.
          Tenemos distintas opciones de envío de correo electrónico, entre otras:  
            Recordar un turno, recordar el turno a todos los pacientes del día por profesional, enviar correo solo de información a un paciente.

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Manejar LISTA de ESPERA</Accordion.Header>
        <Accordion.Body>
        MANEJAR LISTA de ESPERA para ocupar turnos futuros que se pueden desocupar de un PROFESIONAL, es una funcionalidad que permite al consultorio avisar a los PACIENTES cuando en un TURNO queda en estado AUSENTE CON AVISO.

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Registrar COBRO de un TURNO</Accordion.Header>
        <Accordion.Body>
        REGISTRAR COBRO de un TURNO, permite al CONSULTORIO asentar el cobró del TURNO de un PACIENTE.
 Esta característica tiene tres formas de COBRAR el TURNO: debito, crédito y efectivo o contado.


        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Registrar FOTOS/RADIOGRAFIAS</Accordion.Header>
        <Accordion.Body>
        Las FOTOS-RADIOGRAFIAS es una característica o funcionalidad que permite al PROFESIONAL registrar en el TURNO del PACIENTE los distintos tipos de RADIOGRAFIAS que se pueden observar en el cuerpo humano. 
Además, se pueden registrar de una resonancia magnética o una tomografía computada ya digitalizada.


        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Registrar un PRESUPUESTO</Accordion.Header>
        <Accordion.Body>
        El registro de PRESUPUESTO para tratamientos largos (prestaciones a realizar en un PACIENTE), es una funcionalidad que permite definir el monto, el momento y la cantidad de cuotas del PRESUPUESTO.
El CONSULTORIO llevará un control sobre las cuotas cobradas y como fueron cobradas, y las cuotas a cobrarse.



        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

}