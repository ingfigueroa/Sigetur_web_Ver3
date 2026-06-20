import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { turnosService } from "/src/services/turnos.service";
import { listadeesperaService } from "/src/services/listadeespera.service";
import { obrassocialesService } from "/src/services/obrassociales.service";

import "/src/css/personalizar-modales.css";
import AbrirMDLMensaje from "../modales/MdlMensaje";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

import {formatearFecha, ajustarHoraArgentina, formatearFechaLargaConelAnio_llegafechalarga_Ver1 } from "../../components/utils/fecha";
import { correosServices } from "../../services/correos.service";

const asignarTurnoListadeEsperaDesdePizarra = ({
  show,
  handleClose,
  idprofesional,
  apeynomprofesional,
  idcliente,
  idusuario,
  clinica
}) => {


    const [Items, setItems] = useState(null);
 
    const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
      "¿Está seguro de ASIGNAR el PACIENTE  de la LISTA DE ESPERA al TURNO?"
    );
  
    const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
      "LISTA DE ESPERA - ASIGNAR un TURNO"
    );

  const [idTurno, setIDTurno] = useState(0);

  const [observaciones, setObservaciones] = useState("");
  const [showMDLMensaje, setShowMDLMensaje] = useState("");

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [osPorPaciente, setOsPorPaciente] = useState([]);
  const [idObraSocialPacienteSelected, setIdObraSocialPacienteSelected] =
    useState(0);

    const [idPaciente, setIDPaciente] = useState(0);
    const [idListaEspera, setIDListaEspera] = useState(0);

    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);



     const [RegistrosTotal, setRegistrosTotal] = useState(0);
      const [Pagina, setPagina] = useState(1);
      const [Paginas, setPaginas] = useState([]);
      const [CantidaddeRegistros, setCantidaddeRegistros] = useState(10);

      const [apeyNomPaciente, setapeyNomPaciente] = useState("");
      const [apeyNomProfesional, setapeyNomProfesional] = useState("");
      const [servicioProfesional, setServicioProfesional] = useState("");
      const [fechaTurno, setFechaTurno] = useState("");
      const [horaTurno, setHoraTurno] = useState("");
      const [estadoTurno, setEstadoTurno] = useState("");

  

  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };

  const closeMdlMensaje = () => {
    setShowMDLMensaje(false);
    handleClose();
    
    
  };

  
  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
    setShowMDLMensaje(true)
  };
      const enviarRecordatoriosxMail = async () => {
      try {
        await correosServices.EnviarRecordatoriosxMail(Turnos, apeynomprofesional, clinica);

        setMensaje("Recordatorios enviados correctamente.");
        setShowMDLMensaje(true);

      } catch (error) {
        console.error(error);
      }
    };

