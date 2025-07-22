import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceHorasListar = config.urlResourceHorasListar;


async function getBuscar() {
  const resp = await httpService.get(urlResourceHorasListar);
  
  return resp.data;

  
};

export const horasService = {
  getBuscar,
};