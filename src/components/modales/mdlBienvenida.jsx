
import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

const Bienvenida = () => {
  const pasos = [
    {
      numero: "01",
      icono: <FaUserMd />,
      titulo: "Registrar el primer PROFESIONAL",
      descripcion:
        "Incorporá al profesional que atenderá en el consultorio.",
      color: "#0d6efd",
    },
    {
      numero: "02",
      icono: <FaUsers />,
      titulo: "Registrar PACIENTES",
      descripcion:
        "Comenzá a cargar los datos de tus pacientes.",
      color: "#198754",
    },
    {
      numero: "03",
      icono: <FaCalendarCheck />,
      titulo: "Registrar TURNOS",
      descripcion:
        "Organizá la agenda y asigná los turnos de atención.",
      color: "#fd7e14",
    },
  ];

  return (
    <Container fluid className="py-4">
      <Card className="border-0 shadow-sm rounded-4 mx-auto"
        style={{ maxWidth: "950px" }}>

        <Card.Body className="p-4 p-md-5">

          {/* ENCABEZADO */}
          <div className="text-center mb-5">
            <h2  style={{color:"black"}}>
              ¡BIENVENIDOS A SIGETUR!
            </h2>

            <p className="text-secondary mb-3">
              Sistema de Gestión de Turnos
            </p>

            <div className="mx-auto"
              style={{
                width: "65px",
                height: "4px",
                backgroundColor: "#0d6efd",
                borderRadius: "5px",
              }}
            />

            <h5 className="fw-semibold mt-4">
              ¡Comenzar es muy fácil!
            </h5>

            <p className="text-secondary">
              Para empezar a utilizar SIGETUR, seguí estos tres pasos:
            </p>
          </div>

          {/* PASOS */}
          <Row className="g-4">
            {pasos.map((paso) => (
              <Col xs={12} md={4} key={paso.numero}>
                <div
                  className="h-100 p-4 rounded-4 text-center"
                  style={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "65px",
                      height: "65px",
                      backgroundColor: paso.color,
                      color: "white",
                      fontSize: "26px",
                    }}
                  >
                    {paso.icono}
                  </div>

                  <div
                    className="fw-bold mb-2"
                    style={{ color: paso.color }}
                  >
                    PASO {paso.numero}
                  </div>

                  <h6 className="fw-bold mb-3">
                    {paso.titulo}
                  </h6>

                  <p className="text-secondary small mb-0">
                    {paso.descripcion}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          {/* PIE */}
          <div className="text-center mt-5">
            <FaCheckCircle
              className="text-success me-2"
              size={20}
            />

            <span className="fw-semibold">
              ¡Ya estás listo para comenzar!
            </span>

            <p className="text-secondary small mt-2 mb-0">
              SIGETUR · Simplificamos la gestión de tu consultorio
            </p>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Bienvenida;
