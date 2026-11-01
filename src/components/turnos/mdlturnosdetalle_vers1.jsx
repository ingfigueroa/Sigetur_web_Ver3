import React, { useState, useEffect } from "react";






import { Modal, Button, Table, Form, Tabs, Tab, InputGroup} from "react-bootstrap";
import { turnosService } from "/src/services/turnos.service";
import { tiposdeEstudio } from "/src/services/tiposdeestudio.service";

import ModalImagenMedica from "../../components/modales/mdlimagenmedica";

import "/src/css/personalizar-modales.css";

const mdlturnodetalle_Ver1 = ({ show, handleClose, idturno }) => {
  const [FechaLarga, SetFechaLarga] = useState(null);
  const [Items, setItems] = useState({});
  const [prestacionesItems, setPrestacionesItems] = useState([]);
    const [notasClinicas, setNotasClinicas]= useState([]);
    const [archivosMedicos, setArchivosMedicos]= useState([]);

    const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
const [imagenSeleccionada, setImagenSeleccionada] = useState("");
const [cargandoImagen, setCargandoImagen] = useState("");
const [imagenUrl, setImagenUrl] = useState("");



    
  const [sobreTurno, setSobreTurno] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleVerImagen = async (archivo) => {
 
        setImagenSeleccionada(archivo.googledriveid);
        setMostrarModalImagen(true);
        setCargandoImagen(true);
        setImagenUrl(null);

        try {
          const blob = await tiposdeEstudio.getImagenDrive(archivo.googledriveid);

          const url = URL.createObjectURL(blob);
          setImagenUrl(url);
        } catch (error) {
          console.error("Error al obtener la imagen médica:", error);
        } finally {
          setCargandoImagen(false);
        }
      };
  
 useEffect(() => {
  if (!idturno) return;

  async function fetchDataTurno() {
    try {
      setLoading(true);

      const response = await turnosService.TurnoIDDetalle(idturno);
      console.log(response.turno)
      setItems(response.turno);
      setPrestacionesItems(response.prestaciones);
      setNotasClinicas(response.notasclinicas)
      setArchivosMedicos(response.archivosmedicos)
      console.log(response.archivosmedicos)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchDataTurno();
}, [idturno]); useEffect(() => {
    if (Items?.fecha) {
        SetFechaLarga(handleFechaChange(Items.fecha));
        
    }

 
}, [Items]);

  const handleFechaChange = (fecha) => {
    const fechaISO = fecha;

    // Convertir la fecha a objeto Date (sin aplicar ajustes de zona horaria)
    const fechaObj = new Date(fechaISO);

    // Ajustar la fecha al UTC manualmente
    const fechaLocal = new Date(
      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
    );

    // Formatear usando toLocaleString o date-fns como prefieras
    const fechaLarga = fechaLocal.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return fechaLarga;
  };
  if (loading) {
    return ;
  }
  return (
<>
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="personalizar-modales"
      centered
    >
      <Modal.Header
        closeButton 
        style={{
         backgroundColor: "#198754",
          color: "white",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Modal.Title>TURNO - DETALLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div style={{ width: "100%" }}>
        <h3 style={{ fontSize: "25px", color: "#044f82", textAlign: "center" }}>
  {Items?.paciente
    ? `${Items.paciente} - ${Items?.nroDoc}`
    : ""}
</h3>
  
</div>


        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              backgroundColor: "white",
              textAlign: "center",
              width: "50%",
            }}
          >
           
            <h1 style={{ fontSize: "35px", color: "#044f82" }}>
              {Items?.hora || ""}
            </h1>
            <h1 style={{ fontSize: "15px", color: "#044f82" }}>{FechaLarga}</h1>
 <h1
    style={{ fontSize: "30px", color: "#044f82", textAlign: "center" }}
  >
    {Items?.estado || ""}
  </h1>

  {Items?.sobre && (
    <p
      style={{
        fontSize: "20px",
        color: "red",
        textAlign: "center",
        margin: 0
      }}
    >
      SOBRETURNO
    </p>
  )}
            
            
          </div>
          <div
            style={{
              fontSize: "12px",
              textAlign: "left",
              color: "#044f82",
              width: "50%",
              marginTop: "20px",
            }}
          >
            <div style={{ width: "100%", display: "grid" }}>
             

              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Profesional"
                  variant="outline-secondary"
                  style={{ height: "50px" }}
                >
                  <i className="fa-solid fa-user-tie"></i>
                </Button>
                <Form.Control
                  as="textarea"
                  readOnly
                  rows={2}
                  style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "50px",
                    fontWeight: "bold"
                  }}
                  value={
                    Items?.paciente
                      ? `${Items.profesional}\n${Items.servicio}`
                      : ""
                  }
                />
              </InputGroup>

             

              <InputGroup className="mb-3">
                <Button
                  size="sm"
                  title="Obra Social"
                  variant="outline-secondary"
                  style={{ height: "50px" }}
                >
                  <i className="fa-solid fa-house-medical-flag"></i>
                </Button>
                <Form.Control
                  readOnly
                 style={{
                    textAlign: "left",
                    fontSize: "15px",
                    resize: "none",
                    height: "50px",
                    fontWeight: "bold"
                  }}
                  value={Items?.obrasocial || ""}
                />
              </InputGroup>
            </div>
          </div>
        </div>

 <Tabs
    defaultActiveKey="observaciones"
    id="tabs-turno"
    className="mb-3"
    fill
  >

    {/* OBSERVACIONES */}
    <Tab eventKey="observaciones" title="Observaciones">
 <div style={{ width: "100%", marginTop: "0px" }}>
          {/* <h5 className="titulo-seccion-turno">
    <i className="fa-solid fa-list-check me-2"></i>
    Observaciones
  </h5> */}
          <InputGroup className="mb-3">
  <Form.Control
    as="textarea"
    readOnly
    rows={4}
    style={{
      textAlign: "left",
      fontSize: "12px",
      height: "100px",
      resize: "none"
    }}
    value={Items?.observaciones || ""}
  />
</InputGroup>


        </div>
</Tab>

 <Tab eventKey="prestaciones" title="Prestaciones">
  <div className="seccion-tabla-turno">
 {/*  <h5 className="titulo-seccion-turno">
    <i className="fa-solid fa-list-check me-2"></i>
    Prestaciones cargadas
  </h5> */}

  <div className="tabla-turno-contenedor">
    <Table
      responsive
      hover
      size="sm"
      className="tabla-turno mb-0"
    >
      <thead>
        <tr>
          <th className="col-prestacion">Prestación</th>
          <th>Observaciones</th>
          <th className="text-end">Precio</th>
          <th className="text-end">Paciente</th>
          <th className="text-end">Obra social</th>
        </tr>
      </thead>

      <tbody>
        {prestacionesItems?.length > 0 ? (
          prestacionesItems.map((item, index) => (
            <tr key={item.id ?? index}>
              <td className="celda-prestacion">
                {item.prestacion || "—"}
              </td>

              <td className="celda-observaciones">
                {item.observaciones || "—"}
              </td>

              <td className="celda-monto">
                {item.costo ?? "—"}
              </td>

              <td className="celda-monto">
                {item.cobrarapaciente ?? "—"}
              </td>

              <td className="celda-monto">
                {item.cobraraobrasocial ?? "—"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="tabla-sin-datos">
              No hay prestaciones cargadas para este turno.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
</div>
</Tab>


 {/* NOTAS CLÍNICAS */}
    <Tab eventKey="notas" title="Notas clínicas">
<div className="seccion-tabla-turno">
  {/* <h5 className="titulo-seccion-turno">
    <i className="fa-solid fa-list-check me-2"></i>
    Notas clínicas
  </h5> */}

  <div className="tabla-turno-contenedor">
    <Table
      responsive
      hover
      size="sm"
      className="tabla-turno mb-0"
    >
      <thead>
        <tr>
          <th className="col-fecha">Fecha</th>
          <th>Notas clínicas</th>
        </tr>
      </thead>

      <tbody>
        {notasClinicas?.length > 0 ? (
          notasClinicas.map((nota, index) => (
            <tr key={nota.id ?? index}>
              <td className="celda-fecha">
                {nota.fechasubida
                  ? new Date(nota.fechasubida).toLocaleDateString("es-AR")
                  : "—"}
              </td>

              <td className="celda-observaciones">
                {nota.notasclinicas || "Sin notas clínicas"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2} className="tabla-sin-datos">
              <i className="fa-regular fa-clipboard me-2"></i>
              No hay notas clínicas asociadas a este turno.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
</div>
</Tab>


 {/* ARCHIVOS MÉDICOS */}
    <Tab eventKey="archivos" title="Archivos médicos">
<div className="seccion-tabla-turno archivos-turno">
 {/*  <h5 className="titulo-seccion-turno">
    <i className="fa-solid fa-file-medical me-2"></i>
    Archivos médicos
  </h5> */}

  <div className="tabla-turno-contenedor">
    <Table
      responsive
      hover
      size="sm"
      className="tabla-turno mb-0"
    >
      <thead>
        <tr>
          <th className="col-fecha">Fecha</th>
          <th>Observaciones</th>
          <th className="col-archivo text-center">Archivo</th>
        </tr>
      </thead>

      <tbody>
        {archivosMedicos?.length > 0 ? (
          archivosMedicos.map((archivo, index) => (
            <tr key={archivo.id ?? index}>
              <td className="celda-fecha">
                {archivo.fechasubida
                  ? new Date(archivo.fechasubida)
                      .toLocaleDateString("es-AR")
                  : "—"}
              </td>

              <td className="celda-observaciones">
                {archivo.notasclinicas || "Sin observaciones"}
              </td>

              <td className="text-center">
                {archivo.googledrivelink ? (
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="btn-ver-archivo"
                  onClick={() => handleVerImagen(archivo)}
                    disabled={!archivo.googledriveid}
                  >
                    <i className="fa-solid fa-eye me-1"></i>
                    Ver archivo
                  </Button>
                ) : (
                  <span className="texto-sin-archivo">
                    No disponible
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="tabla-sin-datos">
              <i className="fa-regular fa-folder-open me-2"></i>
              No hay archivos médicos asociados a este turno.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    
  </div>
{/*     <Modal
    show={mostrarModalImagen}
    onHide={() => setMostrarModalImagen(false)}
    size="lg"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Estudio Médico</Modal.Title>
    </Modal.Header>
  
     <Modal.Body style={{ textAlign: "center", padding: "10px" }}>
  {cargandoImagen ? (
    <div className="py-4">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Cargando imagen...</span>
      </div>
      <p className="mt-2 text-muted">Cargando archivo de Google Drive...</p>
    </div>
  ) : imagenUrl ? (
    <img
      src={imagenUrl}
      alt="Imagen médica del turno"
      style={{
        maxWidth: "100%",
        maxHeight: "70vh",
        objectFit: "contain"
      }}
    />
  ) : (
    <p className="text-danger">No se pudo cargar la imagen.</p>
  )}
</Modal.Body>
  
    <Modal.Footer>
      <Button
        variant="secondary"
        onClick={() => setMostrarModalImagen(false)}
      >
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal> */}
</div>
       </Tab>
   </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}
        style={{backgroundColor: "#198754"}}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    <ModalImagenMedica
      mostrar={mostrarModalImagen}
      onCerrar={() => setMostrarModalImagen(false)}
      imagenUrl={imagenUrl}
      cargandoImagen={cargandoImagen}
    />
    </>
  );
};

export default mdlturnodetalle_Ver1;
