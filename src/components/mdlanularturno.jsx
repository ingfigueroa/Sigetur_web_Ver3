import react from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';

const mdlanularturno = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#ab0308", color: "white" }}
      >
        <Modal.Title>ANULAR TURNO</Modal.Title>

        
      </Modal.Header>
      <Modal.Body>
        
        <div>
         
          <div>
            <h1> </h1>
          </div>
          <div>
          
            <InputGroup className="mb-3">
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Estado</InputGroup.Text>
            <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{backgroundColor:'#d5dbdb'}}
                value="PEN - PENDIENTE"
              />
          
           
             
            </InputGroup>
            <InputGroup className="mb-3">
          
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Fecha</InputGroup.Text>
             
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value="miércoles 10 de abril de 2024"
                style={{backgroundColor:'#d5dbdb'}}
              />
               <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Hora</InputGroup.Text>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value="14:30"
                style={{backgroundColor:'#d5dbdb'}}
              />
             
            </InputGroup>

            <InputGroup className="mb-3">
          
          <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Paciente</InputGroup.Text>
           
            <Form.Control 
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              value="FIGUEROA, CAROLINA"
              style={{backgroundColor:'#d5dbdb'}}
            />
            <InputGroup.Text style={{ backgroundColor: "#679bb9", color: "white" }}>Obra social</InputGroup.Text>
           
           <Form.Control 
             aria-label="Example text with button addon"
             aria-describedby="basic-addon1"
             value="DASPU"
             style={{backgroundColor:'#d5dbdb'}}
           />
          
           
          </InputGroup>

          
           
         
            <InputGroup>
            
            <InputGroup.Text style={{backgroundColor: '#679bb9', color: 'white'}}>Profesional</InputGroup.Text>
             
             <Form.Control
               aria-label="Example text with button addon"
               aria-describedby="basic-addon1"
               value="FIGUEROA, RODOLFO ALFREDO"
               style={{backgroundColor:'#d5dbdb'}}
             />
             <InputGroup.Text style={{backgroundColor: '#679bb9', color: 'white'}}>Profesión</InputGroup.Text>
             
             <Form.Control
               aria-label="Example text with button addon"
               aria-describedby="basic-addon1"
               value="ODONTOLOGO"
               style={{backgroundColor:'#d5dbdb'}}
             />
             
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
       
        <Button variant="primary" onClick={handleClose}>
          Aplicar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlanularturno;