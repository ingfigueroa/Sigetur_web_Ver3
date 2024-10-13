
const urlServidor = "http://localhost:3000"

const urlResourceProfesional = urlServidor + "/profesionales";
const urlResourceProfesionalID = urlServidor + "/profesionalesid";
const urlResourceProfesionalHorarios = urlServidor + "/profesionaleshorarios";

const urlResourcePacientes = urlServidor + "/pacientes";
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
 
const urlResourceCapitulos = urlServidor + "/capitulos"
const urlResourcePrestaciones = urlServidor + "/prestaciones"
const urlResourcePrestacion = urlServidor + "/prestacion"


console.log(urlResourceCapitulos)

export const config = {
    urlServidor,
    urlResourceProfesional,
    urlResourcePacientes,
    urlResourceObrasSociales,
    urlResourceProfesiones,
    urlResourceTipoDocumento,
    urlResourceTipoSexo,
    urlResourceProvincia,
    urlResourceLocalidad,
    urlResourceTurnos,
    urlResourceObrasSocialesPorPaciente,
    urlResourceTurnosPasaraPendiente,
    urlResourceProfesionalID,
    urlResourceTurnosCrear,
    urlResourceCambiarEstado,
    urlResourceEstadoPorTurnos,
    urlResourcePrestaciones,
    urlResourceCapitulos,
    urlResourcePrestacion,
    urlResourceProfesionalHorarios,
    urlResourceTurnosAnularPorPedidoProfesional    
}