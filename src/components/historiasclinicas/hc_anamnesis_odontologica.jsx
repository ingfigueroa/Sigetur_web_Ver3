import React from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";

import { historiaclinicaService } from "../../services/historiaclinica.service";

function AnamnesisOdontologica({ data, setData, idpaciente }) {
 
  
  const handleNestedChange = (group, field, value) => {
    setData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

    async function grabarAnamnesis() {
       
      console.log(idpaciente)
      
        const payload = {


          idpaciente: idpaciente,

           // ================= GENERAL =================

          porqueasistioconsulta: data.general.porqueasistioconsulta,
          momentosazucardiarios: data.general.momentosazucardiarios,
          indicedeplacas: data.general.indicedeplacas,
          tipolesionesdescriba: data.general.tipolesionesdescriba,
          higienebucalestado: data.general.higienebucalestado,
         
          carahinchada: data.general.carahinchada,
          carahinchadapusohielo: data.general.carahinchadapusohielo,
          carahinchadapusocalor: data.general.carahinchadapusocalor,
          carahinchadapusootros: data.general.carahinchadapusootros,
          momentosazucardiarios: data.general.momentosazucardiarios,
          indicedeplacas: data.general.indicedeplacas,
          observaciones: data.general.observaciones,
    

        // ================= CONSULTAS PREVIAS =================
          consultootroprofesional: data.consultasPrevias.consultootroprofesional,
          consultootroprofesionaldetalle: data.consultasPrevias.consultootroprofesionaldetalle,
          tomomedicamento: data.consultasPrevias.tomomedicamento,
          describamedicamento: data.consultasPrevias.describamedicamento,
          desdecuandomedicamento: data.consultasPrevias.desdecuandomedicamento,
          obtuvoresultadomedicamento: data.consultasPrevias.obtuvoresultadomedicamento,
    
 // ================= DOLOR =================
    

      hatenidodolor: data.dolor.hatenidodolor,
      suave: data.dolor.suave,
      moderado: data.dolor.moderado,
      intenso: data.dolor.intenso,
      temporario: data.dolor.temporario,
      intermitente: data.dolor.intermitente,
      continuo: data.dolor.continuo,
      espontaneo: data.dolor.espontaneo,
      provocado: data.dolor.provocado,
      alfrio: data.dolor.alfrio,
      alcalor: data.dolor.alcalor,

      localizadodolor: data.general.localizadodolor,
      irradiadodolor: data.general.irradiadodolor,
      calmoalgodolor: data.general.calmoalgodolor,
    

    // ================= GOLPE =================
      golpedientes: data.golpe.golpedientes,
      cuandogolpedientes: data.golpe.cuandogolpedientes,
      comoprodujogolpedientes: data.golpe.comoprodujogolpedientes,

      // ================= FRACTURA =================
    
    
      fracturodiente: data.fractura.fracturodiente,
      cualdientefracturo: data.fractura.cualdientefracturo,
      tratamientofracturadiente: data.fractura.tratamientofracturadiente,

      // ================= DIFICULTAD =================
  
      hablar: data.dificultad.hablar,
      masticar: data.dificultad.masticar,
      abrirlaboca: data.dificultad.abrirlaboca,
      tragaralimentos: data.dificultad.tragaralimentos,
  
      // ================= ANORMAL BOCA =================

      loslabios: data.anormalBoca.loslabios,
			carrillo: data.anormalBoca.carrillo,
			lengua: data.anormalBoca.lengua,
			rebordes: data.anormalBoca.rebordes,
			paladar: data.anormalBoca.paladar,
			trigono: data.anormalBoca.trigono,
			pisoboca: data.anormalBoca.pisoboca,
			pisoretromolar: data.anormalBoca.pisoretromolar,

      // ================= LESIONES=================
    
	    manchas: data.lesiones.manchas,
			abultamientotejidos: data.lesiones.abultamientotejidos,
			ulceras: data.lesiones.ulceras,
			ampollas: data.lesiones.ampollas,
			sangranencias: data.lesiones.sangranencias,
			sangranenciasdetalle: data.lesiones.sangranenciasdetalle,
			pus: data.lesiones.pus,
			pusdetalle: data.lesiones.pusdetalle,
			movilidaddientes: data.lesiones.movilidaddientes,
			movilidaddientesdetalle: data.lesiones.movilidaddientesdetalle,
			altodientes: data.lesiones.altodientes,
			altodientesdetalle: data.lesiones.altodientesdetalle,
  
      };
  
      try {
       
       console.log(payload)
      await historiaclinicaService.GrabarAnamnesisOdontologica(payload);
  
        setModalMessage("ALTA EXITOSA");
      } catch (error) {
        /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
        return;
      }
    };


  return (
    <Card className="mb-3">
      <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        <Row>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="success"
              style={{
                height: "26px", // más alto
                fontSize: "10px", // texto más grande
                padding: "0px 20px", // más espacio interno
                whiteSpace: "nowrap",
              }}
              onClick={(event) => {
                  grabarAnamnesis();
                  event.preventDefault();
                }}
            >
              GRABAR - ANAMNESIS ODONTOLOGICA
            </Button>

            {/* Botón */}
            {/*  <Button
                    variant="primary"
                    size="sm"
                    style={{
                      height: "20px", // más alto
                      fontSize: "10px", // texto más grande
                      padding: "0px 20px", // más espacio interno
                      marginLeft: "30px",
                      whiteSpace: "nowrap",
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      //limpiar();
                    }}
                  >
                    LIMPIAR
                  </Button> */}
          </div>
        </Row>
        <Form>
          {/* ================= MOTIVO DE CONSULTA ================= */}

          <Form.Group className="mb-3">
            <Form.Label>¿Por qué asistió a la consulta?</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={data.general.porqueasistioconsulta}
              onChange={(e) =>
                handleNestedChange(
                  "general",
                  "porqueasistioconsulta",
                  e.target.value.toUpperCase(),
                )
              }
            />
          </Form.Group>

          <hr />

          {/* ================= CONSULTAS PREVIAS ================= */}

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1:CONSULTO CON OTRO PROFESIONAL  === */}
            <Col md={3}>
              <Form.Check
                label="¿Consultó antes con otro profesional?"
                checked={data.consultasPrevias.consultootroprofesional}
                onChange={(e) =>
                  handleNestedChange(
                    "consultasPrevias",
                    "consultootroprofesional",
                    e.target.checked,
                  )
                }
              />
            </Col>
             <Col md={3}>
              {data.consultasPrevias.consultootroprofesional && (
                <Form.Control
                  placeholder="Describa lo comentado por el profesional"
                  value={data.consultasPrevias.consultootroprofesionaldetalle}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultasPrevias",
                      "consultootroprofesionaldetalle",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1:TOMO ALGUN MEDICAMENTO  === */}
            <Col md={3}>
              <Form.Check
                label="¿Tomó algún medicamento?"
                checked={data.consultasPrevias.tomomedicamento}
                onChange={(e) =>
                  handleNestedChange(
                    "consultasPrevias",
                    "tomomedicamento",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3:TOMO MEDICACION === */}
            <Col md={3}>
              {data.consultasPrevias.tomomedicamento && (
                <Form.Control
                  placeholder="Describa cuál..."
                  value={data.consultasPrevias.describamedicamento}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultasPrevias",
                      "describamedicamento",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
            {/* === NIVEL 3:DESDE CUANDO === */}
            <Col md={3}>
              {data.consultasPrevias.tomomedicamento && (
                <Form.Control
                  placeholder="¿Desde cuando?"
                  value={data.consultasPrevias.desdecuandomedicamento}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultasPrevias",
                      "desdecuandomedicamento",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
            <Col md={3}>
              {data.consultasPrevias.tomomedicamento && (
                <Form.Check
                  label="¿Obtuvo resultados?"
                  checked={data.consultasPrevias.obtuvoresultadomedicamento}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultasPrevias",
                      "obtuvoresultadomedicamento",
                      e.target.checked,
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <hr />

          {/* ================= DOLOR ================= */}

          <Form.Check
            type="checkbox"
            label="¿Ha tenido dolor?"
            checked={data.dolor.hatenidodolor}
            onChange={(e) =>
              handleNestedChange("dolor", "hatenidodolor", e.target.checked)
            }
          />

          {data.dolor.hatenidodolor && (
            <>
              <Row className="mt-2">
                <Col md={12}>
                  <Form.Label>Tipo de dolor</Form.Label>
                </Col>

                <Col md={3}>
                  <Form.Check
                    label="¿Suave?"
                    checked={data.dolor.suave}
                    onChange={(e) =>
                      handleNestedChange("dolor", "suave", e.target.checked)
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Moderado?"
                    checked={data.dolor.moderado}
                    onChange={(e) =>
                      handleNestedChange("dolor", "moderado", e.target.checked)
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Intenso?"
                    checked={data.dolor.intenso}
                    onChange={(e) =>
                      handleNestedChange("dolor", "intenso", e.target.checked)
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Temporario?"
                    checked={data.dolor.temporario}
                    onChange={(e) =>
                      handleNestedChange(
                        "dolor",
                        "temporario",
                        e.target.checked,
                      )
                    }
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={3}>
                  <Form.Check
                    label="¿Intermitente?"
                    checked={data.dolor.intermitente}
                    onChange={(e) =>
                      handleNestedChange(
                        "dolor",
                        "intermitente",
                        e.target.checked,
                      )
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Continuo?"
                    checked={data.dolor.continuo}
                    onChange={(e) =>
                      handleNestedChange("dolor", "continuo", e.target.checked)
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Espontáneo?"
                    checked={data.dolor.espontaneo}
                    onChange={(e) =>
                      handleNestedChange(
                        "dolor",
                        "espontaneo",
                        e.target.checked,
                      )
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Provocado?"
                    checked={data.dolor.provocado}
                    onChange={(e) =>
                      handleNestedChange("dolor", "provocado", e.target.checked)
                    }
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={3}>
                  <Form.Check
                    label="¿Al frío?"
                    checked={data.dolor.alfrio}
                    onChange={(e) =>
                      handleNestedChange("dolor", "alfrio", e.target.checked)
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Check
                    label="¿Al calor?"
                    checked={data.dolor.alcalor}
                    onChange={(e) =>
                      handleNestedChange("dolor", "alcalor", e.target.checked)
                    }
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={3}>
                  <Form.Control
                    className="mt-2"
                    placeholder="Localizado ¿dónde?"
                    value={data.general.localizadodolor}
                    onChange={(e) =>
                      handleNestedChange("general", "localizadodolor", e.target.value.toUpperCase())
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    className="mt-2"
                    placeholder="Irradiado ¿hacia dónde?"
                    value={data.general.irradiadodolor}
                   onChange={(e) =>
                      handleNestedChange("general", "irradiadodolor", e.target.value.toUpperCase())
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Control
                    className="mt-2"
                    placeholder="¿Puede calmarlo con algo?"
                    value={data.general.calmoalgodolor}
                    onChange={(e) =>
                      handleNestedChange("general", "calmoalgodolor", e.target.value.toUpperCase())
                    }
                  />
                </Col>
              </Row>
            </>
          )}

          <hr />

          {/* ================= TRAUMATISMOS ================= */}
          <Row className="mt-2">
            <Col md={6}>
              <Form.Check
                label="¿Sufrió algún golpe en los dientes?"
                checked={data.golpe.golpedientes}
                onChange={(e) =>
                  handleNestedChange("golpe", "golpedientes", e.target.checked)
                }
              />
            </Col>
          </Row>

          {/* ================= GOLPES ================= */}

          <Row className="mt-2">
            {data.golpe.golpedientes && (
              <>
                <Col md={6}>
                  <Form.Control
                    className="mt-2"
                    placeholder="¿Cuándo?"
                    value={data.golpe.cuandogolpedientes}
                    onChange={(e) =>
                      handleNestedChange("golpe", "cuandogolpedientes", e.target.value.toUpperCase())
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    className="mt-2"
                    placeholder="¿Cómo se produjo?"
                    value={data.golpe.comoprodujogolpedientes}
                    onChange={(e) =>
                      handleNestedChange("golpe", "comoprodujogolpedientes", e.target.value.toUpperCase())
                    }
                  />
                </Col>
              </>
            )}

            <hr />

            <Row className="mt-2">
              <Col md={6}>
                <Form.Check
                  label="¿Se le fracturó algún diente?"
                  checked={data.fractura.fracturodiente}
                  onChange={(e) =>
                    handleNestedChange("fractura", "fracturodiente", e.target.checked)
                  }
                />
              </Col>
            </Row>

            <Row className="mt-2"></Row>
            {data.fractura.fracturodiente && (
              <>
                <Col md={6}>
                  <Form.Control
                    className="mt-2"
                    placeholder="¿Cuál?"
                    value={data.fractura.cualdientefracturo}
                    onChange={(e) =>
                      handleNestedChange("fractura", "cualdientefracturo", e.target.value.toUpperCase())
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    className="mt-2"
                    placeholder="¿Recibió tratamiento?"
                    value={data.fractura.tratamientofracturadiente}
                    onChange={(e) =>
                      handleNestedChange(
                        "fractura",
                        "tratamientofracturadiente",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </Col>
              </>
            )}
          </Row>
          <hr />

          <h6>Dificultades</h6>
          <Row className="mt-2">
            <Col md={3}>
              <Form.Check
                label="¿Tiene dificultad para hablar?"
                checked={data.dificultad.hablar}
                onChange={(e) =>
                  handleNestedChange("dificultad", "hablar", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Tiene dificultad para masticar?"
                checked={data.dificultad.masticar}
                onChange={(e) =>
                  handleNestedChange("dificultad", "masticar", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Tiene dificultad para abrir la boca?"
                checked={data.dificultad.abrirlaboca}
                onChange={(e) =>
                  handleNestedChange(
                    "dificultad",
                    "abrirlaboca",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Tiene dificultad para trgar alimentos?"
                checked={data.dificultad.tragaralimentos}
                onChange={(e) =>
                  handleNestedChange(
                    "dificultad",
                    "tragaralimentos",
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>
          <hr />
          {/* ================= ALGO ANORMAL EN ================= */}
          <h6>Ha observado algo anormal en:</h6>
          <Row className="mt-2">
            <Col md={3}>
              <Form.Check
                label="¿Los labios?"
                checked={data.anormalBoca.loslabios}
                onChange={(e) =>
                  handleNestedChange("anormalBoca", "loslabios", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿La lengua?"
                checked={data.anormalBoca.lengua}
                onChange={(e) =>
                  handleNestedChange("anormalBoca", "lengua", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿En el paladar?"
                checked={data.anormalBoca.paladar}
                onChange={(e) =>
                  handleNestedChange("anormalBoca", "paladar", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿En el piso de la boca?"
                checked={data.anormalBoca.pisoboca}
                onChange={(e) =>
                  handleNestedChange(
                    "anormalBoca",
                    "pisoboca",
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={3}>
              <Form.Check
                label="¿En el carrillo?"
                checked={data.anormalBoca.carrillo}
                onChange={(e) =>
                  handleNestedChange(
                    "anormalBoca",
                    "carrillo",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿En rebordes?"
                checked={data.anormalBoca.rebordes}
                onChange={(e) =>
                  handleNestedChange(
                    "anormalBoca",
                    "rebordes",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿En el trigono?"
                checked={data.anormalBoca.trigono}
                onChange={(e) =>
                  handleNestedChange("anormalBoca", "trigono", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿En el piso retromolar?"
                checked={data.anormalBoca.pisoretromolar}
                onChange={(e) =>
                  handleNestedChange(
                    "anormalBoca",
                    "pisoretromolar",
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>

          <hr />
          <h6>Que tipo de lesiones presenta:</h6>
          <Row className="mt-2">
            <Col md={3}>
              <Form.Check
                label="¿Manchas?"
                checked={data.lesiones.manchas}
                onChange={(e) =>
                  handleNestedChange("lesiones", "manchas", e.target.checked)
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Abultamiento de tejidos?"
                checked={data.lesiones.abultamientotejidos}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "abultamientotejidos",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Ulceraciones?"
                checked={data.lesiones.ulceras}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "ulceras",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              <Form.Check
                label="¿Ampollas?"
                checked={data.lesiones.ampollas}
                onChange={(e) =>
                  handleNestedChange("lesiones", "ampollas", e.target.checked)
                }
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Control
                className="mt-2"
                placeholder="Otras..."
                value={data.general.tipolesionesdescriba}
                onChange={(e) =>
                  handleNestedChange("general", "tipolesionesdescriba", e.target.value.toUpperCase())
                }
              />
            </Col>
          </Row>

          <hr />

          <Row className="mt-2" align-items-center>
            <Col md={3}>
              <Form.Check
                label="¿Sangran las encías?"
                checked={data.lesiones.sangranencias}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "sangranencias",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={9}>
              {data.lesiones.sangranencias && (
                <Form.Control
                  className="mt-2"
                  placeholder="¿Cuando?"
                  value={data.lesiones.sangranenciasdetalle}
                  onChange={(e) =>
                    handleNestedChange(
                      "lesiones",
                      "sangranenciasdetalle",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mt-2" align-items-center>
            <Col md={3}>
              <Form.Check
                label="¿Sale pus de algún lugar de su boca?"
                checked={data.lesiones.pus}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "pus",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={9}>
              {data.lesiones.pus && (
                <Form.Control
                  placeholder="Describa"
                  value={data.lesiones.pusdetalle}
                  onChange={(e) =>
                    handleNestedChange(
                      "lesiones",
                      "pusdetalle",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mt-2" align-items-center>
            <Col md={3}>
              <Form.Check
                label="¿Tiene movilidad en sus dientes?"
                checked={data.lesiones.movilidaddientes}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "movilidaddientes",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={9}>
              {data.lesiones.movilidaddientes && (
                <Form.Control
                  placeholder="¿Donde?"
                  value={data.lesiones.movilidaddientesdetalle}
                  onChange={(e) =>
                    handleNestedChange(
                      "lesiones",
                      "movilidaddientesdetalle",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
            
          </Row>
          <Row className="mt-2" align-items-center>
            <Col md={3}>
              <Form.Check
                label="¿Al morder siente alto los dientes?"
                checked={data.lesiones.altodientes}
                onChange={(e) =>
                  handleNestedChange(
                    "lesiones",
                    "altodientes",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={9}>
              {data.lesiones.altodientes && (
                <Form.Control
                  placeholder="Describa"
                  value={data.lesiones.altodientesdetalle}
                  onChange={(e) =>
                    handleNestedChange(
                      "lesiones",
                      "altodientesdetalle",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <hr />
          <Row className="mt-2" align-items-center>
            <Col md={3}>
              <Form.Check
                label="¿Ha tenido la cara hinchada?"
                checked={data.general.carahinchada}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "carahinchada",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={3}>
              {data.general.carahinchada && (
                <Form.Check
                  label="¿Se puso hielo?"
                  checked={data.general.carahinchadapusohielo}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "carahinchadapusohielo",
                      e.target.checked,
                    )
                  }
                />
              )}
            </Col>
            {data.general.carahinchada && (
              <Col md={3}>
                <Form.Check
                  label="¿Se puso calor?"
                  checked={data.general.carahinchadapusocalor}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "carahinchadapusocalor",
                      e.target.checked,
                    )
                  }
                />
              </Col>
            )}

            <Col md={3}>
              {data.general.carahinchada && (
                <Form.Control
                  placeholder="Otros.."
                  value={data.general.carahinchadapusootros}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "carahinchadapusootros",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <hr />
          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1:MOMENTOS DE AZUCAR DIARIO  === */}
            <Col md={6}>
              <Form.Label>Momentos de azucar diarios: </Form.Label>
            </Col>

            <Col md={6}>
              <Form.Label>Indique el indíce de placas: </Form.Label>
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === INDICE DE PLACAS  === */}

            <Col md={6}>
              <Form.Control
                placeholder="Describa los momentos..."
                value={data.general.momentosazucardiarios}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "momentosazucardiarios",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Indique el indíce"
                value={data.general.indicedeplacas}
                onChange={(e) =>
                  handleNestedChange("general", "indicedeplacas", e.target.value)
                }
              />
            </Col>
          </Row>

          <h6>Estado de higiene bucal:</h6>
          <Row className="mt-2">
            <Col md={3}>
              <Form.Select
                value={data.general.higienebucalestado || ""}
                onChange={(e) =>
                  handleNestedChange("general", "higienebucalestado", e.target.value)
                }
              >
                <option value="">Seleccione...</option>
                <option value="MUY_BUENO">MUY BUENO</option>
                <option value="BUENO">BUENO</option>
                <option value="DEFICIENTE">DEFICIENTE</option>
                <option value="MALO">MALO</option>
              </Form.Select>
            </Col>
          </Row>

          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="motivoConsulta"
              value={data.general.observaciones}
              onChange={(e) =>
                  handleNestedChange("general", "observaciones", e.target.value.toUpperCase())
                }
            />
          </Form.Group>
        </Form>
        <hr />
        <Row>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="success"
              style={{
                height: "26px", // más alto
                fontSize: "10px", // texto más grande
                padding: "0px 20px", // más espacio interno
                whiteSpace: "nowrap",
              }}
             onClick={(event) => {
                  grabarAnamnesis();
                  event.preventDefault();
                }}
            >
              GRABAR - ANAMNESIS ODONTOLOGICA
            </Button>

            {/* Botón */}
            {/*  <Button
                    variant="primary"
                    size="sm"
                    style={{
                      height: "20px", // más alto
                      fontSize: "10px", // texto más grande
                      padding: "0px 20px", // más espacio interno
                      marginLeft: "30px",
                      whiteSpace: "nowrap",
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      //limpiar();
                    }}
                  >
                    LIMPIAR
                  </Button> */}
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AnamnesisOdontologica;
