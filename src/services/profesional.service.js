
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourceProfesional;


async function Buscar(Apellido, VarDni) {
  const resp = await httpService.get(urlResource, {
    params: { Apellido, VarDni },
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
  if (item.IdArticulo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.Id, item);
  }
}


export const profesionalesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
