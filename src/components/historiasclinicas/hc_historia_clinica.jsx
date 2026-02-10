import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col, InputGroup } from "react-bootstrap";

import { historiaclinicaService } from "../../services/historiaclinica.service";

import DatosPacienteHeader from "./hc_datos_paciente_header";
import AnamnesisMedica from "./hc_anamnesis_medica";
import AnamnesisOdontologica from "./hc_anamnesis_odontologica";
import ExploracionClinica from "./hc_exploracion_clinica";
import DiagnosticoPresuntivo from "./hc_diagnostico_presuntivo";
import PlanTratamiento from "./hc_plan_tratamiento";
import Evolucion from "./hc_evolucion";
import { pacientesService } from "/src/services/pacientes.service";

import "../../css/historia_clinica.css";

import MdlBuscarPacientes from "../pacientes/buscarpaciente";

function HC_HistoriaClinica() {
  const [mdlBuscarPacientes, setModalBuscarPacientes] = useState(false);

  const [idPaciente, setIDPaciente] = useState(null);

  const [diagnosticoPresuntivo, setDiagnosticoPresuntivo] = useState("");

   const [apellidoNombresPaciente, setApellidoNombresPaciente] = useState("");

      const [nroHC, setNroHC] = useState(0);



  const [evolucion, setEvolucion] = useState([]);

  const [mostrarTabs, setMostrarTabs] = useState(false);

  const [tabActivo, setTabActivo] = useState(null);

  const [anamnesis, setAnamnesis] = useState(null);
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState([]);
  const [alergias, setAlergias] = useState([]);
  const [patologiasClinicas, setPatologiasClinicas] = useState([]);

  const [resetKey, setResetKey] = useState(0);


  const [items, setItems] = useState([]);

  const openMdlBuscarPacientes = () => {
    setModalBuscarPacientes(true);
  };

  const closeMdlBuscarPacientes = () => {
    setModalBuscarPacientes(false);
  };

const initialAnamnesisMedica = {
  general: {
    tieneEnfermedad: false,
    detalleEnfermedad: "",

    recomendacionMedico: false,
    detalleRecomendacionMedico: "",

    tratamientoMedico: false,
    detalleTratamiento: "",

    realizaDeporte: false,
    detalleRealizaDeporte: "",

    tieneMalestarDeporte: false,
    detalleMalestarDeporte: "",

    medicacionHabitual: "",
    medicacionUltimosAnios: "",

    embarazo: false,
    mesesEmbarazo: "",

    enfermedadInfectocontagiosa: false,
    detalleEnfermedadInfectocontagiosa: "",

    otraEnfermedad: false,
    detalleOtraEnfermedad: "",

    medicoRecomendacion: false,
    detalleMedicoRecomendacion: "",

    medicacionultimoscincoaniosdetalle: "",

    tratamientoHomeopaticoAcupuntura: false,
    detalleTratamientoHomeopatico: "",

    esalergico: false,

    medicoClinico: "",
    clinicaDerivacion: "",

    observaciones: "",
  },

  familia: {
    padreVive: true,
    padreEnfermedad: "",

    madreVive: true,
    madreEnfermedad: "",

    hermanos: true,
    hermanosDetalle: "",
  },

  alergias: {
    anestesiasi: false,
    anestesia: "",

    penicilinasi: false,
    penicilina: "",

    otras: "",
    detalle: "",
  },

  patologias: {
    cicatrizaBien: false,
    sangraMucho: "",

    colageno: false,
    detalleColageno: "",

    fiebreReumatica: false,
    detalleFiebreReumatica: "",

    diabetes: false,
    diabetesControlado: false,
    diabetesDetalle: "",
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

    transfusiones: false,
    ulcera: false,

    fuma: false,

    renal: false,
    respiratorios: false,
    convulsiones: false,
  }
};


const initialAnamnesisOdontologica = {
    
    general:{
      porqueasistioconsulta: "",
      momentosazucardiarios: "",
      indicedeplacas: "",
      tipolesionesdescriba: "",
      higienebucalestado: "",
     
      carahinchada: false,
      carahinchadapusohielo: false,
      carahinchadapusocalor: false,
      carahinchadapusootros: "",
      momentosazucardiarios: "",
      indicedeplacas: "",
      observaciones: "",
    },

    consultasPrevias: {
      consultootroprofesional: false,
      consultootroprofesionaldetalle: "",
      tomomedicamento: false,
      describamedicamento: "",
      desdecuandomedicamento: "",
      obtuvoresultadomedicamento: false,
    },
 
    dolor: {

      hatenidodolor: false,
      suave: false,
      moderado: false,
      intenso: false,
      temporario: false,
      intermitente: false,
      continuo: false,
      espontaneo: false,
      provocado: false,
      alfrio: false,
      alcalor: false,

      localizadodolor: "",
      irradiadodolor: "",
      calmoalgodolor: "",
    },

    golpe: {
      golpedientes: false,
      cuandogolpedientes: "",
      comoprodujogolpedientes: "",
    },

    fractura: {
      fracturodiente: false,
      cualdientefracturo: "",
      tratamientofracturadiente: "",
    },

    dificultad: {
      hablar: false,
      masticar: false,
      abrirlaboca: false,
      tragaralimentos: false,
    },

    anormalBoca: {
      loslabios: false,
			carrillo: false,
			lengua: false,
			rebordes: false,
			paladar: false,
			trigono: false,
			pisoboca: false,
			pisoretromolar: false,
    },

    lesiones: {

	    manchas: false,
			abultamientotejidos: false,
			ulceras: false,
			ampollas: false,
			sangranencias: false,
			sangranenciasdetalle: "",
			pus: false,
			pusdetalle: "",
			movilidaddientes: false,
			movilidaddientesdetalle: "",
			altodientes: false,
			altodientesdetalle: "",

    },
 
};


const [anamnesisMedica, setAnamnesisMedica] = useState(initialAnamnesisMedica);


  const [anamnesisOdonto, setAnamnesisOdonto] = useState(initialAnamnesisOdontologica);

  const [exploracionClinica, setExploracionClinica] = useState({
    labios: "",
    lengua: "",
    paladar: "",
    pisoBoca: "",
    carrillos: "",
    rebordes: "",
    trigono: "",

    lesiones: {
      manchas: false,
      abultamientos: false,
      ulceraciones: false,
      ampollas: false,
      otras: "",
    },

    sangrado: false,
    sangradoCuando: "",

    pus: false,
    pusDonde: "",

    movilidad: false,
    dientesAltos: false,

    caraHinchada: false,
    caraHinchadaDetalle: "",

    azucarDiaria: "",
    indicePlaca: "",
    estadoHigiene: "",

    sarro: false,
    enfermedadPeriodontal: false,
  });

  const [planTratamiento, setPlanTratamiento] = useState([
    {
      codigo: "",
      prestacion: "",
      pieza: "",
      observaciones: "",
    },
  ]);

  const recibirDatoDelHijo = (datoRecibido) => {
    if (datoRecibido > 0) {
      setIDPaciente(datoRecibido);
      BuscarPaciente(datoRecibido);

      cargarAnamnesis(datoRecibido);
      cargarAnamnesisOdontologica(datoRecibido);

      setMostrarTabs(true);
      setTabActivo("anamnesisMedica");
    }
  };

  async function BuscarPaciente(idpaciente) {
    try {
      const data = await pacientesService.BuscarPorId(idpaciente);
      // Asignar los valores recibidos a los estados del formulario
      setApellidoNombresPaciente(data[0].Apellido + ', ' + data[0].Nombres)
      setNroHC(data[0].NroDocumento)
      setItems(data); // Asignar los datos a `Items`


    } catch (error) {
      console.error("Error al buscar paciente:", error);
    }

    //generar array de las páginas para mostrar en select del paginador
  }

  const cargarAnamnesis = async (idpaciente) => {
   

    const data = await historiaclinicaService.getHCAnamnesisMedicas(idpaciente);

    const noHayDatos =
      !data.anamnesis &&
      data.alergias.length === 0 &&
      data.antecedentesFamiliares.length === 0 &&
      data.patologiasClinicas.length === 0;

    if (noHayDatos) {
     
      return;
    } else {
      asignarAnamnesis(anamnesisMedica, data.anamnesis);
      asignarAMAntecedentesFamiliares(
        anamnesisMedica,
        data.antecedentesFamiliares,
      );
      asignarAMAlergias(anamnesisMedica, data.alergias);
      asignarAMPatologiasClinicas(anamnesisMedica, data.patologiasClinicas);

      setAnamnesis(data.anamnesis);
      setAntecedentesFamiliares(data.antecedentesFamiliares);
      setAlergias(data.alergias);
      setPatologiasClinicas(data.patologiasClinicas);


    }
  };

  
  const cargarAnamnesisOdontologica = async (idpaciente) => {
   

    const data = await historiaclinicaService.getHCAnamnesisOdontologica(idpaciente);

    const noHayDatos =
      !data.anamnesis &&
      data.general.length === 0 &&
      data.consultasPrevias.length === 0 &&
      data.dolor.length === 0 &&
      data.golpe.length === 0 &&
      data.fractura.length === 0 &&
      data.dificultad.length === 0 &&
      data.anormalBoca.length === 0 &&
      data.lesiones.length === 0;

    if (noHayDatos) {
     
      return;
    } else {
      asignarAnamnesisOdontologica(anamnesisOdonto, data.anamnesis);
      asignarAMAntecedentesFamiliares(
        anamnesisOdonto,
        data.antecedentesFamiliares,
      );
      asignarAMAlergias(anamnesisMedica, data.alergias);
      asignarAMPatologiasClinicas(anamnesisMedica, data.patologiasClinicas);

      setAnamnesis(data.anamnesis);
      setAntecedentesFamiliares(data.antecedentesFamiliares);
      setAlergias(data.alergias);
      setPatologiasClinicas(data.patologiasClinicas);


    }
  };

  const asignarAnamnesis = (am, data) => {
    
    if (am === null) {return}
    ((am.general.tieneEnfermedad = data.sufrealgunaenfermedad),
      (am.general.detalleEnfermedad = data.sufrealgunaenfermedaddetalle),
      (am.general.recomendacionMedico = data.recomendacionmedicoquieredejar),
      (am.general.detalleRecomendacionMedico =
        data.recomendacionmedicoquieredejardetalle),
      (am.general.tratamientoMedico = data.tratamientomedico),
      (am.general.detalleTratamiento = data.tratamientomedicodetalle),
      (am.general.realizaDeporte = data.realizaalgundeporte),
      (am.general.detalleRealizaDeporte = data.realizaalgundeportedetalle),
      (am.general.tieneMalestarDeporte = data.deportemalestaralrealizarlo),
      (am.general.detalleMalestarDeporte =
        data.deportemalestaralrealizarlodetalle),
      (am.general.medicacionHabitual = data.medicamentosconsumedetalle),
      (am.general.medicacionUltimosAnios =
        data.medicacionultimoscincoaniosdetalle),
      (am.general.enfermedadInfectocontagiosa =
        data.enfermedadinfectocontagiosa),
      (am.general.detalleEnfermedadInfectocontagiosa =
        data.enfermedadinfectocontagiosadescriba),
      (am.general.otraEnfermedad = data.enfermedadalgunaotra),
      (am.general.detalleOtraEnfermedad = data.enfermedadalgunaotradetalle),
      am.general.medicoRecomendacion = data.recomendacionmedicoquieredejar,
      am.general.detalleMedicoRecomendacion = data.recomendacionmedicoquieredejardetalle, 
      (am.general.medicacionultimoscincoaniosdetalle =
        data.medicacionultimoscincoaniosdetalle),
      (am.general.tratamientoHomeopaticoAcupuntura =
        data.tratamientohomeopaticoacupuntura),
      (am.general.detalleTratamientoHomeopatico =
        data.tratamientohomeopaticoacupunturadescriba),
      (am.general.medicoClinico = data.medicoclinico),
      (am.general.clinicaDerivacion = data.clinicahostpitalderivacion),
      (am.general.observaciones = data.observaciones),
      (am.alergias.otras = data.otrasalergias),
      (am.alergias.detalle = data.detallealergias),
      (am.general.esalergico = data.esalergico));
  };

  const asignarAMAntecedentesFamiliares = (am, data) => {
    if (am === null) {return}
    ((am.familia.padreVive = data[0].vive),
      (am.familia.padreEnfermedad = data[0].descripcion),
      (am.familia.madreVive = data[1].vive),
      (am.familia.madreEnfermedad = data[1].descripcion),
      (am.familia.hermanos = data[2].vive),
      (am.familia.hermanosDetalle = data[2].descripcion));
  };

  const asignarAMAlergias = (am, data) => {

    if (!am.alergias) {
      am.alergias = {};
    }

    if (data[0] && data[0].alergia === "PENICILINA") {
      am.alergias.penicilinasi = true;
      am.alergias.penicilina = data[0].descripcion;
    }

    if (data[1] && data[1].alergia === "ANESTESIA") {
      am.alergias.anestesiasi = true;
      am.alergias.anestesia = data[1].descripcion;
    }
  };

  const asignarAMPatologiasClinicas = (am, data) => {
    if (am === null) {return}
    data.forEach((item, index) => {
      if (data[index].patologia === "CICATRIZA BIEN") {
        am.patologias.cicatrizaBien = true;
        am.patologias.sangraMucho = data[index].descripcion;
      }

      if (data[index].patologia === "COLAGENO") {
        ((am.patologias.colageno = true),
          (am.patologias.detalleColageno = data[index].descripcion));
      }

      if (data[index].patologia === "FIEBRE REUMATICA") {
        ((am.patologias.fiebreReumatica = true),
          (am.patologias.detalleFiebreReumatica = data[index].descripcion));
      }

      if (data[index].patologia === "DIABETICO") {
        ((am.patologias.diabetes = true),
          (am.patologias.diabetesControlado = data[index].controlado),
          (am.patologias.diabetesDetalle = data[index].descripcion),
          (am.patologias.diabetesControladoMedicacion =
            data[index].descripcion));
      }

      if (data[index].patologia === "CARDIACO") {
        ((am.patologias.cardiaco = true),
          (am.patologias.detalleCardiaco = data[index].descripcion));
      }

      if (data[index].patologia === "ANTICOAGULANTE") {
        ((am.patologias.anticoagulante = true),
          (am.patologias.detalleAnticoagulante = data[index].descripcion));
      }

      if (data[index].patologia === "CHAGAS") {
        ((am.patologias.chagas = true),
          (am.patologias.detalleChagas = data[index].descripcion));
      }

      if (data[index].patologia === "HEPATITIS") {
        ((am.patologias.hepatitis = true),
          (am.patologias.detalleHepatitis = data[index].descripcion));
      }

      if (data[index].patologia === "HEPATICO") {
        ((am.patologias.hepatico = true),
          (am.patologias.detalleHepatico = data[index].descripcion));
      }

      if (data[index].patologia === "EPILEPTICO") {
        ((am.patologias.epileptico = true),
          (am.patologias.detalleEpileptico = data[index].descripcion));
      }

      if (data[index].patologia === "CIRUGIAS") {
        ((am.patologias.cirugias = true),
          (am.patologias.detalleCirugias = data[index].descripcion),
          (am.patologias.cirugiasHacecuantoTiempo = data[index].descripcion1));
      }

      if (data[index].patologia === "RESPIRATORIO") {
        ((am.patologias.respiratorio = true),
          (am.patologias.detalleRespiratorio = data[index].descripcion));
      }

      if (data[index].patologia === "EMBARAZADA") {
        ((am.patologias.embarazada = true),
          (am.patologias.embarazadacuantosmeses = data[index].descripcion));
      }

      if (data[index].patologia === "PRESION ALTA") {
        am.patologias.presionAlta = true;
      }

      if (data[index].patologia === "SIFILIS") {
        am.patologias.sifilis = true;
      }

      if (data[index].patologia === "GONORREA") {
        am.patologias.gonorrea = true;
      }

      if (data[index].patologia === "TRANSFUSIONES") {
        am.patologias.transfusiones = true;
      }

      if (data[index].patologia === "ULCERA GASTRICA") {
        am.patologias.ulcera = true;
      }

      if (data[index].patologia === "FUMA") {
        am.patologias.fuma = true;
      }

      if (data[index].patologia === "CONVULSIONES") {
        am.patologias.convulsiones = true;
      }

      if (data[index].patologia === "RENALES") {
        am.patologias.renal = true;
      }
    });
  };

   const asignarAnamnesisOdontologica = (am, data) => {
    
    if (am === null) {return}
    ((am.general.tieneEnfermedad = data.sufrealgunaenfermedad),
      (am.general.detalleEnfermedad = data.sufrealgunaenfermedaddetalle),
      (am.general.recomendacionMedico = data.recomendacionmedicoquieredejar),
      (am.general.detalleRecomendacionMedico =
        data.recomendacionmedicoquieredejardetalle),
      (am.general.tratamientoMedico = data.tratamientomedico),
      (am.general.detalleTratamiento = data.tratamientomedicodetalle),
      (am.general.realizaDeporte = data.realizaalgundeporte),
      (am.general.detalleRealizaDeporte = data.realizaalgundeportedetalle),
      (am.general.tieneMalestarDeporte = data.deportemalestaralrealizarlo),
      (am.general.detalleMalestarDeporte =
        data.deportemalestaralrealizarlodetalle),
      (am.general.medicacionHabitual = data.medicamentosconsumedetalle),
      (am.general.medicacionUltimosAnios =
        data.medicacionultimoscincoaniosdetalle),
      (am.general.enfermedadInfectocontagiosa =
        data.enfermedadinfectocontagiosa),
      (am.general.detalleEnfermedadInfectocontagiosa =
        data.enfermedadinfectocontagiosadescriba),
      (am.general.otraEnfermedad = data.enfermedadalgunaotra),
      (am.general.detalleOtraEnfermedad = data.enfermedadalgunaotradetalle),
      am.general.medicoRecomendacion = data.recomendacionmedicoquieredejar,
      am.general.detalleMedicoRecomendacion = data.recomendacionmedicoquieredejardetalle, 
      (am.general.medicacionultimoscincoaniosdetalle =
        data.medicacionultimoscincoaniosdetalle),
      (am.general.tratamientoHomeopaticoAcupuntura =
        data.tratamientohomeopaticoacupuntura),
      (am.general.detalleTratamientoHomeopatico =
        data.tratamientohomeopaticoacupunturadescriba),
      (am.general.medicoClinico = data.medicoclinico),
      (am.general.clinicaDerivacion = data.clinicahostpitalderivacion),
      (am.general.observaciones = data.observaciones),
      (am.alergias.otras = data.otrasalergias),
      (am.alergias.detalle = data.detallealergias),
      (am.general.esalergico = data.esalergico));
  };


const limpiarAnamnesisMedica = () => {
  setAnamnesisMedica(initialAnamnesisMedica);
};


const limpiarAnamnesisOdontologica = () => {
  setAnamnesisOdonto(initialAnamnesisOdontologica);
};


const resetearHC = () => {
  setTabActivo(null)
  setResetKey((prev) => prev + 1);

  // opcional pero recomendable:
  setItems(null);
  setIDPaciente(null);
  setNroHC("");
  setApellidoNombresPaciente("");
  setTabActivo("motivo");
  limpiarAnamnesisMedica();
  limpiarAnamnesisOdontologica();

  

/*   setAnamnesisMedica(null);
  setAnamnesisOdonto(null);
  setDiagnosticoPresuntivo(null);
  setPlanTratamiento(null);
  setEvolucion(null); */
};






  return (
    <>
      <div className="hc-tabs" key={resetKey}>
        <Container fluid>
          {/* HEADER CENTRADO */}
          <Row className="justify-content-center mb-3">
            {/* ================= BARRA DE HERRAMIENTAS ================= */}
            <Row className="mb-2" style={{ marginTop: "10px" }}>
              <Col>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#f8f9fa",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    position: "relative", // 👈 MUY IMPORTANTE
                  }}
                >
                  {/* IZQUIERDA */}
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => console.log("Guardar HC")}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => console.log("Imprimir HC")}
                  >
                    <i className="fa-solid fa-print"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => console.log("Bloquear HC")}
                  >
                    <i className="fa-solid fa-lock"></i>
                  </button>

                  {/* SEPARADOR FLEX */}
                  {/* TITULO CENTRADO */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      
                      backgroundColor: "#0a58ca",
                      color: "white",
                      padding: "4px 4px",
                      borderRadius: "4px",
                      fontSize: "20 px",
                      pointerEvents: "none", // para que no tape clicks
                    }}
                  >
                    HISTORIA CLINICA NRO: {nroHC} - PACIENTE:  {apellidoNombresPaciente}
                  </div>
                  
                  {/* SEPARADOR FLEX */}
                  <div style={{ marginLeft: "auto" }} />

                  {/* DERECHA */}
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={openMdlBuscarPacientes}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetearHC}
                  >
                    <i className="fa-solid fa-broom"></i>
                  </button>
                </div>
              </Col>
            </Row>

            <DatosPacienteHeader data = {items} />
          </Row>

          {mostrarTabs && (
            <Tabs
              activeKey={tabActivo}
              onSelect={(k) => {
                if (k) setTabActivo(k);
              }}
              defaultActiveKey="motivo"
              id="historia-clinica-tabs"
              mountOnEnter
              unmountOnExit
            >
              <Tab eventKey="anamnesisMedica" title="Anamnesis Médica">
                <AnamnesisMedica
                  data={anamnesisMedica}
                  setData={setAnamnesisMedica}
                  idpaciente={idPaciente}
                />
              </Tab>

              <Tab
                eventKey="anamnesisOdontologica"
                title="Anamnesis Odontológica"
              >
                <AnamnesisOdontologica
                  data={anamnesisOdonto}
                  setData={setAnamnesisOdonto}
                  idpaciente={idPaciente}
                />
              </Tab>

              {/*     <Tab eventKey="exploracion" title="Exploración Clínica">
              <ExploracionClinica
                data={exploracionClinica}
                setData={setExploracionClinica}
              />
            </Tab>
 */}
              <Tab eventKey="diagnostico" title="Diagnóstico">
                <DiagnosticoPresuntivo
                  data={diagnosticoPresuntivo}
                  setData={setDiagnosticoPresuntivo}
                />
              </Tab>

              <Tab eventKey="plan" title="Plan de Tratamiento">
                <PlanTratamiento
                  data={planTratamiento}
                  setData={setPlanTratamiento}
                />
              </Tab>

              <Tab eventKey="evolucion" title="Evolución">
                <Evolucion data={evolucion} setData={setEvolucion} />
              </Tab>
            </Tabs>
          )}

          {/* NAVEGACIÓN + CONTENIDO */}
        </Container>
      </div>

      {mdlBuscarPacientes && (
        <MdlBuscarPacientes
          show={openMdlBuscarPacientes}
          handleClose={closeMdlBuscarPacientes}
          enviarAlPadre={recibirDatoDelHijo}
        />
      )}
    </>
  );
}

export default HC_HistoriaClinica;
