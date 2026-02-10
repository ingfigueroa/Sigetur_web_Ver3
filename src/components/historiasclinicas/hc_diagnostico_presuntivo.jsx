import React from "react";
import { Form, Card } from "react-bootstrap";

function DiagnosticoPresuntivo({ data, setData }) {
  return (
    <Card>
      <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        

        <Form.Group>
          <Form.Label>
            Diagnóstico / Impresión clínica
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Ej: Gingivitis crónica localizada en sector anterior inferior..."
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default DiagnosticoPresuntivo;
