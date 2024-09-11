
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResource = config.urlResourceProfesional;
 const urlResourceID = config.urlResourceProfesionalID;


async function Buscar(Apellido, VarDni, idprofesion) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni, idprofesion },
  });
  return resp.data;
}


async function BuscarPorId(idprofesional) {
  const resp = await httpService.get(urlResourceID, {
    params: {idprofesional},
  } );

  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}

async function GrabarAlta(Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, CuitCuil, matriculanro, idtipoprofesion) {
  try {
   
    await httpService.post(urlResource, {
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
      idtipoprofesion
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}


export const profesionalesService = {
  Buscar,BuscarPorId,ActivarDesactivar,GrabarAlta
};
