import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { turnosService } from "/src/services/turnos.service";

const mdlanulartodoslosturnos = ({
  show,
  handleClose,
  fecha,
  idprofesional,
  idusuario
  
}) => {
  const [observaciones, SetObservaciones] = useState(null);

  const [FechaLarga, SetFechaLarga] = useState(null);

  const [mdlSiNo, setModalSiNo] = useState(null);

  
  async function anularTurnos (){

     
   
      const data = await turnosService.TurnosAnularPorPedidoProfesional(
        
        idprofesional,
        observaciones,
        fecha,
        idusuario
      );
    
  

}

  useEffect(() => {
    if (fecha) {
      const fechaISO = fecha;
      const fechaObj = new Date(fechaISO);
      const fechaLocal = new Date(
        fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
      );

      const fechaFormateada = fechaLocal.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      SetFechaLarga(fechaFormateada);
      SetObservaciones("SE ANULAN LOS TURNOS POR PEDIDO DEL PROFESIONAL")
    }
  }, [fecha]);

  return (
    
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#ab0308",
          color: "white",
         
        }}
      >
        <Modal.Title style={{ textAlign: "center" }}>
          ANULAR TODOS LOS TURNOS DEL DÍA
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div>
            <h1> </h1>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ color: "black",width:"10%" }}
              >
                Fecha:
              </InputGroup.Text>
              <InputGroup.Text
                style={{
                  width: "90%",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {FechaLarga}
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{width:"100%", color: "black", textAlign:"center" }}
              >
                Por pedido del profesional se anulan los turnos con la fecha indicada.
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
        <hr />
        <div>
          <InputGroup>
            <InputGroup.Text
              style={{ backgroundColor: "#b0c4de", color: "black" }}
            >
              Observaciones:
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              onChange={(e) => SetObservaciones(e.target.value.toUpperCase())}
              value={observaciones}
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
         variant="success"
         onClick={(event) => {
          event.preventDefault();
            anularTurnos();
            handleClose()
        }}
        
        >Aplicar</Button>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );

};


export default mdlanulartodoslosturnos;
