import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

import {
  config
} from "../config.js";


const HCAnamnesisMedica = config.urlHCAnamnesisMedica;
const HCAnamnesisOdontologica = config.urlHCAnamnesisOdontologica;
const HCAnamnesisMedicaBuscar = config.urlHCAnamnesisMedicaBuscar;
const HCAnamnesisOdontologicaBuscar = config.urlHCAnamnesisOdontologicaBuscar;
const HCODSituacionDentaria = config.urlHCODSituaciondentaria;
const HCFotoOdontograma = config.urlHCFotoOdontograma;
const HCUltimaFotoOdontograma = config.urlHCODUltimaFoto;
const HCNro = config.urlHCNro;
const HCCreate = config.urlHCCreate;




export const historiaclinicaService = {

  CreateHC: async (idpaciente, idprofesional, idusuario) => {
    try {
     
      const response = await httpService.post(HCCreate, {
        idpaciente,
        idprofesional,
        idusuario
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }
  },

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

  
GrabarFotoOdontograma: async (payload) => {
  try {

    if (!Array.isArray(payload) || payload.length === 0) {
      throw new Error("El odontograma debe enviarse como un array no vacío");
    }

    const response = await httpService.post(HCFotoOdontograma, payload);

    return response.data;

  } catch (error) {

    console.error(
      "Error al registrar foto de odontograma:",
      error.response?.data?.message || error.message
    );

    throw error; // importante para que el componente lo capture
  }
},


  getHCAnamnesisMedicas: async (idpaciente) => {
    try {
     
      const resp = await httpService.get(HCAnamnesisMedicaBuscar, {
        params: {
          idpaciente
        },
      });
     
      return resp.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  },

  
  getHCAnamnesisOdontologica: async (idpaciente) => {
    try {
      
      const resp = await httpService.get(HCAnamnesisOdontologicaBuscar, {
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

  },

   getHCSituacionDentaria: async () => {
    try {
      
      const resp = await httpService.get(HCODSituacionDentaria);
      
      return resp.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  },

  
  getHCUltimaFoto: async (idpaciente) => {
    try {
     
      const resp = await httpService.get(HCUltimaFotoOdontograma, {
        params: {
          idpaciente
        },
      });
     
      return resp.data;

    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  },

  
  getHCNro: async (idpaciente) => {
    try {
     
      const resp = await httpService.get(HCNro, {
        params: {
          idpaciente
        },
      });
     
      return resp.data;
    } catch (error) {
      console.error(
        "Error al registrar anamnesis:",
        error.response?.data || error.message
      );
      throw error; // importante para que el componente lo capture
    }

  },


  
};