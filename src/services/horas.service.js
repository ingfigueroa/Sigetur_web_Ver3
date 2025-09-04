import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceHorasListar = config.urlResourceHorasListar;
const urlResourceHorasMananaTardeNoche = config.urlResourceHorasMananaTardeNoche;


async function getBuscar() {
  const resp = await httpService.get(urlResourceHorasListar);
  
  return resp.data;

  
};


async function getHorasMananaTardeNoche() {
  const resp = await httpService.get(urlResourceHorasMananaTardeNoche);
  
  return resp.data;

  
};

export const horasService = {
  getBuscar, getHorasMananaTardeNoche,
};