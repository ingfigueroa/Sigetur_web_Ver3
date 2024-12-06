import react, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { pacientesService } from "/src/services/pacientes.service";
import { obrassocialesService } from "/src/services/obrassociales.service";
import { turnosService } from "../../services/turnos.service";
import MdlAltaExitosa from "../modales/mdlAltaExitosa";
import MdlValidar from "../modales/mdlvalidar";




const MdlAltaTurno = ({ show, handleClose, fila, ApeyNom, FechaTurno, profesion }) => {
 
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [osPorPaciente, setOsPorPaciente] = useState([]);
  const [idPaciente, SetIdPaciente] = useState("");
  const [idTurno, SetIdTurno] = useState("");
  const [idUsuario, SetIdUsuario] = useState("1");
  const [observaciones, SetObservaciones] = useState(null);

  const [VarDNI, setDNI] = useState(null);
  const [Apellido, setApellido] = useState(null);

  const [modalAltaExitosa, setModalAltaExitosa] = useState(false);
  const [mensaje, setMensaje] = useState('');
 

  const [idObraSocialPacienteSelected, setIdObraSocialPacienteSelected] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTituloMessage, setModalTituloMessage] = useState('');


  const showModalMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const closeModalMessage = () => { 
    
    setShowModal(false);
  };
  
  
  const openAltaExitosa = (mensaje) => {
    setModalTituloMessage("REGISTRAR UN TURNO")
    setModalMessage(mensaje);
    setModalAltaExitosa(true);
    
  };

  const closeAltaExitosa = () => {
    setModalAltaExitosa(false);
    handleClose();
    
  };

  async function Buscar() {
    try {
      const data = await pacientesService.Buscar(Apellido, VarDNI);
      // Asignar los valores recibidos a los estados del formulario
      acomodar(data);
      BuscarosPorPaciente(data);
    } catch (error) {
      console.error("Error al buscar paciente:", error);
    }
  }

  function acomodar(Items) {
    if (Items && Items.length > 0) {
      const nombreCompleto = Items.map(
        (Item) => `${Item.Apellido}, ${Item.Nombres}`
      ).join(" ");
      setNombreCompleto(nombreCompleto);
    }
  }

  async function BuscarosPorPaciente(Items) {
    try {
      
      if (Items && Items.length > 0) {
          const idpac = Items[0].ID
          SetIdPaciente(idpac);
          

          const data = await obrassocialesService.BuscarPorPaciente(idpac); // Llama a la función asíncrona
          setOsPorPaciente(data); // Establece el estado con los datos obtenidos
      }   
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

 

  async function Grabar() {
    // agregar o modificar
    //validaciones
    // Validaciones
    if (typeof VarDNI !== 'string' || !VarDNI.trim()) {
      showModalMessage("El campo 'Número de Documento' es obligatorio y debe ser un texto válido");
      return;
    } else if (!nombreCompleto.trim()) {
      showModalMessage("El campo 'Paciente' es obligatorio");
      return;
    } else if (!idObraSocialPacienteSelected) {
      showModalMessage("Debe seleccionar una obra social");
      return;
    }
    try
    {
      SetIdUsuario("1")
      SetIdTurno(fila.idTurno);
     
      

      await turnosService.GrabarTurnoPaciente(  fila.idTurno,
        idPaciente,
        idObraSocialPacienteSelected,
        observaciones,
        idUsuario );
        
        
        openAltaExitosa('Turno registrado exitosamente al paciente: ' + nombreCompleto); 
  
     
    }

    catch (error)
    {
     
     
      openAltaExitosa('Turno no registrado exitosamente'); 
     /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      return;
    }
  }

  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg">
      
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#1e8449", color: "white" }}
      >
        <Modal.Title>TURNO - REGISTRAR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <InputGroup.Text style={{ backgroundColor: "#b0c4de", color: "black" }}>
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
                onChange={(e) => setDNI(e.target.value)}
                value={VarDNI}

              
              />
              <Button
                variant="outline-secondary"
                id="button-addon1"
                style={{ backgroundColor: "#679bb9" }}
                onClick={() => Buscar() }
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
                value={nombreCompleto}

              />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Obra social
              </InputGroup.Text>
            <select 
              style={{ width: "60%" }}
              onChange={(e) =>setIdObraSocialPacienteSelected(e.target.value)}
              value={idObraSocialPacienteSelected}
             
              >
                 <option value="" disabled>Seleccionar </option>
                 {osPorPaciente.map(os => (
                <option key={os.id} value={os.id}>
                    {os.Descripcion}
                </option>
                
            ))}
                
           </select>
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
                onChange={(e) =>SetObservaciones(e.target.value.toUpperCase())}
                value={observaciones}
              />
            </InputGroup>

            <InputGroup.Text style={{ backgroundColor: "#b0c4de", color: "black" }}>
              <h5>DETALLE DEL TURNO</h5>
            </InputGroup.Text>
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
               Fecha:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={FechaTurno}
                style={{ backgroundColor: "#d5dbdb" }}
              />
              <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
               Hora:
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value= {fila.desde}
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
                value= {ApeyNom}
                style={{ backgroundColor: "#d5dbdb" }}
              />
               <InputGroup.Text
                style={{ backgroundColor: "#679bb9", color: "white" }}
              >
                Profesión
              </InputGroup.Text>

              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value= {profesion}
                style={{ backgroundColor: "#d5dbdb" }}
              />
            </InputGroup>
          </div>
        </div>

        

      </Modal.Body>
      <Modal.Footer>
     
      <Button variant="success" 
        onClick={() => Grabar() }
        >
         Aplicar
       </Button>
       <Button variant="primary" onClick={handleClose}>
         Cerrar
       </Button>
     
     </Modal.Footer>
     
    </Modal>

    <MdlAltaExitosa
              show={modalAltaExitosa}
              handleClose={closeAltaExitosa}
              varMensaje={modalMessage}
              varMensajeTitulo={modalTituloMessage}
        />
       
        <MdlValidar 
            show = {showModal}
            handleClose ={closeModalMessage}
            modalMessage = {modalMessage}
            
         />

         
      
    </>
  );
  
};

export default MdlAltaTurno;
