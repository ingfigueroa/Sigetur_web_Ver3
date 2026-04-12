import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";

import { historiaclinicaService } from "../../services/historiaclinica.service";

import DatosPacienteHeader from "./hc_datos_paciente_header";
import AnamnesisMedica from "./hc_anamnesis_medica";
import AnamnesisOdontologica from "./hc_anamnesis_odontologica";

import DiagnosticoPresuntivo from "./hc_diagnostico_presuntivo";
import PlanTratamiento from "./hc_plan_tratamiento";
import Evolucion from "./hc_evolucion";
import Odontograma from "./hc_odontograma";
import { pacientesService } from "/src/services/pacientes.service";

import "../../css/historia_clinica.css";

import MdlBuscarPacientes from "../pacientes/buscarpaciente";
import MDLEstaSeguro from "../modales/mdlEstaSeguro";

function HC_HistoriaClinica() {
  const [mdlBuscarPacientes, setModalBuscarPacientes] = useState(false);
  const [titulo, setTitulo] = useState("PACIENTE - HC:");
   const [showMDLMensaje, setShowMDLMensaje] = useState("");


    const [mensaje, setMensaje] = useState("");

  const [showMDLEstaSeguro, setShowMDLEstaSeguro] = useState("");

  const [idPaciente, setIDPaciente] = useState(null);

    const [Apellido, SetApellido] = useState("");
  
    const [VarDNI, SetDNI] = useState(null);

  const [idProfesional, setIDProfesional] = useState("89");

  const [diagnosticoPresuntivo, setDiagnosticoPresuntivo] = useState("");

  const [apellidoNombresPaciente, setApellidoNombresPaciente] = useState("");

  const [nroHC, setNroHC] = useState(0);

  const [evolucion, setEvolucion] = useState([]);

  const [mostrarTabs, setMostrarTabs] = useState(false);

  const [tabActivo, setTabActivo] = useState(null);

  const [anamnesis, setAnamnesis] = useState(null);
  const [anamnesisOdontologica, setAnamnesisOdontologica] = useState(null);
  const [odUltimaFoto, setODUltimaFoto] = useState(null);

  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState([]);
  const [alergias, setAlergias] = useState([]);
  const [patologiasClinicas, setPatologiasClinicas] = useState([]);

  const [anormalidades, setAnormalidades] = useState([]);
  const [dificultades, setDificultades] = useState([]);
  const [dolores, setDolores] = useState([]);
  const [lesiones, setlesiones] = useState([]);

  const [resetKey, setResetKey] = useState(0);
  const [idUsuario, setIDUsuario] = useState("2");

  const [items, setItems] = useState([]);

  const [paciente, setPaciente] = useState({
    apellido: "",
    nombre: "",
    hc: "",
  });

  
  const openMdlMensaje = () => {
    setShowMDLMensaje(true);
  };
  
const closeMdlMensaje = () => {
  setShowMDLMensaje(false);
  handleClose();
  setTimeout(() => Buscar(1), 300); // espera 300 ms
};

  const openMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(true);
  };

  const closeMdlEstaSeguro = () => {
    setShowMDLEstaSeguro(false);
    //setShowMDLMensaje(true)
  };
  const [mdlMensajeCuerpo, setModalMensajeCuerpo] = useState(
    "El paciente no tiene historia clinica. ¿Quiere crearla?",
  );

  const [mdlMensajeTitulo, setModalMensajeTitulo] = useState(
    "HISTORIA CLINICA - CREAR POR PRIMERA VEZ",
  );

  const recibirPaciente = (apellido, nombre, hc) => {
    setPaciente({ apellido, nombre, hc });
  };

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
    },
  };

  const initialAnamnesisOdontologica = {
    general: {
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
      localizadodolor: "",
      irradiadodolor: "",
      calmoalgodolor: "",
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

  const [anamnesisMedica, setAnamnesisMedica] = useState(
    initialAnamnesisMedica,
  );

  const [anamnesisOdonto, setAnamnesisOdonto] = useState(
    initialAnamnesisOdontologica,
  );

  /* const [exploracionClinica, setExploracionClinica] = useState({
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
  }); */

  const [planTratamiento, setPlanTratamiento] = useState([
    {
      codigo: "0005",
      prestacion: "ENDODONCIA",
      pieza: "PREMOLAR",
      observaciones: "NINGUNA",
    },
    {
      codigo: "0005",
      prestacion: "ENDODONCIA",
      pieza: "PREMOLAR",
      observaciones: "NINGUNA",
    },
  ]);
  const crearEstructuraOdontograma = () => {
    const piezas = [
      18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47,
      46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 55, 54, 53, 52,
      51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75,
    ];

    const estructura = {};

    piezas.forEach((pieza) => {
      estructura[pieza] = {
        caras: {
          oclusal: {},
          vestibular: {},
          lingual: {},
          mesial: {},
          distal: {},
        },
      };
    });

    return estructura;
  };

  const [odontograma, setOdontograma] = useState(crearEstructuraOdontograma);

  const mdlSiNo = (respuesta) => {
    if (respuesta) {
      // Lógica si confirmó que quiere eliminar
      CreateHC(idPaciente, idProfesional, idUsuario);
      mostrarHC(idPaciente);
      closeMdlEstaSeguro();
      setMensaje("Se creó la historia clínica del paciente.")
      openMdlMensaje();
    } else {
      setMensaje("Se canceló la operación.");
      openMdlMensaje();
    }
  };
  function CreateHC(idpaciente, idprofesional, idusuario) {
    try {
      historiaclinicaService.CreateHC(idpaciente, idprofesional, idusuario);
    } catch (error) {}
  }

  function mostrarHC(idpaciente) {
    BuscarPaciente(idpaciente);
    cargarAnamnesis(idpaciente);
    cargarAnamnesisOdontologica(idpaciente);
    cargarOdontogramaUltimaFoto(idpaciente);
    cargarDiagnostico(idpaciente)
  }

  const recibirDatoDelHijo = async (datoRecibido) => {
    if (datoRecibido > 0) {
      setIDPaciente(datoRecibido);
      const hcnro = await BuscarHCNro(datoRecibido);
      
      if (hcnro > 0) {
        setIDPaciente(datoRecibido);
        mostrarHC(datoRecibido);

        setMostrarTabs(true);
        setTabActivo("anamnesisMedica");
      } else {
        openMdlEstaSeguro();
        // alert("El paciente no tiene generada una historia clinica");
      }
    }
  };

  async function BuscarHCNro(idpaciente) {
    try {
      const data = await historiaclinicaService.getHCNro(idpaciente);

      const hcnro = data?.[0]?.hcnro || 0;

      setNroHC(hcnro);

      return hcnro; // 👈 devolverlo
    } catch (error) {
      console.error("Error al buscar paciente:", error);
      return 0;
    }
  }
  
  async function BuscarPaciente(idpaciente) {
    try {
      const data = await pacientesService.BuscarPorId(idpaciente);

      const nombreCompleto = data[0].Apellido + ", " + data[0].Nombres;
      const documento = data[0].NroDocumento;

      setApellidoNombresPaciente(nombreCompleto);
      setNroHC(documento);
      setTitulo("PACIENTE: " + nombreCompleto + " - HC: " + documento);

      setItems(data);
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
    const data =
      await historiaclinicaService.getHCAnamnesisOdontologica(idpaciente);

    const noHayDatos =
      !data.anamnesisodontologica &&
      data.anormalidades.length === 0 &&
      data.dificultades.length === 0 &&
      data.dolores.length === 0 &&
      data.lesiones.length === 0;

    if (noHayDatos) {
      return;
    } else {
      asignarAnamnesisOdontologica(anamnesisOdonto, data.anamnesisodontologica);
      asignarAOConsultasPrevias(anamnesisOdonto, data.anamnesisodontologica);
      asignarAOAnormalidades(anamnesisOdonto, data.anormalidades);
      asignarAODificultades(anamnesisOdonto, data.dificultades);
      asignarAODolores(anamnesisOdonto, data.dolores);
      asignarAOLesiones(anamnesisOdonto.lesiones, data.lesiones);

      setAnamnesisOdontologica(data.anamnesisodontologica);
      setAnormalidades(data.anormalidades);
      setDificultades(data.dificultades);
      setDolores(data.dolores);
      setlesiones(data.lesiones);
    }
  };

  const cargarOdontogramaUltimaFoto = async (idpaciente) => {
    const data = await historiaclinicaService.getHCUltimaFoto(idpaciente);

    const datosTransformados = transformarUltimaFoto(data);
    
    setODUltimaFoto(datosTransformados);

    setOdontograma(datosTransformados);
  };

   const cargarDiagnostico = async (idpaciente) => {

    
    const data = await historiaclinicaService.getHCDiagnosticoBuscar(idpaciente);

       setDiagnosticoPresuntivo(data)
     
    
  };

  const obtenerColorPorEstado = (idEstado) => {
    switch (idEstado) {
      case 9:
        return "#ffffff"; // Diente sano
      case 1:
        return "#b6787e"; // Caries
      case 2:
        return "#b6787e"; // Caries recurrentes
      case 10:
        return "#9fa7ad"; //diente ausente
      case 16:
        return "#7FB3FF"; // Obturación
      case 19:
        return "#66A3FF"; //SELLADOR
      case 27:
        return "#FFF9C4"; //extrusion
      case 33:
        return "#FF9F43";
        fractura;

      default:
        return "#ffffff";
      /*     Caries activa	Rojo clínico	#DC3545	Lesión activa
🔵 Obturación	Azul clínico	#0D6EFD	Restauración existente
🟢 Tratamiento realizado	Verde oscuro	#198754	Procedimiento completado
🟡 Tratamiento requerido	Amarillo	#FFC107	Pendiente
🟠 Endodoncia	Naranja	#FD7E14	Conducto tratado
⚫ Diente ausente	Gris oscuro	#6C757D	Pieza faltante
⚪ Prótesis	Gris claro	#CED4DA	Prótesis fija/removible
🟣 Corona	Violeta	#6F42C1	Corona protésica
🔲 Implante	Negro	#000000	Implante */
    }
  };

  
  const transformarUltimaFoto = (arrayBD) => {
    const resultado = {};

    const datos = arrayBD[0];

    datos.forEach((item) => {
      const pieza = item.nropieza;
      const cara = item.Cara_Diente.toLowerCase();
      const estado = Number(item.idsituaciondentaria);

      const color = obtenerColorPorEstado(estado);

      if (!resultado[pieza]) {
        resultado[pieza] = {
          idhc: item.idhc,
          esfotoinicial: item.esfotoinicial,

          caras: {},
        };
      }

      resultado[pieza].caras[cara] = {
        color: color,
        idcara: item.idcara,
        idsituaciondentaria: item.idsituaciondentaria,
        situacion: item.Situacion_Dentaria,
        idprofesional: item.idprofesional,
        idpieza: item.idpieza,
      };
    });

    return resultado;
  };

  const asignarAnamnesis = (am, data) => {
    if (am === null) {
      return;
    }
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
      (am.general.medicoRecomendacion = data.recomendacionmedicoquieredejar),
      (am.general.detalleMedicoRecomendacion =
        data.recomendacionmedicoquieredejardetalle),
      (am.general.medicacionultimoscincoaniosdetalle =
        data.medicacionultimoscincoaniosdetalle),
      (am.general.tratamientoHomeopaticoAcupuntura =
        data.tratamientohomeopaticoacupuntura),
      (am.general.tratamientohomeopaticoacupunturadescriba =
        data.tratamientohomeopaticoacupunturadescriba),
      (am.general.medicoClinico = data.medicoclinico),
      (am.general.clinicaDerivacion = data.clinicahostpitalderivacion),
      (am.general.observaciones = data.observaciones),
      (am.alergias.otras = data.otrasalergias),
      (am.alergias.detalle = data.detallealergias),
      (am.general.esalergico = data.esalergico));
  };

  const asignarAMAntecedentesFamiliares = (am, data) => {
    if (am === null) {
      return;
    }
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
    if (am === null) {
      return;
    }
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

  const asignarAnamnesisOdontologica = (ao, data) => {
    if (ao === null) {
      return;
    }
    
    ((ao.general.porqueasistioconsulta = data.porqueasistioconsulta),
      (ao.general.momentosazucardiarios = data.momentosazucardiarios),
      (ao.general.indicedeplacas = data.indicedeplacas),
      (ao.general.tipolesionesdescriba = data.tipolesionesdescriba),
      (ao.general.higienebucalestado = data.higienebucalestado),
      (ao.general.carahinchada = data.carahinchada),
      (ao.general.carahinchadapusohielo = data.carahinchadapusohielo),
      (ao.general.carahinchadapusocalor = data.carahinchadapusocalor),
      (ao.general.carahinchadapusootros = data.carahinchadapusootros),
      (ao.general.momentosazucardiarios = data.momentosazucardiarios),
      (ao.general.indicedeplacas = data.indicedeplacas),
      (ao.general.observaciones = data.observaciones),
      (ao.dolor.hatenidodolor = data.hatenidodolor),
      (ao.general.localizadodolor = data.localizadodolor),
      (ao.general.irradiadodolor = data.irradiadodolor),
      (ao.general.calmoalgodolor = data.calmoalgodolor),
      (ao.general.observaciones = data.observaciones),
      (ao.golpe.golpedientes = data.golpedientes),
      (ao.golpe.cuandogolpedientes = data.cuandogolpedientes),
      (ao.golpe.comoprodujogolpedientes = data.comoprodujogolpedientes),
      (ao.fractura.fracturodiente = data.fracturodiente),
      (ao.fractura.cualdientefracturo = data.cualdientefracturo),
      (ao.fractura.tratamientofracturadiente = data.tratamientofracturadiente));
  };

  const asignarAOConsultasPrevias = (ao, data) => {
    if (ao === null) {
      return;
    }

    ((ao.consultasPrevias.consultootroprofesional =
      data.consultootroprofesional),
      (ao.consultasPrevias.consultootroprofesionaldetalle =
        data.consultootroprofesionaldetalle),
      (ao.consultasPrevias.tomomedicamento = data.tomomedicamento),
      (ao.consultasPrevias.describamedicamento = data.describamedicamento),
      (ao.consultasPrevias.desdecuandomedicamento =
        data.desdecuandomedicamento),
      (ao.consultasPrevias.obtuvoresultadomedicamento =
        data.obtuvoresultadomedicamento));
  };

  const asignarAOAnormalidades = (ao, data) => {
    if (ao === null) {
      return;
    }
    data.forEach((item, index) => {
      if (data[index].anormalidad === "LOS LABIOS") {
        ao.anormalBoca.loslabios = true;
      }

      if (data[index].anormalidad === "CARRILLO") {
        ao.anormalBoca.carrillo = true;
      }

      if (data[index].anormalidad === "PALADAR") {
        ao.anormalBoca.paladar = true;
      }

      if (data[index].anormalidad === "REBORDES") {
        ao.anormalBoca.rebordes = true;
      }

      if (data[index].anormalidad === "LENGUA") {
        ao.anormalBoca.lengua = true;
      }

      if (data[index].anormalidad === "TRIGONO") {
        ao.anormalBoca.trigono = true;
      }

      if (data[index].anormalidad === "PISO BOCA") {
        ao.anormalBoca.pisoboca = true;
      }

      if (data[index].anormalidad === "PISO RETROMOLAR") {
        ao.anormalBoca.pisoretromolar = true;
      }
    });
  };

  const asignarAODificultades = (ao, data) => {
    if (ao === null) {
      return;
    }
    data.forEach((item, index) => {
      if (data[index].dificultad === "HABLAR") {
        ao.dificultad.hablar = true;
      }

      if (data[index].dificultad === "MASTICAR") {
        ao.dificultad.masticar = true;
      }

      if (data[index].dificultad === "ABRIR LA BOCA") {
        ao.dificultad.abrirlaboca = true;
      }

      if (data[index].dificultad === "TRAGAR ALIMENTOS") {
        ao.dificultad.tragaralimentos = true;
      }
    });
  };

  const asignarAODolores = (ao, data) => {
    if (ao === null) {
      return;
    }

    data.forEach((item, index) => {
      if (data[index].dolor === "SUAVE") {
        ao.dolor.suave = true;
      }

      if (data[index].dolor === "MODERADO") {
        ao.dolor.moderado = true;
      }
      if (data[index].dolor === "INTENSO") {
        ao.dolor.intenso = true;
      }
      if (data[index].dolor === "TEMPORARIO") {
        ao.dolor.temporario = true;
      }
      if (data[index].dolor === "INTERMITENTE") {
        ao.dolor.intermitente = true;
      }
      if (data[index].dolor === "CONTINUO") {
        ao.dolor.continuo = true;
      }
      if (data[index].dolor === "ESPONTANEO") {
        ao.dolor.espontaneo = true;
      }
      if (data[index].dolor === "PROVOCADO") {
        ao.dolor.provocado = true;
      }
      if (data[index].dolor === "AL FRIO") {
        ao.dolor.alfrio = true;
      }

      if (data[index].dolor === "AL CALOR") {
        ao.dolor.alcalor = true;
      }
    });
  };

  const asignarAOLesiones = (ao, data) => {
    if (ao === null) {
      return;
    }

    data.forEach((item, index) => {
      if (data[index].lesion === "MANCHAS") {
        ao.manchas = true;
      }

      if (data[index].lesion === "ABULTAMIENTO TEJIDOS") {
        ao.abultamientotejidos = true;
      }
      if (data[index].lesion === "ULCERACIONES") {
        ao.ulceras = true;
      }

      if (data[index].lesion === "AMPOLLAS") {
        ao.ampollas = true;
      }
      if (data[index].lesion === "SANGRAN ENCIAS") {
        ao.sangranencias = true;

        ao.sangranenciasdetalle = data[index].descripcion;
      }

      if (data[index].lesion === "PUS") {
        ao.pus = true;
        ao.pusdetalle = data[index].descripcion;
      }
      if (data[index].lesion === "MOVILIDAD DIENTES") {
        ao.movilidaddientes = true;
        ao.movilidaddientesdetalle = data[index].descripcion;
      }

      if (data[index].lesion === "ALTO DIENTES") {
        ao.altodientes = true;
        ao.altodientesdetalle = data[index].descripcion;
      }
    });
  };

  const limpiarAnamnesisMedica = () => {
    setAnamnesisMedica(initialAnamnesisMedica);
  };

  const limpiarAnamnesisOdontologica = () => {
    setAnamnesisOdonto(initialAnamnesisOdontologica);
  };

  const limpiarOdontograma = () => {
    setOdontograma(crearEstructuraOdontograma);
  };

  const resetearHC = () => {
    setTabActivo(null);
    setResetKey((prev) => prev + 1);
    setMostrarTabs(false);

    // opcional pero recomendable:
    setItems(null);
    setIDPaciente(null);
    setNroHC("");
    setApellidoNombresPaciente("");
    setTabActivo("motivo");
    limpiarAnamnesisMedica();
    limpiarAnamnesisOdontologica();
    limpiarOdontograma();
    setTitulo("PACIENTE - HC:");
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
                      width: "50%",
                      backgroundColor: "#0a58ca",
                      color: "white",
                      padding: "4px 4px",
                      borderRadius: "4px",
                      fontSize: "20px",
                      textAlign: "center",
                      pointerEvents: "none", // para que no tape clicks
                    }}
                  >
                    {titulo}
                  </div>

                  {/* SEPARADOR FLEX */}
                  <div style={{ marginLeft: "auto" }} />

                  {/* DERECHA */}
                  <button
                    title="Buscar HISTORIA CLINICA por paciente"
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

            <DatosPacienteHeader
              data={items}
              apellidonombres={recibirPaciente}
            />
           
            
          </Row>
         {/*  <Row>
             <div className="acomodarencabezadopizaturnos">
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            style={{
                              backgroundColor: "#679bb9",
                              color: "white",
                              height: "28px",
                            }}
                          >
                            Profesional
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Buscar por apellido de profesional"
                            aria-label="Buscar profesional"
                            aria-describedby="basic-addon2"
                            type="text"
                            style={{height: "28px", marginght: "20px" }}
                            onChange={(e) => SetApellido(e.target.value.toUpperCase())}
                            value={Apellido}
                            autoFocus
                          />
            
                          <Button
                            className="btn btn-sm btn-outline-secondary"
                            title="Buscar por profesional"
                            variant="outline-secondary"
                            id="button-addon1"
                            style={{ height: "28px" }}
                            color="white"
                            sm
                            onClick={() => Buscar(1)}
                          >
                            <i class="fa-solid fa-magnifying-glass"></i>
                          </Button>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            style={{
                              backgroundColor: "#679bb9",
                              color: "white",
                              height: "28px",
                            }}
                          >
                            DNI
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Buscar por DNI"
                            aria-label="Profesión"
                            aria-describedby="basic-addon2"
                            style={{height: "28px", marginght: "20px" }}
                            onChange={(e) => SetDNI(e.target.value)}
                            value={VarDNI}
                          />
                          <Button
                           className="btn btn-sm btn-outline-secondary"
                            title="Buscar por DNI"
                            variant="outline-secondary"
                            id="button-addon1"
                            style={{ height: "28px" }}
                            color="white"
                            onClick={() => Buscar(1)}
                          >
                            <i class="fa-solid fa-magnifying-glass"></i>
                          </Button>
                          
                            <Button 
                             className="btn btn-sm btn-outline-secondary"
                             style={{ height: "28px" }}
                            onClick={() => Limpiar()}>
                              <i className="fa-solid fa-broom"></i>
                            </Button>
                            
                         
                        </InputGroup>
                        
                      </div>
                      <hr />
          </Row> */}
          <Row>
            
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
              <Tab eventKey="odontograma" title="Odontograma">
                <Odontograma
                  data={odontograma}
                  setData={setOdontograma}
                  modo="realizado"
                  idhc={nroHC}
                  idprofesional={idProfesional}
                />
              </Tab>

              <Tab eventKey="diagnostico" title="Diagnóstico">
                <DiagnosticoPresuntivo
                  data={diagnosticoPresuntivo}
                  idpaciente={idPaciente}
                  idprofesional={idProfesional}
                  idusuario={idUsuario}
                />
              </Tab>

              <Tab eventKey="plan" title="Plan de Tratamiento"  tabClassName="d-none">
                <PlanTratamiento
                  data={planTratamiento}
                  setData={setPlanTratamiento}
                />
              </Tab>

              <Tab eventKey="evolucion" title="Evolución"  tabClassName="d-none">
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
      {showMDLEstaSeguro && (
        <MDLEstaSeguro
          show={openMdlEstaSeguro}
          handleClose={closeMdlEstaSeguro}
          mensajetitulo={mdlMensajeTitulo}
          mensajecuerpo={mdlMensajeCuerpo}
          enviaralpadre={mdlSiNo}
        />
      )}

    </>
  );
}

export default HC_HistoriaClinica;
