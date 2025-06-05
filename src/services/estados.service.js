import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";

 const urlResourceEstados = config.urlResourceEstado;




async function Buscar() {
  const resp = await httpService.get(urlResourceEstados);
  return resp.data;
}



export const estadosService = {
  Buscar,
};
