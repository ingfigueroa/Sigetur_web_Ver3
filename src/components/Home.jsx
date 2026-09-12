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

import "../css/hero.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">

      {/* =====================================================
          HERO
      ===================================================== */}
   <section className="hero">

  <div className="hero-overlay"></div>
        <img 
        src="./assets/logo_1220_330.png"
         alt="SIGETUR"
         className="logo-sigetur"
         />

  {/* Botones superiores */}
  <div className="hero-auth-buttons">
       
    <Link to="/login">
      <Button className="btn-outline-sigetur">
        Iniciar sesión
      </Button>
    </Link>

    <Link to="/crearcuentapasouno">
      <Button 
        className="btn-outline-sigetur"
      >
        Registrarse
      </Button>
    </Link>
  </div>

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

<section
  id="adquisicion"
  className="section adquisicion-section"
>

  <Container>


{/* TÍTULO */}
<div className="section-title">

 

  <h2>
    Elegí cómo comenzar con SIGETUR
  </h2>

  <p>
    Probá todas las funcionalidades de SIGETUR durante
    30 días sin costo. 
  </p>
   <p>
    Continuá con una
    suscripción mensual por profesional.
  </p>

</div>


{/* OPCIONES */}
<Row className="justify-content-center g-4 mt-4">

  {/* OPCIÓN GRATUITA */}
  <Col lg={5} md={6}>

    <div className="adquisicion-card">
<div className="plan-probalo">
  PRUEBA GRATUITA
</div>
<hr />
     

      <h3 >
        Comenzar gratis
      </h3>

      <p>
        Probá SIGETUR durante 30 días y conocé todas
        sus funcionalidades sin costo.
      </p>


      <div className="adquisicion-price">

       <h5><strong>30 días <span>sin costo</span></strong>
        </h5>
       

      </div>


      <div className="feature-check">

        
        <div>
          <FontAwesomeIcon icon={faCheck} />
          Gestiona tus pacientes
        </div>

        <div>
          <FontAwesomeIcon icon={faCheck} />
         Gestiona tus profesionales
        </div>
        <div>
          <FontAwesomeIcon icon={faCheck} />
         Gestiona tus turnos
        </div>



        <div>
          <FontAwesomeIcon icon={faCheck} />
          Sin limitaciones
        </div>

        <div>
          <FontAwesomeIcon icon={faCheck} />
          30 días de prueba
        </div>

        <div>
          <FontAwesomeIcon icon={faCheck} />
          Sin costo
        </div>

      </div>


    

    </div>

  </Col>


  {/* OPCIÓN PAGO */}
  <Col lg={5} md={6}>

    <div className="adquisicion-card adquisicion-card-destacada">
<div className="plan-recomendado">
  RECOMENDADO -  SUSCRIPCIÓN MENSUAL
</div>
<hr />
      

      <h3 >
       Suscribite
      </h3>

      <p>
        Continuá utilizando todas las funcionalidades
        de SIGETUR con un abono mensual por profesional.
      </p>


     <div className="adquisicion-price">

 

 
   <h5><strong>por profesional/mes</strong>
        </h5>
         <span className="precio-valor">
    USD 10
  </span>

</div>



      {/* BENEFICIO */}
      <div className="beneficio-sigetur">

        <strong>
          Beneficio de lanzamiento con descuento
        </strong>

        <div>
          Primeros 3 meses al 
          <span>25%</span>
        </div>

        <div>
          Hasta el año
          <span>50%</span>
        </div>

      

      </div>


      <div className="feature-check">

        <div>
          <FontAwesomeIcon icon={faCheck} />
          Todas las funcionalidades
        </div>

        <div>
          <FontAwesomeIcon icon={faCheck} />
          Abono por profesional
        </div>

        <div>
          <FontAwesomeIcon icon={faCheck} />
          Incorporá los profesionales que necesites
        </div>

      </div>


      

    </div>

  </Col>

</Row>

{/* CTA ÚNICO DE REGISTRO */}




 
  </Container>

  
   <Container>



{/* OPCIONES */}
<Row className="justify-content-center g-4 mt-4">

  {/* OPCIÓN GRATUITA */}
  <Col lg={10} md={12}>

    <div className="adquisicion-card">

    
<div className="adquisicion-registro text-center">

  <h3>
    ¿Listo para comenzar?
  </h3>

  <p>
    Registrate y comenzá a disfrutar SIGETUR durante
    30 días sin costo.
  </p>


  <p>
    <strong>
      El abono mensual se calcula por profesional
    </strong>
    {" "}en cada consultorio o clínica.
  </p>

  <p className="small-text">
    El importe se abona en pesos argentinos según la
    cotización correspondiente.
  </p>

 <Link to="/crearcuentapasouno">
      <Button 
        className="btn-outline-sigetur"
      >
        Registrarse
      </Button>
    </Link>

</div>


{/* CÓMO FUNCIONA */}
{/* <div className="adquisicion-proceso">

  
  <div className="proceso-linea">

    <div className="proceso-item">

      <div className="proceso-numero">
        1
      </div>

      <strong>
        30 días
      </strong>

      <span>
        GRATIS
      </span>

    </div>


    <div className="proceso-linea-separador"></div>


    <div className="proceso-item">

      <div className="proceso-numero">
        2
      </div>

      <strong>
        Meses 1–3
      </strong>

      <span>
        25%
      </span>

    </div>


    <div className="proceso-linea-separador"></div>


    <div className="proceso-item">

      <div className="proceso-numero">
        3
      </div>

      <strong>
        Meses 4–6
      </strong>

      <span>
        50%
      </span>

    </div>


    <div className="proceso-linea-separador"></div>


    <div className="proceso-item">

      <div className="proceso-numero">
        4
      </div>

      <strong>
        Desde mes 7
      </strong>

      <span>
        100%
      </span>

    </div>

  </div>

</div> */}

    

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

              COMENZÁ A TRABAJAR CON NUESTRA PLATAFORMA DE TURNOS
            </span>

           
             <h2>
                  SIGETUR
            </h2>
            <span className="section-label">

               orientada a satisfacer las necesidades de los profesionales de la salud.
            </span>
            <p>
            
            </p>

          </div>


          <Row className="justify-content-center mt-4">

            <Col md={3} lg={4}>

              <Card className="plan-card">

                <Card.Body>

                  <h3>
                    Crear consultorios particulares
                  </h3>

                  <p>
                    Ideal para profesionales
                    independientes del área de salud.
                  </p>

                  

                


                </Card.Body>

              </Card>

            </Col>
            <Col md={3} lg={4}>

              <Card className="plan-card">

                <Card.Body>

                  <h3>
                    Crear consultorios interdisciplinarios
                  </h3>

                  <p>
                   Ideal para consultorios donde interactuan profesionales de distintas especialidades.
                  </p>

                 
     

                </Card.Body>

              </Card>

            </Col>
             <div className="section-title">
 <h3 className="section-label">

              Profesionales con especialidades como
            </h3>
            <h4>
    Odontología - Psicología - Centros de estética 
            </h4>
            <h4>
     Medicina - Nutrición - Quiropraxia
            </h4>
             </div>
            
         
        

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
                  src="/assets/login2.jpg"
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

          {/* <Button className="btn-cta">
            Contactanos
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ms-2"
            />
          </Button> */}
 <Link to="/crearcuentapasouno">
      <Button 
        className="btn-outline-sigetur"
      >
        Registrarse
      </Button>
    </Link>
        </Container>

      </section>

    </div>
  );
};

export default Home;