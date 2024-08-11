import react, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const mdlaltaturno = ({ show, handleClose }) => {
  const [selectedValue, setSelectedValue] = useState(""); // Estado para almacenar el valor seleccionado del dropdown


  const handleDropdownChange = (eventKey) => {
    setSelectedValue(eventKey); // Actualizar el valor seleccionado en el estado
    
  }

  // Función para manejar el cambio en el input de texto
 
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0277bd", color: "white" }}
      >
        <Modal.Title>REGISTRAR TURNO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <InputGroup.Text style={{ backgroundColor: "#d0d3d4" }}>
              <h5>BUSCAR PACIENTE POR DNI</h5>
            </InputGroup.Text>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
               
              >
                DNI
              </InputGroup.Text>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon1"
                style={{ backgroundColor: "#679bb9" }}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
                
              >
                Paciente
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
                readOnly
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <DropdownButton
                id="dropdown-basic-button"
                title="Elegir la obra social"

                onSelect={handleDropdownChange}
              >
               
                <Dropdown.Item eventKey="PARTICULAR">PARTICULAR</Dropdown.Item>
                <Dropdown.Item eventKey="DASPU">DASPU</Dropdown.Item>
                <Dropdown.Item eventKey={"DASUTEN"}>DASUTEN</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                type="text"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
                value={selectedValue} 
                
                readOnly
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Observaciones
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>

            <InputGroup.Text style={{ backgroundColor: "#8ECEA9" }}>
              <h5>DETALLE DEL TURNO</h5>
            </InputGroup.Text>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Fecha
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value="09/04/2024"
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Hora
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value="08:30"
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Profesional
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value="FIGUEROA, RODOLFO ALFREDO"
                style={{ backgroundColor: "#d5dbdb" }}
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

export default mdlaltaturno;
