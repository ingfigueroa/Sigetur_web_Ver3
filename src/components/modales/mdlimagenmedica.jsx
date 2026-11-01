
import { Modal, Button } from "react-bootstrap";

const ModalImagenMedica = ({
  mostrar,
  onCerrar,
  imagenUrl,
  cargandoImagen,
  titulo = "Estudio Médico",
}) => {
  return (
    <Modal
      show={mostrar}
      onHide={onCerrar}
      size="lg"
      centered
    >
      <Modal.Header
        style={{ backgroundColor: "#707e8375" }}
        closeButton
      >
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "black",
        }}
      >
        {cargandoImagen ? (
          <div className="py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">
                Cargando imagen...
              </span>
            </div>

            <p className="mt-2 text-muted">
              Cargando archivo de Google Drive...
            </p>
          </div>
        ) : imagenUrl ? (
          <img
            src={imagenUrl}
            alt="Imagen médica"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        ) : (
          <p className="text-danger">
            No se pudo cargar la imagen.
          </p>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#707e8375" }}>
        <Button variant="secondary" onClick={onCerrar}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalImagenMedica;