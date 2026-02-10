import React from "react";
import { Table, Button, Form, Card } from "react-bootstrap";

function PlanTratamiento({ data, setData }) {
  const handleChange = (index, field, value) => {
    const nuevoPlan = [...data];
    nuevoPlan[index][field] = value;
    setData(nuevoPlan);
  };

  const agregarFila = () => {
    setData([
      ...data,
      { codigo: "", prestacion: "", pieza: "", observaciones: "" }
    ]);
  };

  const eliminarFila = (index) => {
    const nuevoPlan = data.filter((_, i) => i !== index);
    setData(nuevoPlan.length ? nuevoPlan : data);
  };

  return (
    <Card>
     <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        

        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Código</th>
              <th>Prestación</th>
              <th style={{ width: "10%" }}>Pieza</th>
              <th>Observaciones</th>
              <th style={{ width: "5%" }}></th>
            </tr>
          </thead>

          <tbody>
            {data.map((fila, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    size="sm"
                    value={fila.codigo}
                    onChange={(e) =>
                      handleChange(index, "codigo", e.target.value)
                    }
                  />
                </td>

                <td>
                  <Form.Control
                    size="sm"
                    value={fila.prestacion}
                    onChange={(e) =>
                      handleChange(index, "prestacion", e.target.value)
                    }
                  />
                </td>

                <td>
                  <Form.Control
                    size="sm"
                    value={fila.pieza}
                    onChange={(e) =>
                      handleChange(index, "pieza", e.target.value)
                    }
                  />
                </td>

                <td>
                  <Form.Control
                    size="sm"
                    value={fila.observaciones}
                    onChange={(e) =>
                      handleChange(index, "observaciones", e.target.value)
                    }
                  />
                </td>

                <td className="text-center">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarFila(index)}
                  >
                    ✕
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button size="sm" onClick={agregarFila}>
          + Agregar prestación
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PlanTratamiento;
