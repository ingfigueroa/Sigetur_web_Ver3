import httpService from "./http.service";
import { config } from "../config.js";

const urlvalidarcodigoemail = config.urlvalidarcodigoemail;
const urlCrearCliente= config.urlCrearCliente;



async function CrearCliente(data) {
  try {
   

    const response = await httpService.post(urlCrearCliente, {
      email: data.email,
      razonsocial: data.razonSocial,
      tipocliente: data.tipoCliente
    });
   
     return response.data; // 👈 CLAVE

  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}


async function getValidarCodigoEmail(email, codigo) {
  try {
   
    const response = await httpService.get(urlvalidarcodigoemail, {
      params: {
        email,
        codigo
      }
    });

    console.log(response)
    const resultado = response.data.resultado
   
    return resultado;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const clientesServices = {
  getValidarCodigoEmail, CrearCliente
};