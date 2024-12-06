import {useState} from "react";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const mdlCambiarEstado = ({show, handleClose, enviarAlPadre, fila}) => {

  const [observaciones, SetObservaciones] = useState(null);
  const fechaLarga = format(new Date(fila.fecha), "EEEE, d 'de' MMMM 'de' yyyy", {locale: es});

  const seleccionarSi = () => {
    enviarAlPadre(observaciones);
    handleClose() // Envía el id al componente padre
  };
  
 
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{backgroundColor: "#1e8449", color: "white" }}
      >
        <Modal.Title>TURNO - CAMBIAR A PRESENTE</Modal.Title>

        
      </Modal.Header>
      <Modal.Body>
        
        <div>
         
          <div>
            <h1> </h1>
          </div>
          <div>
          <InputGroup className="mb-3">
            <InputGroup.Text  style={{backgroundColor: '#b0c4de', color: 'black'}}>

            ¿Realmente quiere DAR el PRESENTE del paciente en el turno con el siguiente detalle?
            
            </InputGroup.Text>
          
          
           
             
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Estado:</InputGroup.Text>
            <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{backgroundColor:'#d5dbdb'}}
                value={fila.estado}
              />
          
           
             
            </InputGroup>
            <InputGroup className="mb-3">
          
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Fecha:</InputGroup.Text>
             
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fechaLarga}
                style={{backgroundColor:'#d5dbdb'}}
              />
               <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Hora:</InputGroup.Text>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={fila.desde}
                style={{backgroundColor:'#d5dbdb'}}
              />
             
            </InputGroup>

            <InputGroup className="mb-3">
          
          <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Paciente:</InputGroup.Text>
           
            <Form.Control 
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              value={fila.apeNom}
              style={{backgroundColor:'#d5dbdb'}}
            />
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Obra social:</InputGroup.Text>
           
           <Form.Control 
             aria-label="Example text with button addon"
             aria-describedby="basic-addon1"
             value={fila.os}
             style={{backgroundColor:'#d5dbdb'}}
           />
          
           
          </InputGroup>

          
           
         
            <InputGroup>
            
            <InputGroup.Text style={{backgroundColor: '#679bb9', color: 'white'}}>Profesional:</InputGroup.Text>
             
             <Form.Control
               aria-label="Example text with button addon"
               aria-describedby="basic-addon1"
               value={fila.ApeNomProfe}
               style={{backgroundColor:'#d5dbdb'}}
             />
             <InputGroup.Text style={{backgroundColor: '#679bb9', color: 'white'}}>Servicio:</InputGroup.Text>
             
             <Form.Control
               aria-label="Example text with button addon"
               aria-describedby="basic-addon1"
               value={fila.servicio}
               style={{backgroundColor:'#d5dbdb'}}
             />
             
            </InputGroup>
          </div>
        
        </div>
        <hr />
        <div>
            <InputGroup>
            <InputGroup.Text
               style={{backgroundColor: '#b0c4de', color: 'black'}}
            >
              ¿Desea agregar un comentario u observación?
            </InputGroup.Text>
            <Form.Control as="textarea" aria-label="With textarea" 
            onChange={(e) =>SetObservaciones(e.target.value.toUpperCase())}
              value={observaciones}
            />
          </InputGroup>

        </div>
      </Modal.Body>
      <Modal.Footer>
     
     <Button variant="success" onClick={seleccionarSi}>
         Aplicar
       </Button>
       <Button variant="primary" onClick={handleClose}>
         Cerrar
       </Button>
     
     </Modal.Footer>
       
      </Modal>
  );
}; 

export default mdlCambiarEstado;
