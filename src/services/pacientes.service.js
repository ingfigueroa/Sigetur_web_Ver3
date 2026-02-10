
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
import { Email } from "@mui/icons-material";
 const urlResource = config.urlResourcePacientes;
 const urlResourceAdd = config.urlResourcePacientesAdd;
 const urlResourceID = config.urlResourcePacienteID;
 const urlResourceUltimosTurnos = config.urlResourcePacienteUltimosTurnos;

 async function Buscar(Apellido, VarDni, pagina, cantidadPorPagina) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni, pagina, cantidadPorPagina},
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
  
  const resp = await httpService.get(urlResourceUltimosTurnos, {
    params: {idpaciente},
  } );

  return resp.data;
}



async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}


async function GrabarAlta( Nombres, Apellido, TipoDocumento, NroDocumento, EMail, FechaNacimiento, TECelular, Sexo, idusuario) {
  try {
   


    await httpService.post(urlResourceAdd, {
     
      Nombres, 
      Apellido, 
      TipoDocumento,
      NroDocumento, 
      EMail, 
      FechaNacimiento, 
      TECelular, 
      Sexo,
      idusuario
      
    });
   
  } catch (error) {
    console.error('Error al registrar el paciente:', error.response?.data || error.message);
  }
}


export const pacientesService = {
  Buscar,BuscarPorId,ActivarDesactivar,GrabarAlta, BuscarUltimosTurnos
};
