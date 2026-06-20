import httpService from "./http.service.js";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlValidarTokenEmailResetPassword = config.urlValidarTokenEmailResetPassword;
  const urlUpdatePassword = config.urlUpdatePassword;

    const urlTokenEmailProfesional = config.urlTokenEmailProfesional;


 async function validarTokenResetPassword(token) {
  const resp = await httpService.get(urlValidarTokenEmailResetPassword, {
    params: { token },
  });
  
  return resp.data;
}

async function updatePassword(password, idusuario) {

  const resp = await httpService.post(urlUpdatePassword, {
    password, idusuario 
  });
  
  return resp.data;
}
async function tokenResetPassword(email) {
  try {

    const resp = await httpService.get(urlTokenEmailProfesional, {
      params: { email }
    });
  
    return resp.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    return null; 
  }
}


export const loginService = {
  validarTokenResetPassword, updatePassword, tokenResetPassword
};
