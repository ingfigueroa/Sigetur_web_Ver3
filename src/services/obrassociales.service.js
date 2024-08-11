
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourceObrasSociales;


async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Id);
  return resp.data;
}


async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.Id);
}


async function Grabar(item) {
  if (item.Id === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Id, item);
  }
}


export const obrassocialesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
