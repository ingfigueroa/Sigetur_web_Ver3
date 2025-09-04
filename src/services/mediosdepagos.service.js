import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceMediosdePagos = config.urlResourceMediosdePagos;


async function getBuscar() {
  const resp = await httpService.get(urlResourceMediosdePagos);
  console.log(resp.data)
  return resp.data;

  
};

export const mediosdepagosService = {
  getBuscar,
};