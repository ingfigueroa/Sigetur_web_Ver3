import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

import {
  faCalendarCheck,
  faUsers,
  faFileMedical,
  faMoneyBillWave,
  faShieldHalved,
  faLaptopMedical,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./hero.css";

const Hero = () => {
  return (
    <div className="home">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="hero">

        <div className="hero-overlay"></div>

        <Container className="hero-content">
          <Row className="align-items-center">

            <Col lg={7}>

              <span className="hero-badge">
                SISTEMA INTEGRAL DE GESTIÓN
              </span>

              <h1>
                Gestioná tu consultorio
                <span> de manera simple.</span>
              </h1>

              <p className="hero-text">
                SIGETUR reúne en una sola plataforma la gestión de
                turnos, pacientes, historia clínica, prestaciones y
                cobros.
              </p>

              <div className="hero-buttons">

                <Button
                  className="btn-primary-sigetur"
                  href="#que-es"
                >
                  Conocé SIGETUR
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ms-2"
                  />
                </Button>

                <Button
                  className="btn-outline-sigetur"
                  href="#planes"
                >
                  Quiero contratarlo
                </Button>

              </div>

            </Col>

          </Row>
        </Container>

      </section>


      {/* =====================================================
          EL PROBLEMA
      ===================================================== */}
      <section className="section problem-section">

        <Container>

          <div className="section-title">

            <span className="section-label">
              TU CONSULTORIO
            </span>

            <h2>
              Menos tiempo administrando.
              <br />
              Más tiempo para tus pacientes.
            </h2>

            <p>
              La gestión de un consultorio puede involucrar
              turnos, pacientes, historias clínicas, prestaciones,
              cobros y muchas otras tareas.
            </p>

          </div>


          <Row className="g-4 mt-4">

            <Col md={6} lg={3}>
              <div className="problem-card">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                />

                <h3>Turnos</h3>

                <p>
                  Organizá tu agenda y evitá
                  superposiciones y olvidos.
                </p>
              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="problem-card">
                <FontAwesomeIcon icon={faUsers} />

                <h3>Pacientes</h3>

                <p>
                  Toda la información de tus pacientes
                  organizada y disponible.
                </p>
              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="problem-card">
                <FontAwesomeIcon icon={faFileMedical} />

                <h3>Historia clínica</h3>

                <p>
                  Registrá y consultá la información
                  clínica desde un único lugar.
                </p>
              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="problem-card">
                <FontAwesomeIcon icon={faMoneyBillWave} />

                <h3>Gestión</h3>

                <p>
                  Controlá prestaciones, cobros y
                  medios de pago.
                </p>
              </div>
            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          QUE ES SIGETUR
      ===================================================== */}
      <section
        id="que-es"
        className="section sigetur-section"
      >

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={6}>

              <span className="section-label">
                CONOCÉ SIGETUR
              </span>

              <h2>
                Todo lo que necesitás
                <br />
                en un solo lugar.
              </h2>

              <p className="large-text">
                SIGETUR es una plataforma integral diseñada
                para facilitar la administración de consultorios
                y profesionales.
              </p>

              <p>
                Desde la gestión de turnos hasta la historia
                clínica y los cobros, toda la información se
                encuentra centralizada en un único sistema.
              </p>

              <div className="feature-check">

                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  Fácil de utilizar
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  Acceso desde cualquier lugar
                </div>

                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  Información centralizada
                </div>

              </div>

            </Col>


            <Col lg={6}>

              <div className="dashboard-image">

                <img
                  src="/assets/Turnos.jpg"
                  alt="SIGETUR - Gestión de turnos"
                />

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          MODALIDADES
      ===================================================== */}
      <section className="section modalities-section">

        <Container>

          <div className="section-title">

            <span className="section-label">
              UNA SOLUCIÓN FLEXIBLE
            </span>

            <h2>
              SIGETUR se adapta a tu forma de trabajar
            </h2>

            <p>
              Desde un profesional independiente hasta
              organizaciones con múltiples profesionales.
            </p>

          </div>


          <Row className="g-4 mt-4">

            <Col md={4}>

              <Card className="modality-card">

                <Card.Body>

                  <div className="modality-number">
                    01
                  </div>

                  <h3>
                    Profesional
                  </h3>

                  <p>
                    Para profesionales que necesitan
                    organizar y administrar su actividad
                    de manera simple.
                  </p>

                  <ul>
                    <li>Agenda de turnos</li>
                    <li>Pacientes</li>
                    <li>Historia clínica</li>
                    <li>Prestaciones</li>
                  </ul>

                </Card.Body>

              </Card>

            </Col>


            <Col md={4}>

              <Card className="modality-card featured">

                <Card.Body>

                  <div className="modality-number">
                    02
                  </div>

                  <h3>
                    Consultorio
                  </h3>

                  <p>
                    Para consultorios con varios
                    profesionales y diferentes
                    especialidades.
                  </p>

                  <ul>
                    <li>Múltiples profesionales</li>
                    <li>Usuarios y permisos</li>
                    <li>Agendas</li>
                    <li>Gestión integral</li>
                  </ul>

                </Card.Body>

              </Card>

            </Col>


            <Col md={4}>

              <Card className="modality-card">

                <Card.Body>

                  <div className="modality-number">
                    03
                  </div>

                  <h3>
                    Institución
                  </h3>

                  <p>
                    Para organizaciones que necesitan
                    administrar una estructura más amplia.
                  </p>

                  <ul>
                    <li>Varios consultorios</li>
                    <li>Múltiples profesionales</li>
                    <li>Administración centralizada</li>
                    <li>Escalabilidad</li>
                  </ul>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          CARACTERISTICAS
      ===================================================== */}
      <section className="section features-section">

        <Container>

          <div className="section-title">

            <span className="section-label">
              FUNCIONALIDADES
            </span>

            <h2>
              Todo lo que necesitás para gestionar
              tu consultorio.
            </h2>

          </div>


          <Row className="g-4 mt-4">

            <Col md={6} lg={3}>
              <div className="feature-card">

                <FontAwesomeIcon icon={faCalendarCheck} />

                <h3>Turnos</h3>

                <p>
                  Agenda, disponibilidad, cancelaciones,
                  reprogramaciones y lista de espera.
                </p>

              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="feature-card">

                <FontAwesomeIcon icon={faUsers} />

                <h3>Pacientes</h3>

                <p>
                  Información personal, obras sociales
                  y toda la información relacionada.
                </p>

              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="feature-card">

                <FontAwesomeIcon icon={faFileMedical} />

                <h3>Historia clínica</h3>

                <p>
                  Gestión de la información clínica
                  de tus pacientes.
                </p>

              </div>
            </Col>


            <Col md={6} lg={3}>
              <div className="feature-card">

                <FontAwesomeIcon icon={faMoneyBillWave} />

                <h3>Cobros</h3>

                <p>
                  Prestaciones, valores, medios de pago
                  y gestión económica.
                </p>

              </div>
            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          SEGURIDAD
      ===================================================== */}
      <section className="security-section">

        <Container>

          <Row className="align-items-center">

            <Col lg={7}>

              <span className="section-label">
                ACCESO Y SEGURIDAD
              </span>

              <h2>
                Tu información disponible
                cuando la necesitás.
              </h2>

              <p>
                SIGETUR es una plataforma web que permite
                acceder al sistema desde diferentes dispositivos,
                manteniendo la información centralizada.
              </p>

              <div className="security-items">

                <div>
                  <FontAwesomeIcon icon={faShieldHalved} />
                  <span>
                    Acceso seguro
                  </span>
                </div>

                <div>
                  <FontAwesomeIcon icon={faLaptopMedical} />
                  <span>
                    Acceso desde cualquier dispositivo
                  </span>
                </div>

                <div>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>
                    Usuarios y permisos
                  </span>
                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          POR QUE SIGETUR
      ===================================================== */}
      <section className="section why-section">

        <Container>

          <div className="section-title">

            <span className="section-label">
              ¿POR QUÉ SIGETUR?
            </span>

            <h2>
              Una herramienta pensada para
              simplificar tu trabajo.
            </h2>

          </div>


          <Row className="g-4 mt-4">

            <Col md={3}>
              <div className="why-card">
                <h3>Simple</h3>
                <p>
                  Una interfaz clara y fácil de utilizar.
                </p>
              </div>
            </Col>

            <Col md={3}>
              <div className="why-card">
                <h3>Integral</h3>
                <p>
                  Todas las áreas de gestión conectadas.
                </p>
              </div>
            </Col>

            <Col md={3}>
              <div className="why-card">
                <h3>Accesible</h3>
                <p>
                  Accedé a tu información desde donde estés.
                </p>
              </div>
            </Col>

            <Col md={3}>
              <div className="why-card">
                <h3>Escalable</h3>
                <p>
                  Crece junto con tu consultorio.
                </p>
              </div>
            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          PLANES
      ===================================================== */}
      <section
        id="planes"
        className="section plans-section"
      >

        <Container>

          <div className="section-title">

            <span className="section-label">
              ELEGÍ TU MODALIDAD
            </span>

            <h2>
              Comenzá a trabajar con SIGETUR
            </h2>

            <p>
              Una solución para cada necesidad.
            </p>

          </div>


          <Row className="justify-content-center mt-4">

            <Col md={6} lg={4}>

              <Card className="plan-card">

                <Card.Body>

                  <h3>
                    Profesional
                  </h3>

                  <p>
                    Ideal para profesionales
                    independientes.
                  </p>

                  <div className="plan-price">
                    Consultar
                  </div>

                  <ul>

                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Gestión de turnos
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Pacientes
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Historia clínica
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Gestión de prestaciones
                    </li>

                  </ul>

                  <Button className="plan-button">
                    Solicitar información
                  </Button>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>


      {/* =====================================================
          CTA FINAL
      ===================================================== */}
      <section className="final-cta">

        <Container>

          <h2>
            ¿Querés comenzar a trabajar con SIGETUR?
          </h2>

          <p>
            Conocé la solución y encontrá la modalidad
            adecuada para tu consultorio.
          </p>

          <Button className="btn-cta">
            Contactanos
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ms-2"
            />
          </Button>

        </Container>

      </section>

    </div>
  );
};

export default Hero;