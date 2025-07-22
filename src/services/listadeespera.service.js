import httpService from "./http.service";

import {config} from "../config.js";

const urlResourceListadeesperaListar = config.urlResourceListadeesperaListar;
const urlResourceListadeEsperaAlta = config.urlResourceListadeEsperaAlta;
const urlResourceListadeEsperaBajaFila = config.urlResourceListadeEsperaBajaFila;



async function getBuscar(pagina, cantidadPorPagina, apellidoPaciente, apellidoProfesional) {
  console.log(apellidoPaciente)
  console.log(apellidoProfesional)
  const resp = await httpService.get(urlResourceListadeesperaListar, { 
    params: { pagina, cantidadPorPagina, apellidoPaciente, apellidoProfesional},
  });

  
  return resp.data;

  
};


async function AltaTurnoListadeEspera(idprofesional, idpaciente, idhoradesde, idhorahasta, fechadesde, fechahasta, lunes, martes, miercoles, jueves, viernes, sabado, domingo, observaciones, idusuario) {
  try {



    const resp = await httpService.post(urlResourceListadeEsperaAlta, {
      idprofesional,
      idpaciente,
      idhoradesde,
      idhorahasta,
      fechadesde,
      fechahasta,
      lunes,
      martes,
      miercoles,
      jueves,
      viernes,
      sabado,
      domingo,
      observaciones,
      idusuario
    });
   
   
    return resp.data
  } catch (error) {
    console.error('Error en ALTA DE LISTA DE ESPERA:', error);
    return null; // o lanzar error si querés que lo maneje el componente
  }
}

async function BajaFilaListadeEspera(id) {
  try {



    const resp = await httpService.post(urlResourceListadeEsperaBajaFila, {
      id
    });
   
   
    return resp.data
  } catch (error) {
    console.error('Error en la BAJA DE UNA FILA DE LA LISTA DE ESPERA:', error);
    return null; // o lanzar error si querés que lo maneje el componente
  }
}
export const listadeesperaService = {
  getBuscar,
  AltaTurnoListadeEspera,
  BajaFilaListadeEspera

};