
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourceCapitulos;
 const urlResourcePrestaciones = config.urlResourcePrestaciones;
 const urlResourcePrestacion = config.urlResourcePrestacion;


async function BuscarCapitulos(idprofesion) {
 
  const resp = await httpService.get(urlResource, {
    params: { idprofesion },

  });
  return resp.data;
}

async function BuscarPrestaciones(idcapitulo) {
  const resp = await httpService.get(urlResourcePrestaciones, {
    params: { idcapitulo },

  });
  return resp.data;
}


async function BuscarPrestacion(idprestacion) {
  const resp = await httpService.get(urlResourcePrestacion, {
    params: { idprestacion },

  });
  return resp.data;
}



export const prestacionesService = {
  BuscarCapitulos, BuscarPrestaciones, BuscarPrestacion
};
