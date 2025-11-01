
const urlServidor = "http://localhost:3000"

const urlResourceProfesional = urlServidor + "/profesionales";
const urlResourceProfesionalProfesionID = urlServidor + "/profesionalesProfesionid";
const urlResourceProfesionalHorarios = urlServidor + "/profesionaleshorarios";
const urlResourceProfesionalID = urlServidor + "/profesionalid"; 
const urlResourceProfesionalDarBaja = urlServidor + "/profesional/baja";
const urlResourceProfesionalFechaCambioHorario = urlServidor + "/profesional/fechacambiohorario";
const urlResourceProfesionalCambioHorario = urlServidor + "/profesional/cambiohorariomultiple"

const urlResourcePacientes = urlServidor + "/pacientes";
const urlResourcePacientesAdd = urlServidor + "/pacienteadd"; 
const urlResourcePacienteID = urlServidor + "/pacienteid";
const urlResourcePacienteUltimosTurnos = urlServidor + "/pacientesultimosturnos";


const urlResourceObrasSociales = urlServidor + "/obrassociales";
const urlResourceObrasSocialesPorPaciente = urlServidor + "/obrassociales/paciente";
const urlResourceObrasSocialesAsignarPaciente = urlServidor + "/obrassociales/asignarapaciente";
const urlResourceObrasSocialesDesafectarPaciente = urlServidor + "/obrassociales/desafectarapaciente";
const urlResourceObrasSocialesActivar = urlServidor + "/obrassociales/activar";

const urlResourceProfesiones = urlServidor + "/profesiones";

const urlResourceTipoSexo = urlServidor + "/tiposexo";
const urlResourceTipoDocumento = urlServidor + "/tipodocumento";
const urlResourceProvincia = urlServidor + "/provincias";
const urlResourceLocalidad = urlServidor + "/localidades";
const urlResourceEstado = urlServidor + "/estados"
//TURNOS
const urlResourceTurnos = urlServidor + "/turnos";
const urlResourceTurnosPasaraPendiente = urlServidor + "/turnos/pasarapendiente"
const urlResourceSobreturnoPasaraPendiente = urlServidor + "/turnos/sobreturno"
const urlResourceTurnosCrear = urlServidor + "/turnos/crearturnos"
const urlResourceCambiarEstado = urlServidor + "/turnos/cambiarestado"
const urlResourceEstadoPorTurnos = urlServidor + "/turnos/estadosporturno"
const urlResourceTurnosAnularPorPedidoProfesional = urlServidor + "/turnos/anularturnospedidoprofesional"
const urlResourceTurnosProfesionalDiaCancelados = urlServidor +  "/turnos/turnoprofesionaldiacancelado"
const urlResourceAgSeTurProfFecha = urlServidor +  "/turnos/ageseturproffecha"
const urlResourceConsultaTurnos = urlServidor + "/turnos/consultasporfecha"
const urlResourceturnoslibresfechames = urlServidor + "/turnos/turnoslibresfechames"
const urlResourceTurnoID = urlServidor + "/turnoid"
const urlResourceTurnoLibreID = urlServidor + "/turnolibreid"
const urlResourceMailTurnosProfesional = urlServidor + "/turnos/postEnviarTurnosManual"

const urlResourceListadeEsperaAlta = urlServidor + "/listadeesperaalta"
const urlResourceListadeesperaListar = urlServidor + "/listadeesperalistar"
const urlResourceListadeEsperaBajaFila = urlServidor + "/listadeesperabajafila"
const urlResourceListadeEsperaAsignarTurno = urlServidor + "/listadeesperaasignarturno"

const urlResourceAgeSemTurProfFechaAgrupado = urlServidor + "/turnos/AgeSemTurProfFechaAgrupado"
const urlResourceCapitulos = urlServidor + "/capitulos"
const urlResourcePrestaciones = urlServidor + "/prestaciones"
const urlResourcePrestacion = urlServidor + "/prestacion"

const urlResourceHorasListar = urlServidor + "/horaslistar"
const urlResourceHorasMananaTardeNoche = urlServidor + "/horasmananatardenoche"

const urlResourceMediosdePagos = urlServidor + "/mediosdepagos"

const urlResourceIntervalosListar = urlServidor + "/intervaloslistar"

const urlResourceDiasSemanaListar = urlServidor + "/diassemanalistar"



export const config = {
    urlServidor,
    urlResourceProfesional,
    urlResourcePacientes,
    urlResourcePacientesAdd,
    urlResourceObrasSociales,
    urlResourceProfesiones,
    urlResourceTipoDocumento,
    urlResourceTipoSexo,
    urlResourceProvincia,
    urlResourceLocalidad,
    urlResourceTurnos,
    urlResourceObrasSocialesPorPaciente,
    urlResourceTurnosPasaraPendiente,
    urlResourceProfesionalProfesionID,
    urlResourceTurnosCrear,
    urlResourceCambiarEstado,
    urlResourceEstadoPorTurnos,
    urlResourcePrestaciones,
    urlResourceCapitulos,
    urlResourcePrestacion,
    urlResourceProfesionalHorarios,
    urlResourceTurnosAnularPorPedidoProfesional,
    urlResourceTurnosProfesionalDiaCancelados,
    urlResourceProfesionalID,
    urlResourcePacienteID,
    urlResourcePacienteUltimosTurnos,
    urlResourceAgSeTurProfFecha,
    urlResourceAgeSemTurProfFechaAgrupado,
    urlResourceConsultaTurnos,
    urlResourceEstado,
    urlResourceTurnoID,
    urlResourceHorasListar,
    urlResourceListadeesperaListar,
    urlResourceListadeEsperaAlta,
    urlResourceListadeEsperaBajaFila,
    urlResourceTurnoLibreID,
    urlResourceListadeEsperaAsignarTurno,
    urlResourceMailTurnosProfesional,
    urlResourceSobreturnoPasaraPendiente,
    urlResourceMediosdePagos, 
    urlResourceturnoslibresfechames,
    urlResourceProfesionalDarBaja,
    urlResourceHorasMananaTardeNoche,
    urlResourceIntervalosListar,
    urlResourceDiasSemanaListar,
    urlResourceProfesionalFechaCambioHorario,
    urlResourceProfesionalCambioHorario,
    urlResourceObrasSocialesAsignarPaciente,
    urlResourceObrasSocialesDesafectarPaciente,
    urlResourceObrasSocialesActivar
}