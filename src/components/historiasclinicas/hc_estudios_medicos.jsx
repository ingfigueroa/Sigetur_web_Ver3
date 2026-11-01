
import { useState } from "react";


import { Button, Table } from "react-bootstrap";

import { tiposdeEstudio } from "/src/services/tiposdeestudio.service";

import ModalImagenMedica from "../../components/modales/mdlimagenmedica";


const EstudiosMedicos = ({data, idpaciente}) => {





  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [cargandoImagen, setCargandoImagen] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  



  
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

        

  // Incorporar aquí la lógica para recuperar los archivos médicos.

  return (
    <>
   <div className="seccion-tabla-turno archivos-turno">
 

  <div className="">

<div style={{ width: "100%", maxWidth: "100%" }}>
  <Table
    responsive
    hover
    size="sm"
    className="mb-0"
    style={{ width: "100%", tableLayout: "fixed" }}
  >
    <thead>
      <tr>
        <th
          style={{
            width: "100%",
            backgroundColor: "#e8f1f4",
            color: "#044f82",
            padding: "10px",
          }}
        >
          <i className="fa-solid fa-file-medical me-2"></i>
          Estudios Médicos
        </th>
      </tr>
    </thead>

    <tbody>
      {data?.length > 0 ? (
        data.map((archivo, index) => (
          <tr key={`${archivo.googledriveid ?? archivo.hcnro}-${index}`}  style={{
                width: "100%",
                
              }}>
            <td
              style={{
                width: "100%",
                padding: "12px",
                whiteSpace: "normal",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                  <div style={{ color: "#044f82", fontWeight: "600" }}>
                    {archivo.descripcion || "Estudio sin descripción"}
                    {archivo.grupoestudio
                      ? ` - ${archivo.grupoestudio}`
                      : ""}
                  </div>

                  <div className="mt-1">
                    <strong>Fecha:</strong>{" "}
                    {archivo.fechasubida
                      ? new Date(archivo.fechasubida).toLocaleDateString("es-AR")
                      : "—"}
                  </div>

                  <div className="mt-1" style={{ overflowWrap: "anywhere" }}>
                    <strong>Observaciones:</strong>{" "}
                    {archivo.notasclinicas || "Sin observaciones"}
                  </div>
                </div>

                <div>
                  {archivo.googledriveid ? (
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="text-nowrap"
                      onClick={() => handleVerImagen(archivo)}
                    >
                      <i className="fa-solid fa-eye me-1"></i>
                      Ver archivo
                    </Button>
                  ) : (
                    <span className="text-muted">No disponible</span>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td style={{ width: "100%", padding: "15px" }}>
            <i className="fa-regular fa-folder-open me-2"></i>
            No hay estudios médicos asociados a este paciente.
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
    <Modal.Header style={{ backgroundColor: "#707e8375" }} closeButton>
      <Modal.Title>Estudio Médico</Modal.Title>
    </Modal.Header>
  
     <Modal.Body style={{ textAlign: "center", padding: "10px", backgroundColor: "black" }}>
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
  
    <Modal.Footer style={{ backgroundColor: "#707e8375" }} >
      <Button
        variant="secondary"
        onClick={() => setMostrarModalImagen(false)}
      >
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal> */}

  {/*  <Table
      responsive
      hover
      size="sm"
      className="tabla-turno mb-0"
    >
      <thead>
        <tr>
          <th className="col-fecha">Estudios Médicos</th>
          
        </tr>
      </thead>

      <tbody>
        {data?.length > 0 ? (
          data.map((archivo, index) => (
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
                    onClick={(e) => {
                       
                  e.preventDefault();

                      setImagenSeleccionada(archivo.googledriveid);
                      setMostrarModalImagen(true);
                    }}
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
    </Table> */}
  </div>


</div>
<ModalImagenMedica
  mostrar={mostrarModalImagen}
  onCerrar={() => setMostrarModalImagen(false)}
  imagenUrl={imagenUrl}
  cargandoImagen={cargandoImagen}
/>
</>
  );
};

export default EstudiosMedicos;
