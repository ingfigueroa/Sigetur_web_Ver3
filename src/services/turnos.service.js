import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResource = config.urlResourceTurnos;
 const urlResourcePasaraPendiente = config.urlResourceTurnosPasaraPendiente;
 const urlResourceTurnosCrear = config.urlResourceTurnosCrear;
 const urlResourceEstadoPorTurnos = config.urlResourceEstadoPorTurnos;
 const urlResourceTurnosCambiarEstado = config.urlResourceCambiarEstado;
 const urlResourceTurnosAnularPorPedidoProfesional = config.urlResourceTurnosAnularPorPedidoProfesional;

 async function TurnosAnularPorPedidoProfesional( idprof, observaciones, fecha, idusuario) {
  console.log(idprof)
  console.log(observaciones)
  console.log(fecha)
  console.log(idusuario)
 try {
  const resp = await httpService.put(urlResourceTurnosAnularPorPedidoProfesional, {
     idprof,
     observaciones,
     fecha,
     idusuario },
  );

} catch (error) {
  console.error('Error al cambiar el estado a turno:', error.response?.data || error.message);
}

  
}


 async function CrearTurnosPorProfesionalPorFecha(idusuario, idprof, fecha) {
  const resp = await httpService.get(urlResourceTurnosCrear, {
    params: { idusuario, idprof, fecha },
  });
  return resp.data;
}


async function EstadosPorTurno(idturno) {
  
   
    const resp = await httpService.get(urlResourceEstadoPorTurnos, {
     params: { idturno, },
      
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
    params: { IDProf, Fecha },
  });
  return resp.data;
}

async function GrabarTurnoPaciente(IDTurno,IDPac,IDOS, Obs,IDUsuario) {
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


export const turnosService = {
  BuscarPorProfesionalFecha, GrabarTurnoPaciente, CrearTurnosPorProfesionalPorFecha, TurnosCambiarEstado, EstadosPorTurno, TurnosAnularPorPedidoProfesional
};