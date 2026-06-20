import httpService from "./http.service";
import { config } from "../config.js";

const urlvalidarcodigoemail = config.urlvalidarcodigoemail;
const urlCrearCliente= config.urlCrearCliente;
const urlValoresPantallaIniciO= config.urlValoresPantallaInicio;
const urlLoginUsuario = config.urlLoginUsuario


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


async function getValidarCodigoEmail(email, token) {
  try {
   
    console.log(email + token)
    const response = await httpService.get(urlvalidarcodigoemail, {
      params: {
        email,
        token
      }
    });

  
   
    console.log(response)
   
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


   async function getValoresPantallaInicial (idcliente, idusuario) {
    try {
     
      const resp = await httpService.get(urlValoresPantallaIniciO, {
        params: {
          idcliente,
          idusuario
        },
      });
    
      return resp.data;
      
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  }

  
async function getLoginUsuario(email, password) {
  try {
   


    const response = await httpService.post(urlLoginUsuario,{
    
        email,
         password
      
        });

    return response.data;

 } catch (error) {
  if (error.response?.data?.mensaje) {
    console.log(error.response.data.mensaje);
    
  
  } else {
    console.log(error);
  }
}
};


export const clientesServices = {
  getValidarCodigoEmail, CrearCliente, getValoresPantallaInicial, getLoginUsuario
};