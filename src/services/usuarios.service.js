import httpService from "./http.service";



 import {config} from "../config.js";

 const urlGetEmail = config.urlResourceUsuarioEmail;

 
async function BuscarUsuarioxEMail(email) {

  const resp = await httpService.get(urlGetEmail, {
    params: {email},
  } );

  return resp.data;
}

export const usuariosService = {
 BuscarUsuarioxEMail
};
