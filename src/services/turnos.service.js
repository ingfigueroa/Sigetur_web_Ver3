import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import {
  config
} from "../config.js";

const urlResource = config.urlResourceTurnos;
const urlResourcePasaraPendiente = config.urlResourceTurnosPasaraPendiente;
const urlResourceTurnosCrear = config.urlResourceTurnosCrear;
const urlResourceEstadoPorTurnos = config.urlResourceEstadoPorTurnos;
const urlResourceTurnosCambiarEstado = config.urlResourceCambiarEstado;
const urlResourceTurnosConsultasPorFecha = config.urlResourceConsultaTurnos
const urlResourceTurnoID = config.urlResourceTurnoID
const urlResourceTurnoLibreID = config.urlResourceTurnoLibreID
const urlResourceSobreturnoCrear = config.urlResourceSobreturnoPasaraPendiente
const urlResourceTurnosAnularPorPedidoProfesional = config.urlResourceTurnosAnularPorPedidoProfesional;
const urlResourceTurnosProfesionalDiaCancelados = config.urlResourceTurnosProfesionalDiaCancelados;
const urlResourceAgeSemTurProfFecha = config.urlResourceAgSeTurProfFecha
const urlResourceAgeSemTurProfFechaAgrup = config.urlResourceAgeSemTurProfFechaAgrupado
const urlResourceListadeEspera = config.urlResourceTurnosListadeEspera
const urlResourceMailTurnosProfesional = config.urlResourceMailTurnosProfesional
const urlResourceTurnosLibresFechaMes = config.urlResourceturnoslibresfechames

async function TurnosAnularPorPedidoProfesional(idprofesional, observaciones, fecha, idusuario) {

  try {

    const resp = await httpService.put(urlResourceTurnosAnularPorPedidoProfesional, {
      idprofesional,
      observaciones,
      fecha,
      idusuario
    });

  } catch (error) {
    console.error('Error al cambiar el estado a turno:', error.response?.data || error.message);
  }

}


async function CrearTurnosPorProfesionalPorFecha(idusuario, idprof, fecha) {
  const resp = await httpService.get(urlResourceTurnosCrear, {
    params: {
      idusuario,
      idprof,
      fecha
    },
  });
  return resp.data;
}



async function Agendasemanal_PorProfesionalPorFecha(idprof, fecha) {

  const resp = await httpService.get(urlResourceAgeSemTurProfFecha, {
    params: {
      idprof,
      fecha
    },
  });

  return resp.data;
}

async function Agendasemanal_FechasAgrupadas(idprof, fecha) {

  const resp = await httpService.get(urlResourceAgeSemTurProfFechaAgrup, {
    params: {
      idprof,
      fecha
    },
  });

  return resp.data;
}


async function TurnosPorProfesionalDiaCancelados(idprof, fecha) {


  const resp = await httpService.get(urlResourceTurnosProfesionalDiaCancelados, {
    params: {
      idprof,
      fecha
    },
  });
  return resp.data;
}


async function TurnoID(idturno) {

  

  const resp = await httpService.get(urlResourceTurnoID, {
    params: {
      idturno
    },

  });

  return resp.data;


}


async function TurnoLibreID(idturno) {

  

  const resp = await httpService.get(urlResourceTurnoLibreID, {
    params: {
      idturno
    },

  });

  return resp.data;


}


async function EstadosPorTurno(idturno) {


  const resp = await httpService.get(urlResourceEstadoPorTurnos, {
    params: {
      idturno,
    },

  });

  return resp.data;


}

async function TurnosCambiarEstado(IDTurno, idestado, Observaciones, IDUsuario, vieneDE) {
  try {
   
    const resp = await httpService.put(urlResourceTurnosCambiarEstado, {
      IDTurno,
      idestado,
      Observaciones,
      IDUsuario,
      vieneDE
    });


  } catch (error) {
    console.error('Error al cambiar el estado a turno:', error.response?.data || error.message);
  }
}



async function BuscarPorProfesionalFecha(IDProf, Fecha) {


  const resp = await httpService.get(urlResource, {
    params: {
      IDProf,
      Fecha
    },
  });
 
  return resp.data;
}

async function GrabarTurnoPaciente(IDTurno, IDPac, IDOS, Obs, IDUsuario) {
  try {



    await httpService.put(urlResourcePasaraPendiente, {

      IDTurno,
      IDPac,
      IDOS,
      Obs,
      IDUsuario

    });


  } catch (error) {
    console.error('Error al registrar el turno:', error.response?.data || error.message);
    // Capturar el mensaje de error si la solicitud falla

  }
}


async function TurnosConsultaPorFecha(fechadesde, fechahasta, idprofesion, idestado, pagina, cantidadPorPagina) {
  try {
   
    const resp = await httpService.get(urlResourceTurnosConsultasPorFecha, {
      params: {
        fechadesde,
        fechahasta,
        idprofesion,
        idestado,
        pagina,
        cantidadPorPagina
      }
    });
    return resp.data;
  } catch (error) {
    console.error('Error en TurnosConsultaPorFecha:', error);
    return null; // o lanzar error si querés que lo maneje el componente
  }
}


async function TurnosLibresDelMes(idprofesional, fechadesde, fechahasta, pagina, cantidadPorPagina) {
  try {

      
    const resp = await httpService.get(urlResourceTurnosLibresFechaMes 
, {
      params: {
        idprofesional,
        fechadesde,
        fechahasta,
        pagina,
        cantidadPorPagina
      }
    });
 
    return resp.data;
  } catch (error) {
    console.error('Error en TurnosConsultaPorFecha:', error);
    return null; // o lanzar error si querés que lo maneje el componente
  }
}



async function enviarTurnosProfesionalpoFecha(turnos) {
  try {
   
    await httpService.post(urlResourceMailTurnosProfesional, {
           turnos
     
    });
   
  } catch (error) {
    console.error('Error al enviar el mail al profesional:', error.response?.data || error.message);
  }
}

async function GrabarSobreturnoPaciente(idprofesional, idpaciente, idobrasocial, fecha, observaciones, idusuario) {
 

  try {
    const response = await httpService.post(urlResourceSobreturnoCrear,{
      idprofesional,
      idpaciente,
      idobrasocial,
      fecha,
      observaciones,
      idusuario 
    });
    console.log('Turno registrado correctamente:', response.data);
    return response.data; // útil si el llamador necesita saber el resultado
  } catch (error) {
    const mensajeError = error.response?.data?.message || error.message || 'Error desconocido';
    console.error('Error al registrar el turno:', mensajeError);
    throw new Error(mensajeError); // importante si querés que quien llama pueda reaccionar
  }
}


export const turnosService = {
  BuscarPorProfesionalFecha,
  GrabarTurnoPaciente,
  CrearTurnosPorProfesionalPorFecha,
  TurnosCambiarEstado,
  EstadosPorTurno,
  TurnosAnularPorPedidoProfesional,
  TurnosPorProfesionalDiaCancelados,
  Agendasemanal_PorProfesionalPorFecha,
  Agendasemanal_FechasAgrupadas,
  TurnosConsultaPorFecha,
  TurnoID,
  TurnoLibreID,
  enviarTurnosProfesionalpoFecha,
  GrabarSobreturnoPaciente,
  TurnosLibresDelMes
  };