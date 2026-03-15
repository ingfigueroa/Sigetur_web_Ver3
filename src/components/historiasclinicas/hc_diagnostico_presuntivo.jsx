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
      <div style={{ border: "1px solid gray", padding: "20px" }}>

      <svg width="120" height="120">

        {/* 🔹 Importante usar transform para posicionar */}
        <g transform="translate(20,20)">
          <diente
            pieza={16}
            data={odontograma[16]}
            modo={modo}
            tipoSeleccionado={tipoSeleccionado}
            onActualizar={actualizarCara}
          />
        </g>

      </svg>

    </div>
    </Card>
    
  );
}

export default DiagnosticoPresuntivo;
