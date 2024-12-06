
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResource = config.urlResourceProfesional;
 const urlResourceID = config.urlResourceProfesionalID;
 const urlResourceProsefionalHorarios = config.urlResourceProfesionalHorarios;



async function Buscar(Apellido, VarDni, idprofesion) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni, idprofesion },
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


async function BuscarId(idprofesional) {
  const resp = await httpService.get(urlResourceID, {
    params: {idprofesional},
  } );

  return resp.data;
}

export const profesionalesService = {
  Buscar, BuscarId, ActivarDesactivar, GrabarAlta, BuscarHorarios
};
