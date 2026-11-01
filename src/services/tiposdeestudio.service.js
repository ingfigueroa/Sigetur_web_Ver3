import httpService from "./http.service.js";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import {
  config
} from "../config.js";

const urlTiposdeEstudio = config.urlTiposdeEstudio;
const urlSubirArchivo = config.urlSubirArchivo;
const urlObtenerImagenDrive = config.urlObtenerImagenDrive;


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


    const res = await httpService.post(urlSubirArchivo, formData);

    
    return res;

  } catch (error) {

    throw error;
  }
}


async function getImagenDrive(idDrive) {
  try {
    const resp = await httpService.get(urlObtenerImagenDrive, {
      params: { idDrive },
      responseType: "blob",
    });

    return resp.data;
  } catch (error) {
    throw error;
  }
}



export const tiposdeEstudio = {
  getTiposdeEstudio, postSubirArchivo, getImagenDrive
};
