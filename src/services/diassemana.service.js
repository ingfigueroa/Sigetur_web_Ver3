import httpService from "./http.service.js";

import {config} from "../config.js";

const urlResourceDiasSemanaListar = config.urlResourceDiasSemanaListar;


async function getBuscar() {
  const resp = await httpService.get(urlResourceDiasSemanaListar);
  
  return resp.data;

  
};

export const diassemanaService = {
  getBuscar,
};