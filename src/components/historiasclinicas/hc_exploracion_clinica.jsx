import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";

function ExploracionClinica({ data, setData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNestedChange = (group, field, value) => {
    setData({
      ...data,
      [group]: {
        ...data[group],
        [field]: value,
      },
    });
  };

  return (
    <Card className="mb-3">
     <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        

        <Form>
          {/* ================= TEJIDOS BLANDOS ================= */}

          <h6 className="mt-2">TEJIDOS BLANDOS - LESIONES</h6>
          {/* ================= LESIONES ================= */}

          <Form.Check
            className="mb-2"
            type="checkbox"
            label="¿Se observan lesiones?"
            checked={data.lesiones.hayLesiones}
            onChange={(e) =>
              handleNestedChange("lesiones", "hayLesiones", e.target.checked)
            }
          />

          {data.lesiones.hayLesiones && (
            <>
              <h6>Tipo de lesiones</h6>

              <Row className="mb-2">
                <Col md={3}>
                  <Form.Check
                    label="Manchas"
                    checked={data.lesiones.manchas}
                    onChange={(e) =>
                      handleNestedChange(
                        "lesiones",
                        "manchas",
                        e.target.checked
                      )
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="Abultamientos"
                    checked={data.lesiones.abultamientos}
                    onChange={(e) =>
                      handleNestedChange(
                        "lesiones",
                        "abultamientos",
                        e.target.checked
                      )
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="Ulceraciones"
                    checked={data.lesiones.ulceraciones}
                    onChange={(e) =>
                      handleNestedChange(
                        "lesiones",
                        "ulceraciones",
                        e.target.checked
                      )
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="Ampollas"
                    checked={data.lesiones.ampollas}
                    onChange={(e) =>
                      handleNestedChange(
                        "lesiones",
                        "ampollas",
                        e.target.checked
                      )
                    }
                  />
                </Col>
              </Row>

              <Form.Control
                className="mb-3"
                placeholder="Otras lesiones"
                value={data.lesiones.otras}
                onChange={(e) =>
                  handleNestedChange("lesiones", "otras", e.target.value)
                }
              />
            </>
          )}

          <hr />
          {/* ================= PERIODONTO / HIGIENE / ESTADO GENERAL ================= */}

          <Row className="mt-3">
            {/* ===== COLUMNA 1: ENCÍAS Y PERIODONTO ===== */}
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Subtitle className="mb-2">
                    Encías y Periodonto
                  </Card.Subtitle>

                  <Form.Check
                    label="Le sangran las encías"
                    checked={data.sangrado}
                    onChange={(e) =>
                      setData({ ...data, sangrado: e.target.checked })
                    }
                  />

                  {data.sangrado && (
                    <Form.Control
                      className="mb-2"
                      placeholder="¿Cuándo?"
                      value={data.sangradoCuando}
                      onChange={(e) =>
                        setData({ ...data, sangradoCuando: e.target.value })
                      }
                    />
                  )}

                  <Form.Check
                    label="Sale pus"
                    checked={data.pus}
                    onChange={(e) =>
                      setData({ ...data, pus: e.target.checked })
                    }
                  />

                  {data.pus && (
                    <Form.Control
                      className="mb-2"
                      placeholder="¿De dónde?"
                      value={data.pusDonde}
                      onChange={(e) =>
                        setData({ ...data, pusDonde: e.target.value })
                      }
                    />
                  )}

                  <Form.Check
                    label="Movilidad dentaria"
                    checked={data.movilidad}
                    onChange={(e) =>
                      setData({ ...data, movilidad: e.target.checked })
                    }
                  />

                  <Form.Check
                    label="Dientes altos al morder"
                    checked={data.dientesAltos}
                    onChange={(e) =>
                      setData({ ...data, dientesAltos: e.target.checked })
                    }
                  />

                  <Form.Check
                    label="Cara hinchada"
                    checked={data.caraHinchada}
                    onChange={(e) =>
                      setData({ ...data, caraHinchada: e.target.checked })
                    }
                  />

                  {data.caraHinchada && (
                    <Form.Control
                      className="mt-2"
                      placeholder="Hielo / calor / otros"
                      value={data.caraHinchadaDetalle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          caraHinchadaDetalle: e.target.value,
                        })
                      }
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* ===== COLUMNA 2: HIGIENE BUCAL ===== */}
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Subtitle className="mb-2">Higiene Bucal</Card.Subtitle>

                  <Form.Control
                    className="mb-2"
                    placeholder="Momentos de azúcar diarios"
                    value={data.azucarDiaria}
                    onChange={(e) =>
                      setData({ ...data, azucarDiaria: e.target.value })
                    }
                  />

                  <Form.Control
                    className="mb-2"
                    placeholder="Índice de placa"
                    value={data.indicePlaca}
                    onChange={(e) =>
                      setData({ ...data, indicePlaca: e.target.value })
                    }
                  />

                  <Form.Label>Estado de higiene</Form.Label>
                  <Form.Select
                    value={data.estadoHigiene}
                    onChange={(e) =>
                      setData({ ...data, estadoHigiene: e.target.value })
                    }
                  >
                    <option value="">Seleccione</option>
                    <option value="Muy bueno">Muy bueno</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Deficiente">Deficiente</option>
                    <option value="Malo">Malo</option>
                  </Form.Select>
                </Card.Body>
              </Card>
            </Col>

            {/* ===== COLUMNA 3: ESTADO BUCAL GENERAL ===== */}
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Subtitle className="mb-2">
                    Estado Bucal General
                  </Card.Subtitle>

                  <Form.Check
                    label="Presencia de sarro"
                    checked={data.sarro}
                    onChange={(e) =>
                      setData({ ...data, sarro: e.target.checked })
                    }
                  />

                  <Form.Check
                    label="Enfermedad periodontal"
                    checked={data.enfermedadPeriodontal}
                    onChange={(e) =>
                      setData({
                        ...data,
                        enfermedadPeriodontal: e.target.checked,
                      })
                    }
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExploracionClinica;
