import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceIntervalosListar = config.urlResourceIntervalosListar;



async function getBuscar() {
  const resp = await httpService.get(urlResourceIntervalosListar);
  
  return resp.data;

  
};

export const intervalosService = {
  getBuscar, 
};