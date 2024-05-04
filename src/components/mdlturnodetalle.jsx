import react from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';

const mdlturnodetalle = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1e8449", color: "white" }}
      >
        <Modal.Title>DETALLE DEL TURNO</Modal.Title>

        
      </Modal.Header>
      <Modal.Body>
        
        <div>
          <div style={{backgroundColor: 'white', textAlign: 'right'}}>
          <Button variant="outline-secondary" id="button-addon1"
              style={{marginRight: '5px'}}
            >
            <i class="fa-regular fa-envelope"></i>
              </Button>
              
              <Button 
              style={{marginRight: '5px'}}
              variant="outline-secondary" id="button-addon1"
              
            >
            VerRx
              </Button>
              <Button 
              style={{marginRight: '5px'}}
              variant="outline-secondary" id="button-addon1"
              
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              </Button>

          </div>
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
                value="PRESENTE NO COBRADO"
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
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default mdlturnodetalle;