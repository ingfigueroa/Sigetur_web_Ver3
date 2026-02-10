import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

import {
  config
} from "../config.js";


const HCAnamnesisMedica = config.urlHCAnamnesisMedica;
const HCAnamnesisOdontologica = config.urlHCAnamnesisOdontologica;
const HCAnamnesisMedicaBuscar = config.urlHCAnamnesisMedicaBuscar;

export const historiaclinicaService = {

  GrabarAnamnesisMedica: async (payload) => {
    try {
      console.log(payload)
      const response = await httpService.post(HCAnamnesisMedica, payload);
      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }
  },

  
  GrabarAnamnesisOdontologica: async (payload) => {
    try {

      console.log("Llega hasta aca")
      console.log(payload)
      const response = await httpService.post(HCAnamnesisOdontologica, payload);
      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }
  },


  getHCAnamnesisMedicas: async (idpaciente) => {
    try {
      console.log(idpaciente)
      const resp = await httpService.get(HCAnamnesisMedicaBuscar, {
        params: {
          idpaciente
        },
      });
      /* const resp = await httpService.get(HCAnamnesisMedicaBuscar, idpaciente); */
      return resp.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  }
};