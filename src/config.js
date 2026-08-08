
const urlServidor = "http://localhost:3000"

//PROFESIONALES
const urlResourceProfesional = urlServidor + "/profesionales";
const urlResourceProfesionalAdd = urlServidor + "/profesionalesadd";
const urlResourceProfesionalProfesionID = urlServidor + "/profesionalesProfesionid";
const urlResourceProfesionalHorarios = urlServidor + "/profesionaleshorarios";
const urlResourceProfesionalID = urlServidor + "/profesionalid"; 
const urlResourceProfesionalDarBaja = urlServidor + "/profesional/baja";
const urlResourceProfesionalFechaCambioHorario = urlServidor + "/profesional/fechacambiohorario";
const urlResourceProfesionalCambioHorario = urlServidor + "/profesional/cambiohorariomultiple"
const urlResourceIDProfesionalEmail = urlServidor + "/idprofesionalemail";


//PACIENTES
const urlResourcePacientes = urlServidor + "/pacientesget";
const urlResourcePacientesAdd = urlServidor + "/pacienteadd"; 
const urlResourcePacientesUpdate = urlServidor + "/pacienteupdate"; 
const urlResourcePacienteID = urlServidor + "/pacienteid";
const urlResourcePacienteUltimosTurnos = urlServidor + "/pacientesultimosturnos";

//OBRAS SOCIALES
const urlResourceObrasSociales = urlServidor + "/obrassociales";
const urlResourceObrasSocialesPorPaciente = urlServidor + "/obrassociales/paciente";
const urlResourceObrasSocialesAsignarPaciente = urlServidor + "/obrassociales/asignarapaciente";
const urlResourceObrasSocialesDesafectarPaciente = urlServidor + "/obrassociales/desafectarapaciente";
const urlResourceObrasSocialesActivar = urlServidor + "/obrassociales/activar";


//PROFESIONES
const urlResourceProfesiones = urlServidor + "/profesiones";


//VARIOS
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
const urlResourcepostTurnoCobrar = urlServidor + "/turnos/cobrar"
const urlResourcepostTurnoRegistrarPrestaciones = urlServidor + "/turnos/registrarprestaciones"

const urlResourceTurnoIDPrestaciones = urlServidor + "/turnos/prestacionesporturno"

const urlResourceTurnoIDDetalle = urlServidor + "/turnoid/detalle"

const urlResourceTurnosProfesionalDiaAtiende = urlServidor + "/turnos/turnoprofesionaldiaatiende"


//RECORDATORIO MAIL
const urlenviarrecordatorioxmailtodalagrilla = urlServidor + "/correos/urlenviarrecordatorioxmailtodalagrilla"

const urlenviarrecordatorioxmailpacienteseleccionado = urlServidor + "/correos/urlenviarrecordatorioxmailpacienteseleccionado"

//LISTA DE ESPERA
const urlResourceListadeEsperaAlta = urlServidor + "/listadeesperaalta"
const urlResourceListadeesperaListar = urlServidor + "/listadeesperalistar"
const urlResourceListadeEsperaBajaFila = urlServidor + "/listadeesperabajafila"
const urlResourceListadeEsperaAsignarTurno = urlServidor + "/listadeesperaasignarturno"

const urlResourceAgeSemTurProfFechaAgrupado = urlServidor + "/turnos/AgeSemTurProfFechaAgrupado"

//CAPITULOS PRESTACIONES
const urlResourceCapitulos = urlServidor + "/capitulos"
const urlResourcePrestaciones = urlServidor + "/prestaciones"
const urlResourcePrestacion = urlServidor + "/prestacion"

//HORAS
const urlResourceHorasListar = urlServidor + "/horaslistar"
const urlResourceHorasMananaTardeNoche = urlServidor + "/horasmananatardenoche"

//MEDIOS DE PAGOS
const urlResourceMediosdePagos = urlServidor + "/mediosdepagos"
const urlResourceTarjetasdeCreditos = urlServidor + "/tarjetascreditodebito"

//INTERVALOS
const urlResourceIntervalosListar = urlServidor + "/intervaloslistar"

//DIAS
const urlResourceDiasSemanaListar = urlServidor + "/diassemanalistar"

/*----HISTORIA CLINICA---*/
const urlHCCreate = urlServidor + "/hccreate"
const urlHCAnamnesisMedica = urlServidor + "/hcamadd"
const urlHCAnamnesisOdontologica = urlServidor + "/hcaoadd"

const urlHCFotoOdontograma = urlServidor + "/hcodontogramaadd"

const urlHCCreateDiagnostico = urlServidor + "/hcdiagnosticoadd"

const urlHCAnamnesisMedicaBuscar = urlServidor + "/hcambuscar"
const urlHCAnamnesisOdontologicaBuscar = urlServidor + "/hcaobuscar"
const urlHCNro = urlServidor + "/hcnrobuscar"

const urlHCODSituaciondentaria = urlServidor + "/hcodsituaciondentaria"
const urlHCODUltimaFoto = urlServidor + "/hcodultimafoto"
const urlHCDiagnosticoBuscar = urlServidor + "/hcdiagnosticobuscar"

//CLIENTES
const urlCrearCliente = urlServidor + "/crearcliente"
const urlCorreoCrearCuenta = urlServidor + "/crearcuenta"
const urlCodigoCrearCuentaCreate = urlServidor + "/crearcodigoadd"
const urlvalidarcodigoemail = urlServidor + "/validarcodigoemail"

//LOGIN
const urlLoginUsuario = urlServidor + "/loginusuario"
const urlValidarTokenEmailResetPassword = urlServidor + "/validartoken"
const urlUpdatePassword = urlServidor + "/updatepassword"
const urlTokenEmailProfesional = urlServidor + "/enviartokenemailprofesional"

//SIGETUR CONFIGURACION O PANTALLA DE INICIO
const urlValoresPantallaInicio = urlServidor + "/valorespantallainicio"






export const config = {
    urlServidor,
    urlResourceProfesional,
    urlResourceProfesionalAdd,
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
    urlResourceObrasSocialesActivar,
    urlHCAnamnesisMedica,
    urlHCAnamnesisOdontologica,
    urlHCAnamnesisMedicaBuscar,
    urlHCAnamnesisOdontologicaBuscar,
    urlHCODSituaciondentaria,
    urlHCFotoOdontograma,
    urlHCODUltimaFoto,
    urlHCNro,
    urlHCCreate,
    urlHCCreateDiagnostico,
    urlHCDiagnosticoBuscar,
    urlResourcePacientesUpdate, 
    urlCorreoCrearCuenta,
    urlCodigoCrearCuentaCreate,
    urlvalidarcodigoemail,
    urlCrearCliente,
    urlValoresPantallaInicio,
    urlLoginUsuario,
    urlValidarTokenEmailResetPassword,
    urlUpdatePassword,
    urlTokenEmailProfesional,
    urlResourceIDProfesionalEmail,
    urlenviarrecordatorioxmailtodalagrilla,
    urlenviarrecordatorioxmailpacienteseleccionado,
    urlResourcepostTurnoCobrar,
    urlResourceTarjetasdeCreditos,
    urlResourcepostTurnoRegistrarPrestaciones,
    urlResourceTurnoIDPrestaciones,
    urlResourceTurnoIDDetalle,
    urlResourceTurnosProfesionalDiaAtiende
}