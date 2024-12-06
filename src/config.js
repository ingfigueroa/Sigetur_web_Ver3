
const urlServidor = "http://localhost:3000"

const urlResourceProfesional = urlServidor + "/profesionales";
const urlResourceProfesionalProfesionID = urlServidor + "/profesionalesProfesionid";
const urlResourceProfesionalHorarios = urlServidor + "/profesionaleshorarios";
const urlResourceProfesionalID = urlServidor + "/profesionalid"; 

const urlResourcePacientes = urlServidor + "/pacientes";
const urlResourcePacientesAdd = urlServidor + "/pacienteadd";
const urlResourcePacienteID = urlServidor + "/pacienteid";
const urlResourcePacienteUltimosTurnos = urlServidor + "/pacientesultimosturnos";
const urlResourceObrasSociales = urlServidor + "/obrassociales";
const urlResourceObrasSocialesPorPaciente = urlServidor + "/obrassociales/pacienteos";
const urlResourceProfesiones = urlServidor + "/profesiones";

const urlResourceTipoSexo = urlServidor + "/tiposexo";
const urlResourceTipoDocumento = urlServidor + "/tipodocumento";
const urlResourceProvincia = urlServidor + "/provincias";
const urlResourceLocalidad = urlServidor + "/localidades";
//TURNOS
const urlResourceTurnos = urlServidor + "/turnos";
const urlResourceTurnosPasaraPendiente = urlServidor + "/turnos/pasarapendiente"
const urlResourceTurnosCrear = urlServidor + "/turnos/crearturnos"
const urlResourceCambiarEstado = urlServidor + "/turnos/cambiarestado"
const urlResourceEstadoPorTurnos = urlServidor + "/turnos/estadosporturno"
const urlResourceTurnosAnularPorPedidoProfesional = urlServidor + "/turnos/anularturnospedidoprofesional"
const urlResourceTurnosProfesionalDiaCancelados = urlServidor +  "/turnos/turnoprofesionaldiacancelado"
const urlResourceCapitulos = urlServidor + "/capitulos"
const urlResourcePrestaciones = urlServidor + "/prestaciones"
const urlResourcePrestacion = urlServidor + "/prestacion"




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
    urlResourcePacienteUltimosTurnos
}