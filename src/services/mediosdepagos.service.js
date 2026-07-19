import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceMediosdePagos = config.urlResourceMediosdePagos;
const urlResourceTarjetasdeCreditos = config.urlResourceTarjetasdeCreditos;


async function getBuscar() {
  const resp = await httpService.get(urlResourceMediosdePagos);
  
  return resp.data;

  
};

async function getBuscarTarjetas(tarjetade) {
  const resp = await httpService.get(urlResourceTarjetasdeCreditos, {
    params: {tarjetade},
  } );
  
  return resp.data;

  
};



export const mediosdepagosService = {
  getBuscar, getBuscarTarjetas
};