
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResource = config.urlResourceProfesional;
 const urlResourceProfesionalAdd = config.urlResourceProfesionalAdd;
 const urlResourceID = config.urlResourceProfesionalID;
 const urlResourceProsefionalHorarios = config.urlResourceProfesionalHorarios;
 const urlResourceProfesionalDarBaja = config.urlResourceProfesionalDarBaja
const urlResourceProfesionalFechaCambioHorario = config.urlResourceProfesionalFechaCambioHorario
const urlResourceProfesionalCambioHorario = config.urlResourceProfesionalCambioHorario
const urlResourceIDProfesionalEmail = config.urlResourceIDProfesionalEmail




async function Buscar(idcliente, Apellido, VarDni, idprofesion, pagina, cantidadPorPagina) {
  
  const resp = await httpService.get(urlResource, {
    params: { idcliente, Apellido, VarDni, idprofesion, pagina, cantidadPorPagina },
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

async function GrabarAlta(idcliente, idProfesional, Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, CuitCuil, matriculanro, idtipoprofesion, idusuario, nuevo) {


  try {
  
    
    const response = await httpService.post(urlResourceProfesionalAdd, {
      idcliente,
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
   


  return response

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



async function BuscarId(idcliente, idprofesional) {
 
  const resp = await httpService.get(urlResourceID, {
    params: {idcliente, idprofesional},
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



async function BuscarIDProfesionalxEMail(email, idcliente) {

  const resp = await httpService.get(urlResourceIDProfesionalEmail, {
    params: {email, idcliente},
  } );

  return resp.data;
}

export const profesionalesService = {
  Buscar, BuscarId, ActivarDesactivar, GrabarAlta, BuscarHorarios, GrabarBaja, getBuscarFechaCambioHorario, putCambioHorarioMultiple, BuscarIDProfesionalxEMail
};
