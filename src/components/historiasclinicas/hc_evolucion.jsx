import React, { useState } from "react";
import { Table, Form, Button, Card, Row, Col } from "react-bootstrap";

function Evolucion({ data, setData }) {
  const [nuevaEvolucion, setNuevaEvolucion] = useState({
    prestacion: "",
    pieza: "",
    observaciones: "",
    profesional: ""
  });

  const agregarEvolucion = () => {
    if (!nuevaEvolucion.prestacion) return;

    const registro = {
      fecha: new Date().toISOString().split("T")[0],
      ...nuevaEvolucion
    };

    setData([...data, registro]);

    setNuevaEvolucion({
      prestacion: "",
      pieza: "",
      observaciones: "",
      profesional: ""
    });
  };

  return (
    <Card>
      <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        <Card.Title>Evolución</Card.Title>

        {/* === FORMULARIO DE NUEVA EVOLUCIÓN === */}
        <Card className="mb-3">
          <Card.Body>
            <Row className="mb-2">
              <Col md={4}>
                <Form.Control
                  placeholder="Prestación realizada"
                  value={nuevaEvolucion.prestacion}
                  onChange={(e) =>
                    setNuevaEvolucion({
                      ...nuevaEvolucion,
                      prestacion: e.target.value
                    })
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Control
                  placeholder="Pieza"
                  value={nuevaEvolucion.pieza}
                  onChange={(e) =>
                    setNuevaEvolucion({
                      ...nuevaEvolucion,
                      pieza: e.target.value
                    })
                  }
                />
              </Col>

              <Col md={4}>
                <Form.Control
                  placeholder="Observaciones"
                  value={nuevaEvolucion.observaciones}
                  onChange={(e) =>
                    setNuevaEvolucion({
                      ...nuevaEvolucion,
                      observaciones: e.target.value
                    })
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Control
                  placeholder="Profesional"
                  value={nuevaEvolucion.profesional}
                  onChange={(e) =>
                    setNuevaEvolucion({
                      ...nuevaEvolucion,
                      profesional: e.target.value
                    })
                  }
                />
              </Col>
            </Row>

            <Button size="sm" onClick={agregarEvolucion}>
              + Agregar evolución
            </Button>
          </Card.Body>
        </Card>

        {/* === TABLA SOLO LECTURA === */}
        <Table bordered size="sm">
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Fecha</th>
              <th>Prestación</th>
              <th style={{ width: "8%" }}>Pieza</th>
              <th>Observaciones</th>
              <th style={{ width: "15%" }}>Profesional</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  Sin evoluciones registradas
                </td>
              </tr>
            )}

            {data.map((ev, index) => (
              <tr key={index}>
                <td>{ev.fecha}</td>
                <td>{ev.prestacion}</td>
                <td>{ev.pieza}</td>
                <td>{ev.observaciones}</td>
                <td>{ev.profesional}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Evolucion;
