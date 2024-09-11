
import httpService from "./http.service.js";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourceLocalidad;


 async function Buscar(idprovincia) {
  const resp = await httpService.get(urlResource, {
    params: { idprovincia },
  });
  
  return resp.data;
}


export const localidadesService = {
  Buscar
};
