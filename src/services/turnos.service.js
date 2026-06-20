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

async function TurnosAnularPorPedidoProfesional(idcliente, idprofesional, observaciones, fecha, idusuario) {

  try {

    const resp = await httpService.put(urlResourceTurnosAnularPorPedidoProfesional, {
      idcliente,
      idprofesional,
      observaciones,
      fecha,
      idusuario
    });

  } catch (error) {
    console.error('Error al cambiar el estado a turno:', error.response?.data || error.message);
  }

}


async function CrearTurnosPorProfesionalPorFecha(idusuario, idprofesional, fecha, idcliente) {
  const resp = await httpService.get(urlResourceTurnosCrear, {
    params: {
      idusuario,
      idprofesional,
      fecha,
      idcliente
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


async function TurnosPorProfesionalDiaCancelados(idcliente, idprofesional, fecha) {


  const resp = await httpService.get(urlResourceTurnosProfesionalDiaCancelados, {
    params: {
      idcliente,
      idprofesional,
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

async function TurnosCambiarEstado( idturno, idestado, observaciones, idusuario, vieneDE) {
  try {

 
     

    const resp = await httpService.put(urlResourceTurnosCambiarEstado, {
    
      idturno,
      idestado,
      observaciones,
      idusuario,
      vieneDE
    });


  } catch (error) {
    console.error('Error al cambiar el estado a turno:', error.response?.data || error.message);
  }
}



async function BuscarPorProfesionalFecha(idprofesional, fecha, idcliente) {


  const resp = await httpService.get(urlResource, {
    params: {

      idprofesional,
      fecha,
      idcliente
    },
  });
 
  return resp.data;
}

async function GrabarTurnoPaciente( idturno, idpaciente, idos, Obs, idusuario) {
  try {



    await httpService.put(urlResourcePasaraPendiente, {
      
      idturno,
      idpaciente,
      idos,
      Obs,
      idusuario

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


async function TurnosLibresDelMes(idcliente, idprofesional, fechadesde, fechahasta) {
  try {

      
    const resp = await httpService.get(urlResourceTurnosLibresFechaMes 
, {
      params: {
        idcliente,
        idprofesional,
        fechadesde,
        fechahasta
       
      }
    });

    console.log(resp.data)
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

async function GrabarSobreturnoPaciente(idcliente, idprofesional, idpaciente, idobrasocial, fecha, observaciones, idusuario) {
 

  try {
    const response = await httpService.post(urlResourceSobreturnoCrear,{
      idcliente,
      idprofesional,
      idpaciente,
      idobrasocial,
      fecha,
      observaciones,
      idusuario 
    });
    
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