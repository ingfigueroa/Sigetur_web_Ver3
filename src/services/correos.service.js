import httpService from "./http.service";
import { config } from "../config.js";

const urlcrearcuentacorreo = config.urlCorreoCrearCuenta;
const urlcreatecodigocrearcuenta = config.urlCorreoCrearCuenta;

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

export const correosServices = {
  CrearCuenta, CreateCodigoCrearCuenta
};