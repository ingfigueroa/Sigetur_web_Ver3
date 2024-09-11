
const urlServidor = "http://localhost:3000"

const urlResourceProfesional = urlServidor + "/profesionales";
const urlResourceProfesionalID = urlServidor + "/profesionalesid";

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

const urlResourceCapitulos = urlServidor + "/capitulos"
const urlResourcePrestaciones = urlServidor + "/prestaciones"

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
    urlResourceCapitulos    
}