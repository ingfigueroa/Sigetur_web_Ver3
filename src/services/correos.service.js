import httpService from "./http.service";
import { config } from "../config.js";

const urlcrearcuentacorreo = config.urlCorreoCrearCuenta;
const urlcreatecodigocrearcuenta = config.urlCorreoCrearCuenta;
const urlenviarrecordatorioxmailtodalagrilla = config.urlenviarrecordatorioxmailtodalagrilla;
const urlenviarrecordatorioxmailpacienteseleccionado = config.urlenviarrecordatorioxmailpacienteseleccionado;

async function CrearCuenta(email) {


 

  try {
    const response = await httpService.post(urlcrearcuentacorreo, {
      email: email,
      
      
    });
  
    return response.data;
  } catch (error) {
    console.error("pasa por aca" + error);
    throw error;
  }
};


async function CreateCodigoCrearCuenta(email, codigo) {

  console.error("pasa por aca");
  try {
    const response = await httpService.post(urlcreatecodigocrearcuenta, {
      email: email,
      codigo: codigo,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
async function  EnviarRecordatoriosxMailTodaLaGrilla(turnos, clinica) {
  try {
     const response = await httpService.post(urlenviarrecordatorioxmailtodalagrilla, {
      turnos,
      clinica
    });
    return response;
  } catch (error) {
    
  }
  
};

async function  EnviarRecordatoriosxMailPacienteSeleccionado(turno, clinica) {
  try {
     const response = await httpService.post(urlenviarrecordatorioxmailpacienteseleccionado, {
      turno,
      clinica
    });
    return response;
  } catch (error) {
    
  }
  
};


export const correosServices = {
  CrearCuenta, CreateCodigoCrearCuenta, EnviarRecordatoriosxMailTodaLaGrilla, EnviarRecordatoriosxMailPacienteSeleccionado
};