import React, { useEffect } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";

import { historiaclinicaService } from "../../services/historiaclinica.service";

function AnamnesisMedica({ data, setData, idpaciente }) {
  /*const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  }; */

  const handleNestedChange = (group, name, value) => {
    setData({
      ...data,
      [group]: {
        ...data[group],
        [name]: value,
      },
    });
  };

const initialData = {
  familia: {
    padreVive: false,
    padreEnfermedad: "",
    madreVive: false,
    madreEnfermedad: "",
    hermanos: false,
    hermanosDetalle: "",
  },

  general: {
    tieneEnfermedad: false,
    detalleEnfermedad: "",
    tratamientoMedico: false,
    detalleTratamiento: "",
    medicacionHabitual: "",
    medicacionultimoscincoaniosdetalle: "",
    realizaDeporte: false,
    detalleRealizaDeporte: "",
    tieneMalestarDeporte: false,
    detalleMalestarDeporte: "",
    enfermedadInfectocontagiosa: false,
    detalleEnfermedadInfectocontagiosa: "",
    otraEnfermedad: false,
    detalleOtraEnfermedad: "",
    medicoRecomendacion: false,
    detalleMedicoRecomendacion: "",
    tratamientoHomeopaticoAcupuntura: false,
    tratamientohomeopaticoacupunturadescriba: "",
    medicoClinico: "",
    clinicaDerivacion: "",
    observaciones: "",
    esalergico: false,
  },

  alergias: {
    penicilinasi: false,
    penicilina: "",
    anestesiasi: false,
    anestesia: "",
    otras: false,
    detalle: "",
  },

 patologias: {
  cicatrizaBien: false,
  sangraMucho: false,
  colageno: false,
  detalleColageno: "",
  fiebreReumatica: false,
  detalleFiebreReumatica: "",

  diabetes: false,
  diabetesDetalle: "",
  diabetesControlado: false,
  diabetesControladoMedicacion: "",

  cardiaco: false,
  detalleCardiaco: "",
  anticoagulante: false,
  detalleAnticoagulante: "",
  chagas: false,
  detalleChagas: "",
  hepatitis: false,
  detalleHepatitis: "",
  hepatico: false,
  detalleHepatico: "",
  epileptico: false,

  // 🔽 NUEVOS
  detalleEpileptico: "",
  cirugias: false,
  detalleCirugias: "",
  cirugiasHacecuantoTiempo: "",
  respiratorio: false,
  detalleRespiratorio: "",
  embarazada: false,
  embarazadacuantosmeses: "",
  presionAlta: false,
  sifilis: false,
  gonorrea: false,
  fuma: false,
  transfusiones: false,
  ulcera: false,
  convulsiones: false,
  renal: false,
},

};

const limpiarFormulario = () => {
  setData(initialData);
};
  async function grabarAnamnesis() {
   
    
      const payload = {
        idpaciente: idpaciente,

        // ================= FAMILIA =================72
        padrevive: data.familia.padreVive,
        padreenfermedad: data.familia.padreEnfermedad,
        madrevive: data.familia.madreVive,
        madreenfermedad: data.familia.madreEnfermedad,
        tienehermanos: data.familia.hermanos,
        hermanosenfermedad: data.familia.hermanosDetalle,

        // ================= GENERALES =================66
        sufrealgunaenfermedad: data.general.tieneEnfermedad,
        sufrealgunaenfermedaddetalle: data.general.detalleEnfermedad,
        tratamientomedico: data.general.tratamientoMedico,
        tratamientomedicodetalle: data.general.detalleTratamiento,
        medicamentosconsumedetalle: data.general.medicacionHabitual,
        medicacionultimoscincoaniosdetalle: data.general.medicacionultimoscincoaniosdetalle,
        realizaalgundeporte: data.general.realizaDeporte,
        realizaalgundeportedetalle: data.general.detalleRealizaDeporte,
        deportemalestaralrealizarlo: data.general.tieneMalestarDeporte,
        deportemalestaralrealizarlodetalle: data.general.detalleMalestarDeporte,

        enfermedadinfectocontagiosa: data.general.enfermedadInfectocontagiosa,
        enfermedadinfectocontagiosadescriba: data.general.detalleEnfermedadInfectocontagiosa,
        enfermedadalgunaotra: data.general.otraEnfermedad,
        enfermedadalgunaotradetalle: data.general.detalleOtraEnfermedad,

        recomendacionmedicoquieredejar: data.general.medicoRecomendacion,
        recomendacionmedicoquieredejardetalle: data.general.detalleMedicoRecomendacion,
        tratamientohomeopaticoacupuntura: data.general.tratamientoHomeopaticoAcupuntura,
        tratamientohomeopaticoacupunturadescriba: data.general.tratamientohomeopaticoacupunturadescriba,

        medicoclinico: data.general.medicoClinico,
        clinicahostpitalderivacion: data.general.clinicaDerivacion,
        observaciones: data.general.observaciones,
        // ================= ALERGIAS =================45
        esalergico: data.general.esalergico,
        penicilinasi: data.alergias.penicilinasi,
        penicilina: data.alergias.penicilina ? "PENICILINA" : null,
        anestesiasi: data.alergias.anestesiasi,
        anestesia: data.alergias.anestesia ? "ANESTESIA" : null,
        otrasalergias: data.alergias.otras,
        detallealergias: data.alergias.detalle,
        // ================= PATOLOGIAS =================38
        cicatrizabien: data.patologias.cicatrizaBien,
        sangramucho: data.patologias.sangraMucho,
        colageno: data.patologias.colageno,
        colagenodetalle: data.patologias.detalleColageno,
        fiebrereumatica: data.patologias.fiebreReumatica,
        fiebrereumaticadetalle: data.patologias.detalleFiebreReumatica,

        diabetico: data.patologias.diabetes,
        diabeticodetalle: data.patologias.diabetesDetalle,
        diabeticocontrolado: data.patologias.diabetesControlado,

        diabeticocontroladomedicacion: data.patologias.diabetesControladoMedicacion, 
        cardiaco: data.patologias.cardiaco,
        cardiacodetalle: data.patologias.detalleCardiaco,
        anticoagulante: data.patologias.anticoagulante,
        anticoagulantedetalle: data.patologias.detalleAnticoagulante,
        chagas: data.patologias.chagas,
        chagasdetalle: data.patologias.detalleChagas,
        hepatitis: data.patologias.hepatitis,
        hepatitisdetalle: data.patologias.detalleHepatitis,
        hepatico: data.patologias.hepatico,
        hepaticodetalle: data.patologias.detalleHepatico,
        epileptico: data.patologias.epileptico,
      epilepticodetalle: data.patologias.detalleEpileptico,
      cirugias: data.patologias.cirugias,
      cirugiasdescripcion: data.patologias.detalleCirugias,
      cirugiascuantotiempo: data.patologias.cirugiasHacecuantoTiempo,
      respiratorio: data.patologias.respiratorio,
      respiratoridetalle: data.patologias.detalleRespiratorio,
      embarazada: data.patologias.embarazada,
      embarazadacuantosmeses: data.patologias.embarazadacuantosmeses,
      presionalta: data.patologias.presionAlta,
      sifilis: data.patologias.sifilis,
      gonorrea: data.patologias.gonorrea,
      fuma: data.patologias.fuma,
      transfusiones: data.patologias.transfusiones,
      ulceragastrica: data.patologias.ulcera,
      convulsiones: data.patologias.convulsiones,
      renales: data.patologias.renal,
    };

    try {
     
      //console.log(idhc)
     await historiaclinicaService.GrabarAnamnesisMedica(payload);

      setModalMessage("ALTA EXITOSA");
    } catch (error) {
      /*  modalDialogService.Alert(error?.response?.data?.message ?? error.toString()) */
      return;
    }
  }

useEffect(() => {
  if (!data) {
    limpiarFormulario();
  }
}, [data]);




  return (
    <Card className="mb-3">
      <Card.Body style={{ backgroundColor: "#e1f5fe" }}>
        <Form>
          {/* ================= ANTECEDENTES FAMILIARES ================= */}
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
                GRABAR - ANAMNESIS MEDICA
              </Button>
            </div>
          </Row>
          <h6>Antecedentes familiares</h6>

          <Row className="mb-2 align-items-center">
            <Col md={3}>
              <div>
                <Form.Label className="mb-0" style={{ marginRight: "50px" }}>
                  Padre
                </Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Vive"
                  name="padreVive"
                  checked={data.familia.padreVive === true}
                  onChange={() =>
                    handleNestedChange("familia", "padreVive", true)
                  }
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Fallecido"
                  name="padreVive"
                  checked={data.familia.padreVive === false}
                  onChange={() =>
                    handleNestedChange("familia", "padreVive", false)
                  }
                />
              </div>
            </Col>

            <Col md={9}>
              <Form.Control
                placeholder="Enfermedad que padece o padeció"
                value={data.familia.padreEnfermedad.toUpperCase()}
                onChange={(e) =>
                  handleNestedChange(
                    "familia",
                    "padreEnfermedad",
                    e.target.value,
                  )
                }
              />
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            <Col md={3}>
              <div>
                <Form.Label className="mb-0" style={{ marginRight: "42px" }}>
                  Madre
                </Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Vive"
                  name="madreVive"
                  checked={data.familia.madreVive === true}
                  onChange={() =>
                    handleNestedChange("familia", "madreVive", true)
                  }
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Fallecida"
                  name="madreVive"
                  checked={data.familia.madreVive === false}
                  onChange={() =>
                    handleNestedChange("familia", "madreVive", false)
                  }
                />
              </div>
            </Col>

            <Col md={9}>
              <Form.Control
                placeholder="Enfermedad que padece o padeció"
                value={data.familia.madreEnfermedad}
                onChange={(e) =>
                  handleNestedChange(
                    "familia",
                    "madreEnfermedad",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={3}>
              <div>
                <Form.Label className="mb-0" style={{ marginRight: "18px" }}>
                  Hermanos
                </Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Tiene"
                  name="hermanos"
                  checked={data.familia.hermanos === true}
                  onChange={() =>
                    handleNestedChange("familia", "hermanos", true)
                  }
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No tiene"
                  name="hermanos"
                  checked={data.familia.hermanos === false}
                  onChange={() =>
                    handleNestedChange("familia", "hermanos", false)
                  }
                />
              </div>
            </Col>

            <Col md={9}>
              <Form.Control
                placeholder="¿Sanos? / Enfermedades"
                value={data.familia.hermanosDetalle}
                onChange={(e) =>
                  handleNestedChange(
                    "familia",
                    "hermanosDetalle",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
          </Row>

          <hr />

          {/* ================= ENFERMEDADES GENERALES ================= */}

          <h6>Antecedentes personales</h6>

          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Sufre alguna enfermedad?"
                name="tieneEnfermedad"
                checked={data.general.tieneEnfermedad}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "tieneEnfermedad",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={8}>
              {data.general.tieneEnfermedad && (
                <Form.Control
                  placeholder="¿Cuál?"
                  name="detalleEnfermedad"
                  value={data.general.detalleEnfermedad}
                  style={{backgroundColor: "white"}}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleEnfermedad",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="Hace algún tratamiento médico"
                name="tratamientoMedico"
                checked={data.general.tratamientoMedico}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "tratamientoMedico",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={8}>
              {data.general.tratamientoMedico && (
                <Form.Control
                  className="mt-2"
                  placeholder="¿Cuál?"
                  name="detalleTratamiento"
                  value={data.general.detalleTratamiento}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleTratamiento",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Medicamentos que consume habitualmente</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="medicacionHabitual"
                value={data.general.medicacionHabitual}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "medicacionHabitual",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Medicación últimos 5 años</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="medicacionultimoscincoaniosdetalle"
                value={data.general.medicacionultimoscincoaniosdetalle}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "medicacionultimoscincoaniosdetalle",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Realiza algún deporte?"
                name="realizaDeporte"
                checked={data.general.realizaDeporte}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "realizaDeporte",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={8}>
              {data.general.realizaDeporte && (
                <Form.Control
                  placeholder="¿Cuál?"
                  name="detalleRealizaDeporte"
                  value={data.general.detalleRealizaDeporte}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleRealizaDeporte",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tiene algún malestar al realizarlo?"
                name="tieneMalestarDeporte"
                checked={data.general.tieneMalestarDeporte}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "tieneMalestarDeporte",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={8}>
              {data.general.tieneMalestarDeporte && (
                <Form.Control
                  placeholder="¿Cuál?"
                  name="detalleMalestarDeporte"
                  value={data.general.detalleMalestarDeporte}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleMalestarDeporte",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <hr />

          {/* ================= ALERGIAS ================= */}

          <h6>Alergias</h6>
          <Form.Check
            type="checkbox"
            label="¿Es alérgico a alguna droga?"
            checked={data.general.esalergico}
            onChange={(e) =>
              handleNestedChange("general", "esalergico", e.target.checked)
            }
          />

          {data.general.esalergico && (
            <>
              <Row className="mt-2">
                <Col md={4}>
                  <Form.Check
                    label="Anestesia"
                    checked={data.alergias.anestesiasi}
                    onChange={(e) =>
                      handleNestedChange(
                        "alergias",
                        "anestesiasi",
                        e.target.checked,
                      )
                    }
                  />
                </Col>
                <Col md={4}>
                  <Form.Check
                    label="Penicilina"
                    checked={data.alergias.penicilinasi}
                    onChange={(e) =>
                      handleNestedChange(
                        "alergias",
                        "penicilinasi",
                        e.target.checked,
                      )
                    }
                  />
                </Col>
              </Row>

              <Form.Control
                className="mt-2"
                placeholder="Otras alergias"
                value={data.alergias.otras.toUpperCase()}
                onChange={(e) =>
                  handleNestedChange("alergias", "otras", e.target.value)
                }
              />
              <Form.Control
                className="mt-2"
                placeholder="Detalle alergias"
                value={data.alergias.detalle.toUpperCase()}
                onChange={(e) =>
                  handleNestedChange("alergias", "detalle", e.target.value)
                }
              />
            </>
          )}

          <hr />

          {/* ================= PATOLOGÍAS CLÍNICAS ================= */}
          <h6>Patologías clínicas</h6>
          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Cuando se lastima, cicatriza bien?"
                name="cicatrizaBien"
                checked={data.patologias.cicatrizaBien}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "cicatrizaBien",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={"8"}>
              {data.patologias.cicatrizaBien && (
                <Form.Control
                  placeholder="Describa si sangra mucho."
                  name="sangraMucho"
                  value={data.patologias.sangraMucho}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "sangraMucho",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tiene problema de colageno (hiperlaxitud?"
                name="colageno"
                checked={data.patologias.colageno}
                onChange={(e) =>
                  handleNestedChange("patologias", "colageno", e.target.checked)
                }
              />
            </Col>

            <Col md={8}>
              {data.patologias.colageno && (
                <Form.Control
                  placeholder="Detalle mas sobre su problema con el colageno."
                  name="detalleColageno"
                  value={data.patologias.detalleColageno}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleColageno",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tiene antecedentes de fiebre reumática?"
                name="fiebreReumatica"
                checked={data.patologias.fiebreReumatica}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "fiebreReumatica",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={8}>
              {data.patologias.fiebreReumatica && (
                <Form.Control
                  placeholder="¿está tomando alguna medicación para la fiebre reumática?"
                  name="detalleFiebreReumatica"
                  value={data.patologias.detalleFiebreReumatica}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleFiebreReumatica",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ES DIABÉTICO === */}
            <Col md={3}>
              <Form.Check
                type="checkbox"
                label="Es diabético"
                checked={data.patologias.diabetes}
                onChange={(e) =>
                  handleNestedChange("patologias", "diabetes", e.target.checked)
                }
              />
            </Col>

            {/* === NIVEL 2: ESTÁ CONTROLADO === */}
            <Col md={3}>
              {data.patologias.diabetes && (
                <>
                  <Form.Label className="mb-0 me-2">¿Controlado?</Form.Label>
                  <Form.Check
                    inline
                    type="radio"
                    label="Sí"
                    name="diabetesControlado"
                    checked={data.patologias.diabetesControlado === true}
                    onChange={() =>
                      handleNestedChange(
                        "patologias",
                        "diabetesControlado",
                        true,
                      )
                    }
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="diabetesControlado"
                    checked={data.patologias.diabetesControlado === false}
                    onChange={() =>
                      handleNestedChange(
                        "patologias",
                        "diabetesControlado",
                        false,
                      )
                    }
                  />
                </>
              )}
            </Col>

            {/* === NIVEL 3: DETALLE === */}
            <Col md={6}>
              {data.patologias.diabetes && (
                <Form.Control
                  placeholder="¿Con qué? (medicación, dieta, insulina, etc.)"
                  value={data.patologias.diabetesControladoMedicacion.toUpperCase()}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "diabetesControladoMedicacion",
                      e.target.value,
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ES DIABÉTICO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tiene algún problema cardíaco?"
                checked={data.patologias.cardiaco}
                onChange={(e) =>
                  handleNestedChange("patologias", "cardiaco", e.target.checked)
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE === */}
            <Col md={8}>
              {data.patologias.cardiaco && (
                <Form.Control
                  placeholder="¿Cúal?"
                  value={data.patologias.detalleCardiaco}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleCardiaco",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ES DIABÉTICO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Toma seguido aspirina y/o anticoagulante?"
                checked={data.patologias.anticoagulante}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "anticoagulante",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE === */}
            <Col md={8}>
              {data.patologias.anticoagulante && (
                <Form.Control
                  placeholder="¿Con que frecuencia?"
                  value={data.patologias.detalleAnticoagulante}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleAnticoagulante",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ES DIABÉTICO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tiene chagas?"
                checked={data.patologias.chagas}
                onChange={(e) =>
                  handleNestedChange("patologias", "chagas", e.target.checked)
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE === */}
            <Col md={8}>
              {data.patologias.chagas && (
                <Form.Control
                  placeholder="¿está en tratamiento?"
                  value={data.patologias.detalleChagas}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleChagas",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: TUVO HEPATITIS === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tuvo hepatitis?"
                checked={data.patologias.hepatitis}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "hepatitis",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE === */}
            <Col md={8}>
              {data.patologias.hepatitis && (
                <Form.Control
                  placeholder="Describa que tipo de hepatitís: A, B o C."
                  value={data.patologias.detalleHepatitis}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleHepatitis",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ALGUN PROBLEMA HEPATICO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tuvo algún problema hepático?"
                checked={data.patologias.hepatico}
                onChange={(e) =>
                  handleNestedChange("patologias", "hepatico", e.target.checked)
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={8}>
              {data.patologias.hepatico && (
                <Form.Control
                  placeholder="¿Cuál?"
                  value={data.patologias.detalleHepatico}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleHepatico",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ALGUN PROBLEMA HEPATICO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Es epiléptico?"
                checked={data.patologias.epileptico}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "epileptico",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={8}>
              {data.patologias.epileptico && (
                <Form.Control
                  placeholder="¿Medicación que toma?"
                  value={data.patologias.detalleEpileptico}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleEpileptico",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: TUVO OPERACIONES === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Fué operado algunas vez?"
                checked={data.patologias.cirugias}
                onChange={(e) =>
                  handleNestedChange("patologias", "cirugias", e.target.checked)
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE OPERACIONES === */}
            <Col md={4}>
              {data.patologias.cirugias && (
                <Form.Control
                  placeholder="¿De qué?"
                  value={data.patologias.detalleCirugias}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleCirugias",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
            <Col md={4}>
              {data.patologias.cirugias && (
                <Form.Control
                  placeholder="¿Hace cuanto tiempo?"
                  value={data.patologias.cirugiasHacecuantoTiempo}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "cirugiasHacecuantoTiempo",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ALGUN PROBLEMA RESPIRATORIO === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Tuvo algún problema respiratorio?"
                checked={data.patologias.respiratorio}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "respiratorio",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={8}>
              {data.patologias.respiratorio && (
                <Form.Control
                  placeholder="¿Detalle cuál?"
                  value={data.patologias.detalleRespiratorio}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "detalleRespiratorio",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: ESTA EMBARAZADA === */}
            <Col md={4}>
              <Form.Check
                type="checkbox"
                label="¿Está embarazada?"
                checked={data.patologias.embarazada}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "embarazada",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={8}>
              {data.patologias.embarazada && (
                <Form.Control
                  placeholder="¿De cuantos meses?"
                  value={data.patologias.embarazadacuantosmeses}
                  onChange={(e) =>
                    handleNestedChange(
                      "patologias",
                      "embarazadacuantosmeses",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Check
                label="¿Tiene presión alta?"
                type="checkbox"
                checked={data.patologias.presionAlta}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "presionAlta",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={4}>
              <Form.Check
                label="¿Se hizo alguna vez transfusiones?"
                type="checkbox"
                checked={data.patologias.transfusiones}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "transfusiones",
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col md={4}>
              <Form.Check
                label="¿Tuvo o tiene problemas renales?"
                type="checkbox"
                checked={data.patologias.renal}
                onChange={(e) =>
                  handleNestedChange("patologias", "renal", e.target.checked)
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Check
                label="¿Ha tenido sifilis?"
                type="checkbox"
                checked={data.patologias.sifilis}
                onChange={(e) =>
                  handleNestedChange("patologias", "sifilis", e.target.checked)
                }
              />
            </Col>
            <Col md={4}>
              <Form.Check
                label="Úlcera gástrica"
                type="checkbox"
                checked={data.patologias.ulcera}
                onChange={(e) =>
                  handleNestedChange("patologias", "ulcera", e.target.checked)
                }
              />
            </Col>

            <Col md={4}>
              <Form.Check
                label="¿Ha tenido gonorrea?"
                type="checkbox"
                checked={data.patologias.gonorrea}
                onChange={(e) =>
                  handleNestedChange("patologias", "gonorrea", e.target.checked)
                }
              />
            </Col>
            {/* <Col md={4}>
              <Form.Check 
                  label="Problemas respiratorios"
                   type="checkbox"
                  checked={data.patologias.respiratorio}
                  onChange={(e) =>
                    handleNestedChange("patologias", "respiratorio", e.target.checked)
                  }  />
            </Col> */}
          </Row>

          {/* ================= HÁBITOS Y OTROS ================= */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Check
                label="¿Fuma?"
                type="checkbox"
                checked={data.patologias.fuma}
                onChange={(e) =>
                  handleNestedChange("patologias", "fuma", e.target.checked)
                }
              />
            </Col>

            <Col md={4}>
              <Form.Check
                label="¿Tuvo convulsiones?"
                type="checkbox"
                checked={data.patologias.convulsiones}
                onChange={(e) =>
                  handleNestedChange(
                    "patologias",
                    "convulsiones",
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>

          <hr />
          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: OTRA ENFERMEDAD INFECTOCONTAGIOSA === */}
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="¿Otra enfermedad infectocontagiosa?"
                checked={data.general.enfermedadInfectocontagiosa}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "enfermedadInfectocontagiosa",
                    e.target.checked,
                  )
                }
              />
            </Col>

            <Col md={6}>
              {data.general.enfermedadInfectocontagiosa && (
                <Form.Control
                  placeholder="Describa cuál"
                  value={data.general.detalleEnfermedadInfectocontagiosa}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleEnfermedadInfectocontagiosa",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: OTRA ENFERMEDAD  === */}
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="¿Hay alguna otra enfermedad que quiera dejar constancia?"
                checked={data.general.otraEnfermedad}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "otraEnfermedad",
                    e.target.checked,
                  )
                }
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={6}>
              {data.general.otraEnfermedad && (
                <Form.Control
                  placeholder="Describa cuál"
                  value={data.general.detalleOtraEnfermedad}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleOtraEnfermedad",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: OTRA ENFERMEDAD  === */}
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="¿Alguna recomendación de su médico que quiera dejar constancia?"
                checked={data.general.medicoRecomendacion}
                onChange={(e) =>{
                  console.log("pasa por aca")
                  handleNestedChange(
                    "general",
                    "medicoRecomendacion",
                    e.target.checked,
                  )
                  
                
                }}
              />
            </Col>

            <Col md={6}>
              {data.general.medicoRecomendacion && (
                <Form.Control
                  placeholder="Describa cuál"
                  value={data.general.detalleMedicoRecomendacion}
                  onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleMedicoRecomendacion",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              )}
            </Col>
          </Row>

          <Row className="mb-2 align-items-center">
            {/* === NIVEL 1: TRATAMIENTO HOMEOPATICO  === */}
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="¿Realiza algún tipo de tratamiento homeopático, Acupuntura, otros?"
                checked={data.general.tratamientoHomeopaticoAcupuntura}
                onChange={(e) => {
                  
                     handleNestedChange("general", "tratamientoHomeopaticoAcupuntura", e.target.checked);
                  
                }}
              />
            </Col>

            {/* === NIVEL 3: DETALLE HEPATICO === */}
            <Col md={6}>
              {data.general.tratamientoHomeopaticoAcupuntura && (
                <Form.Control
                  placeholder="Describa cuál"
                  value={data.general.detalleTratamientoHomeopatico}
                  onChange={(e) => {
                    handleNestedChange(
                      "general",
                      "detalleTratamientoHomeopatico",
                      e.target.value.toUpperCase(),
                    );
                  }}

                  /* onChange={(e) =>
                    handleNestedChange(
                      "general",
                      "detalleTratamientoHomeopatico",
                      e.target.value.toUpperCase(),
                    )
                    
                  } */
                />
              )}
            </Col>
          </Row>

          <hr />
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Médico clínico de cabecera</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="medicoClinico"
                value={data.general.medicoClinico}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "medicoClinico",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
            <Col md={6}>
              <Form.Label>Clínica/Hospital para derivación</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="clinicaDerivacion"
                value={data.general.clinicaDerivacion}
                onChange={(e) =>
                  handleNestedChange(
                    "general",
                    "clinicaDerivacion",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </Col>
          </Row>
          <hr />
          <Form.Label className="mt-2">Observaciones</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="observaciones"
            value={data.general.observaciones}
            onChange={(e) =>
              handleNestedChange(
                "general",
                "observaciones",
                e.target.value.toUpperCase(),
              )
            }
          />
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
              GRABAR - ANAMNESIS MEDICA
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
export default AnamnesisMedica;
