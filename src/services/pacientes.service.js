
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourcePacientes;
 const urlResourceAdd = config.urlResourcePacientesAdd;
 const urlResourceID = config.urlResourcePacienteID;
 const urlResourceUltimosTurnos = config.urlResourcePacienteUltimosTurnos;

 async function Buscar(Apellido, VarDni) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni },
  });
  return resp.data;
}


async function BuscarPorId(idpaciente) {
 
  const resp = await httpService.get(urlResourceID, {
    params: {idpaciente},
  } );

  return resp.data;
}


async function BuscarUltimosTurnos(idpaciente) {
  console.log(idpaciente)
  const resp = await httpService.get(urlResourceUltimosTurnos, {
    params: {idpaciente},
  } );

  return resp.data;
}



async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}


async function GrabarAlta(idpaciente, Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, idusuario, nuevo) {
  try {
   

    await httpService.post(urlResourceAdd, {
      idpaciente,
      Nombres, 
      Apellido, 
      TipoDocumento,
      NroDocumento, 
      EMail, 
      FechaNacimiento, 
      TECelular, 
      Sexo,
      idusuario,
      nuevo
      
    });
   
  } catch (error) {
    console.error('Error al registrar el paciente:', error.response?.data || error.message);
  }
}


export const pacientesService = {
  Buscar,BuscarPorId,ActivarDesactivar,GrabarAlta, BuscarUltimosTurnos
};
