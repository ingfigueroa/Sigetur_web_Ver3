
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResource = config.urlResourceProfesional;
 const urlResourceID = config.urlResourceProfesionalID;
 const urlResourceProsefionalHorarios = config.urlResourceProfesionalHorarios;
 const urlResourceProfesionalDarBaja = config.urlResourceProfesionalDarBaja
const urlResourceProfesionalFechaCambioHorario = config.urlResourceProfesionalFechaCambioHorario
const urlResourceProfesionalCambioHorario = config.urlResourceProfesionalCambioHorario



async function Buscar(Apellido, VarDni, idprofesion, pagina, cantidadPorPagina) {
 
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni, idprofesion, pagina, cantidadPorPagina },
  });
  return resp.data;
}

async function BuscarHorarios(idprofesional, fecha) {


  const resp = await httpService.get(urlResourceProsefionalHorarios, {
    params: { idprofesional, fecha },
  });
  return resp.data;
}



async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}

async function GrabarAlta(idProfesional, Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, CuitCuil, matriculanro, idtipoprofesion, idusuario, nuevo) {
  try {
   
    await httpService.post(urlResource, {
      idProfesional,
      Nombres, 
      Apellido, 
      TipoDocumento,
      NroDocumento, 
      EMail, 
      FechaNacimiento, 
      TECelular, 
      Sexo,
      CuitCuil, 
      matriculanro, 
      idtipoprofesion,
      idusuario,
      nuevo
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}


async function GrabarBaja(idprofesional, observaciones, idusuario) {
  try {
 
    await httpService.put(urlResourceProfesionalDarBaja, {
      idprofesional,
      observaciones,
      idusuario
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}



async function BuscarId(idprofesional) {
  const resp = await httpService.get(urlResourceID, {
    params: {idprofesional},
  } );

  return resp.data;
}


async function getBuscarFechaCambioHorario(idprofesional) {

 
  const resp = await httpService.get(urlResourceProfesionalFechaCambioHorario, {
    params: { idprofesional },
  });
  
  return resp.data;
}

async function putCambioHorarioMultiple(payload){
  try{
  
    console.log(payload)
  await httpService.post(urlResourceProfesionalCambioHorario, payload );
  
  //return httpService.post("/profesional/cambiohorariomultiple", payload);
  
  } catch (error) {
  if (error.response) {
    // Hubo respuesta del servidor (status 4xx o 5xx)
    console.error('Error al actualizar el cambio de horario:',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    // La request salió pero no hubo respuesta
    console.error('No hubo respuesta del servidor:', error.request);
  } else {
    // Otro tipo de error (configuración, etc.)
    console.error('Error al enviar la request:', error.message);
  }
}
};


/* 
async function putCambioHorario(
        idprofesional,
        iddia,
        idmañanatrabaja,
        idmañanadesde,
        idmañanahasta,
        idmañanaintervalo,
        tardetrabaja,
        idtardedesde,
        idtardehasta,
        idtardeintervalo,
        nochetrabaja,
        idnochedesde,
        idnochehasta,
        idnocheintervalo,
        fechadesde) {
  try {
 
    await httpService.put(urlResourceProfesionalCambioHorario, {
        idprofesional,
        iddia,
        idmañanatrabaja,
        idmañanadesde,
        idmañanahasta,
        idmañanaintervalo,
        tardetrabaja,
        idtardedesde,
        idtardehasta,
        idtardeintervalo,
        nochetrabaja,
        idnochedesde,
        idnochehasta,
        idnocheintervalo,
        fechadesde
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}
 */
export const profesionalesService = {
  Buscar, BuscarId, ActivarDesactivar, GrabarAlta, BuscarHorarios, GrabarBaja, getBuscarFechaCambioHorario, putCambioHorarioMultiple
};
