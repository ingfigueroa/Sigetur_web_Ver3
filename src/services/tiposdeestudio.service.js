import httpService from "./http.service.js";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import {
  config
} from "../config.js";

const urlTiposdeEstudio = config.urlTiposdeEstudio;
const urlSubirArchivo = config.urlSubirArchivo;


async function getTiposdeEstudio() {
  try {

  
    const resp = await httpService.get(urlTiposdeEstudio);
    
    return resp.data;

  } catch (error) {

    throw error;
  }
}

async function postSubirArchivo(formData) {
  try {

 console.log("Respuesta  POST SUBIR ARCHIVOS ")

    const res = await httpService.post(urlSubirArchivo, formData);

    console.log(res)
    
    return res;

  } catch (error) {

    throw error;
  }
}



export const tiposdeEstudio = {
  getTiposdeEstudio, postSubirArchivo
};
