import "../../css/funcionalidades.css";

import Card from "react-bootstrap/Card";

import {
    FaCalendarAlt,
    FaUserFriends,
    FaNotesMedical,
    FaCreditCard,
    FaChartLine,
    FaBell
} from "react-icons/fa";

function Funcionalidades(){

    return(

        <section
            id="funcionalidades"
            className="funcionalidades">

            <h2>Todo lo que necesitás para administrar tu consultorio</h2>

            <p className="subtitulo">

                SIGETUR reúne todas las herramientas necesarias
                para la gestión diaria de profesionales y centros
                de salud.

            </p>

            <div className="contenedorCards">

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaCalendarAlt className="icono"/>

                        <Card.Title>
                            Gestión de Turnos
                        </Card.Title>

                        <Card.Text>
                            Agenda online con disponibilidad por profesional y control completo de turnos.
                        </Card.Text>

                    </Card.Body>

                </Card>

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaUserFriends className="icono"/>

                        <Card.Title>
                            Pacientes
                        </Card.Title>

                        <Card.Text>
                            Administración completa de pacientes y sus datos.
                        </Card.Text>

                    </Card.Body>

                </Card>

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaNotesMedical className="icono"/>

                        <Card.Title>
                            Historia Clínica
                        </Card.Title>

                        <Card.Text>
                            Registro clínico seguro y organizado.
                        </Card.Text>

                    </Card.Body>

                </Card>

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaCreditCard className="icono"/>

                        <Card.Title>
                            Cobros
                        </Card.Title>

                        <Card.Text>
                            Administración de pagos, obras sociales y medios de pago.
                        </Card.Text>

                    </Card.Body>

                </Card>

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaChartLine className="icono"/>

                        <Card.Title>
                            Estadísticas
                        </Card.Title>

                        <Card.Text>
                            Indicadores e informes para conocer el rendimiento del consultorio.
                        </Card.Text>

                    </Card.Body>

                </Card>

                <Card className="cardFuncion">

                    <Card.Body>

                        <FaBell className="icono"/>

                        <Card.Title>
                            Recordatorios
                        </Card.Title>

                        <Card.Text>
                            Avisos automáticos para disminuir ausencias.
                        </Card.Text>

                    </Card.Body>

                </Card>

            </div>

        </section>

    );

}

export default Funcionalidades;