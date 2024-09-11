
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourcePacientes;


 async function Buscar(Apellido, VarDni) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Id);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}


async function GrabarAlta(Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo) {
  try {
   
    await httpService.post(urlResource, {
      Nombres, 
      Apellido, 
      TipoDocumento,
      NroDocumento, 
      EMail, 
      FechaNacimiento, 
      TECelular, 
      Sexo
      
    });
   
  } catch (error) {
    console.error('Error al registrar el paciente:', error.response?.data || error.message);
  }
}


export const pacientesService = {
  Buscar,BuscarPorId,ActivarDesactivar,GrabarAlta
};
