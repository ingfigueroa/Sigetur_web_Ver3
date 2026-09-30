import httpService from "./http.service";
import { config } from "../config.js";

const urlValorDolarOficial = config.urlValorDolarOficial;


async function getValorDolarOficial() {
  try {

    const resp = await httpService.get(urlValorDolarOficial);

    return resp.data;

  } catch (error) {

    console.error(
      "Error al obtener dólar oficial:",
      error.response?.data || error.message
    );

    throw error;
  }
}
  export const apiPublicas = {
  getValorDolarOficial
};