const verificarGrabar = () => {
  

  const validar = validarDatosParaAlta(
    idListaEspera,
    idTurno,
    idPaciente,
    idObraSocialPacienteSelected
  );

  

  if (validar) {
  
    openMdlEstaSeguro();
  } else {
  
    setMensaje("Faltan datos para poder definir el alta de turno.");
    setShowMDLMensaje(true);
  }
};
  
  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar
     Grabar()
     
    } else {
      console.log("Usuario canceló la operación");
    }
  };

 async function BuscarosPorPaciente(idcliente, idpaciente) {
    try {
      const data = await obrassocialesService.BuscarOSPorPaciente(idcliente, idpaciente); // Llama a la función asíncrona
      setOsPorPaciente(data); // Establece el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

    const cargarlistadeespera = async () => {
      try {
        const data = await listadeesperaService.getBuscar(
          Pagina,
          CantidaddeRegistros,
          apeyNomPaciente,
          apeynomprofesional,
          idcliente
        );
  
        setItems(data.registros);
  
        setRegistrosTotal(data.total);
  
        // Generar array de páginas para el paginador
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.total / CantidaddeRegistros); i++) {
          arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
  
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  function validarDatosParaAlta(
    vidListaEspera,
    vidturno,
    vidpaciente,
    vidObraSocialPacienteSelected
  ) {

      if (vidListaEspera <= 0) return false;
      if (vidturno <= 0) return false;
      if (vidpaciente <= 0) return false;
      if (vidObraSocialPacienteSelected <= 0) return false;

      return true;
  }

  async function Grabar() {
      
       await listadeesperaService.AsignarTurnoListaDeEspera(
            idListaEspera,
            idTurno,
            idPaciente,
            idObraSocialPacienteSelected,
            observaciones,
            idusuario
          );

          setMensaje("Turno asignado con éxito.");
          setShowMDLMensaje(true);
      
  }

  const estiloInputGroup = {
    backgroundColor: "#679bb9",
    width: "20%",
    color: "white",
    height: "25px",
  };

  const estiloFormControl = {
    fontSize: "20px",
    resize: "none",
    height: "25px",
    
    textAlign: "center",
  };

  const estiloFormSelect = {
    fontSize: "15px",

    height: "25px",
    fontWeight: "bold",
    textAlign: "center",
    width: "55%",
  };

  async function BuscarTurno() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setIDTurno(clipboardText);

      const varIDTurno = clipboardText;
    
      
      // Validación: vacío o no numérico
      if (
        !varIDTurno ||
        isNaN(varIDTurno) ||
        !Number.isInteger(Number(varIDTurno))
      ) {
        setMensaje(
          "El contenido del portapapeles no es un ID válido de turno."
        );
        setShowMDLMensaje(true);
        return;
      }

      const data = await turnosService.TurnoLibreID(varIDTurno);


      // Validar si el servicio devolvió algo útil
      if (!data) {
        setMensaje("No se encontró ningún turno con el ID proporcionado.");
        setShowMDLMensaje(true);
        return;
      }


      if (idprofesional !== data.idprofesional) {
        setMensaje(
          "El profesional del turno elegido, no es el mismo que eligió el paciente."
        );
        setShowMDLMensaje(true);
        return;
      }

      setapeyNomProfesional(data.profesional)
      setServicioProfesional(data.servicio)
      setFechaTurno(data.fecha)
      setHoraTurno(data.hora)
      setEstadoTurno(data.estado)

      //setItems(data);


    } catch (error) {
      console.error(error);
      setMensaje("Error al obtener detalles del turno.");
      setShowMDLMensaje(true);
    }
  }

  const CargarPacienteElegido = (paciente, idpaciente) => {
    setapeyNomPaciente(paciente)
    BuscarosPorPaciente(idcliente, idpaciente)

  }

  const seleccionarPaciente = (item) => {
  setIDListaEspera(item.IDListaEspera)
  setPacienteSeleccionado(item.idpaciente);
  setIDPaciente(item.idpaciente)
  CargarPacienteElegido(item.paciente, item.idpaciente);
};



    // Llamás a la función dentro del useEffect
    useEffect(() => {
      cargarlistadeespera();
    }, []);

    useEffect(() => {
  if (osPorPaciente.length > 0) {
    setIdObraSocialPacienteSelected(osPorPaciente[0].id);
  }
}, [osPorPaciente]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        dialogClassName="personalizar-modales"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#044f82",
            color: "white",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <Modal.Title>LISTA DE ESPERA - ASIGNAR UN TURNO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <div className="">
                       <Button variant="secondary" 
               style={{
                       height: "30px", // más alto
                       fontSize: "16px", // texto más grande
                       padding: "0px 20px", // más espacio interno
                       whiteSpace: "nowrap",
                      
                       marginBottom: "10px"
                       
                     }}>
              Pacientes en lista de espera
            </Button>
          <Table bordered hover>
            <thead style={{
                    textAlign: "center",
                    backgroundColor: "rgb(136, 161, 184)",
                    fontSize: "12px",
                  }}>
              <tr className="personalizarfila h-25">
                <th
                  
                >
                  ID
                </th>
                <th
                 
                >
                  Paciente
                </th>

                <th
                  style={{
                 
                    width: "10%",
                  }}
                >
                  Fecha desde
                </th>

                <th
                  style={{
                  
                    width: "10%",
                  }}
                >
                  Fecha hasta
                </th>


                <th
               
                >
                  Hora desde
                </th>
                <th
                 
                >
                  Hora hasta
                </th>

                <th
                  
                >
                  Acciones
                </th>
                <th
                  style={{display: "none"}}
                >
                  ID Paciente
                </th>
              </tr>
            </thead>
<tbody>
  {Items && Items.length > 0 ? (
    Items.map((Item) => (
      <tr key={Item.IDListaEspera}>
        <td style={{ textAlign: "center", fontSize: "12px"  }}>
          {Item.IDListaEspera}
        </td>
        <td style={{ textAlign: "center", fontSize: "12px" }}>
          {Item.paciente}
        </td>
        <td style={{ textAlign: "center", fontSize: "12px" }}>
          {formatearFecha(Item.FechaDesde)}
        </td>
        <td style={{ textAlign: "center", fontSize: "12px" }}>
          {formatearFecha(Item.FechaHasta)}
        </td>
        <td style={{ textAlign: "center",  fontSize: "12px" }}>
          {ajustarHoraArgentina(Item.horadesde)}
        </td>
        <td style={{ textAlign: "center",  fontSize: "12px" }}>
          {ajustarHoraArgentina(Item.horahasta)}
        </td>
        <td style={{ textAlign: "center" }}>
          {/* botones */}
<Button
  variant={
    pacienteSeleccionado === Item.idpaciente
      ? "warning"
      : "outline-success"
  }
  size="sm"
  style={{ width: "60%" }}
  onClick={() => seleccionarPaciente(Item)}
>
  {pacienteSeleccionado === Item.idpaciente
    ? "Seleccionado"
    : "Seleccionar"}
</Button>
        </td>
        <td style={{ textAlign: "center", fontSize: "12px", display: "none"  }}>
          {Item.idpaciente}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="7"
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#666",
        }}
      >
        No hay registros para mostrar
      </td>
    </tr>
  )}
</tbody>
          </Table>
           {/* Paginador*/}
        <div className="paginador">
          <div className="row">
            <div className="col">
              <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
              Pagina: &nbsp;
              <select
                value={Pagina}
                onChange={(e) => {
                  Buscar(e.target.value);
                }}
              >
                {Paginas?.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; de {Paginas?.length}
            </div>

            <div className="col">
              Mostrar de a: &nbsp;
              <select
                value={CantidaddeRegistros}
                onChange={(e) => {
                  setCantidaddeRegistros(e.target.value);
                }}
              >
                {[10, 15, 20, 25].map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; registros.
            </div>
          </div>
        </div>
        </div>
        <hr />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
         >
          <div
    style={{
     flex: "1 1 400px",
      paddingRight: "20px",
      borderRight: "2px solid #dcdcdc",
    }}
  >
          <Button variant="secondary" 
               style={{
                       height: "30px", // más alto
                       fontSize: "16px", // texto más grande
                       padding: "0px 20px", // más espacio interno
                       whiteSpace: "nowrap",
                       width: "100%",
                       marginBottom: "10px"
                       
                     }}>
              Paciente elegido de la lista de espera
            </Button>
            
            <InputGroup className="mb-3">
              <InputGroup.Text style={estiloInputGroup}>
                Paciente:
              </InputGroup.Text>

              <Form.Control
                readOnly
                style={estiloFormControl}
                value={apeyNomPaciente || "sin dato"}
              />
            </InputGroup>

            <div
              style={{
                backgroundColor: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
             {/*  <InputGroup className="mb-3">
                <InputGroup.Text style={estiloInputGroup}>
                  DNI:
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  style={estiloFormControl}
                  value={handleFechaChange(Items?.dni) || "sin dato"}
                />
              </InputGroup> */}
              <InputGroup className="mb-3">
                <InputGroup.Text
                  style={{
                    backgroundColor: "#679bb9",
                    width: "45%",
                    color: "white",
                    height: "25px",
                  }}
                >
                  Elegir obra social del paciente:
                </InputGroup.Text>
<select
  style={estiloFormSelect}
  onChange={(e) =>
    setIdObraSocialPacienteSelected(e.target.value)
  }
  value={idObraSocialPacienteSelected}
>
  <option value="" disabled>
    Seleccionar
  </option>

  {osPorPaciente.map((os) => (
    <option key={os.id} value={os.id}>
      {os.Descripcion}
    </option>
  ))}
</select>
              </InputGroup>
              
            </div>
          </div>

               <div style={{
            flex: "1 1 400px",
          }}>
              <Button variant="primary" 
               style={{
                       height: "30px", // más alto
                       fontSize: "16px", // texto más grande
                       padding: "0px 20px", // más espacio interno
                       whiteSpace: "nowrap",
                       width: "100%",
                       marginBottom: "10px"
                       
                     }}
                     onClick={BuscarTurno}
                     >
              Traer datos del turno
            </Button>
            
            <InputGroup className="mb-3">
              <InputGroup.Text style={estiloInputGroup}>
                Profesional:
              </InputGroup.Text>

              <Form.Control
                readOnly
                style={estiloFormControl}
                value={ apeyNomProfesional || "sin dato"}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text style={estiloInputGroup}>
                Servicio:
              </InputGroup.Text>

              <Form.Control
                readOnly
                style={estiloFormControl}
                value={(servicioProfesional || "sin dato").trim()}
              />
            </InputGroup>
            <div
              style={{
                backgroundColor: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text style={estiloInputGroup}>
                  Fecha:
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  style={estiloFormControl}
                  value={formatearFechaLargaConelAnio_llegafechalarga_Ver1(fechaTurno) || "sin dato"}
                />
              </InputGroup>
              
              <InputGroup className="mb-3">
                <InputGroup.Text style={estiloInputGroup}>
                  Hora:
                </InputGroup.Text>
                <Form.Control
                  readOnly
                  rows={1}
                  style={estiloFormControl}
                  value={horaTurno || "sin dato"}
                />
                <InputGroup.Text style={estiloInputGroup}>
                  Estado:
                </InputGroup.Text>

                <Form.Control
                  readOnly
                  style={estiloFormControl}
                  value={estadoTurno || "sin estado"}
                />
              </InputGroup>
            </div>
          </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
             <Button variant="secondary" 
               style={{
                       height: "30px", // más alto
                       fontSize: "16px", // texto más grande
                       padding: "0px 20px", // más espacio interno
                       whiteSpace: "nowrap",
                      
                       marginBottom: "10px"
                       
                     }}>
              Ingresar observaciones sobre el turno
            </Button>
            
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="3"
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  height: "50px",
                }}
                onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
              />
            </InputGroup>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={verificarGrabar}>
              Grabar
            </Button>
            <Button variant="primary"  style={{ marginLeft: "10px" }} >
              Limpiar
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cerrar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {showMDLMensaje && (
        <AbrirMDLMensaje
          show={openMdlMensaje}
          handleClose={closeMdlMensaje}
          modalMessage={mensaje}
        />
      )}

      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo={mdlMensajeCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}
    </>
  );
};

export default asignarTurnoListadeEsperaDesdePizarra;
