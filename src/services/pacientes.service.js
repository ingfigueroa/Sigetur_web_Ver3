
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
import { Email } from "@mui/icons-material";
 const urlResource = config.urlResourcePacientes;
 const urlResourceAdd = config.urlResourcePacientesAdd;
 const urlResourceUpdate = config.urlResourcePacientesUpdate;
 const urlResourceID = config.urlResourcePacienteID;
 const urlResourceUltimosTurnos = config.urlResourcePacienteUltimosTurnos;

 async function Buscar(idcliente, Apellido, VarDni, pagina, cantidadPorPagina) {

  const resp = await httpService.get(urlResource, {
    params: { idcliente, Apellido, VarDni, pagina, cantidadPorPagina},
  });
  return resp.data;
}


async function BuscarPorId(idcliente, idpaciente) {
 
  const resp = await httpService.get(urlResourceID, {
    params: {idcliente, idpaciente},
  } );
  
  return resp.data;
}


async function BuscarUltimosTurnos(idcliente, idpaciente) {
  
  const resp = await httpService.get(urlResourceUltimosTurnos, {
    params: {idcliente, idpaciente},
  } );

  return resp.data;
}



async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}

/* 
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
} */

  async function GrabarAlta(data) {
  try {
    // 🔎 Log completo
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    const response = await httpService.post(urlResourceAdd, data);

    console.log("Respuesta backend:", response.data);

    return response.data;

  } catch (error) {
    console.error(
      "Error al registrar el paciente:",
      error.response?.data || error.message
    );

    throw error;
  }
}


  async function GrabarModificar(data) {
  try {
    // 🔎 Log completo
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    

    const response = await httpService.post(urlResourceUpdate, data);

 

    return response.data;

  } catch (error) {
    console.error(
      "Error al registrar el paciente:",
      error.response?.data || error.message
    );

    throw error;
  }
}



export const pacientesService = {
  Buscar,BuscarPorId,ActivarDesactivar,GrabarAlta, BuscarUltimosTurnos, GrabarModificar
};
