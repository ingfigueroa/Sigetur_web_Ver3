
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config.js";
 const urlResource = config.urlResourceObrasSociales;
 const urlResource1 = config.urlResourceObrasSocialesPorPaciente;
 const urlResourceAsignarPaciente = config.urlResourceObrasSocialesAsignarPaciente;
  const urlResourceDesafectarPaciente = config.urlResourceObrasSocialesDesafectarPaciente;

  const urlResourceActivarObraSocial = config.urlResourceObrasSocialesActivar;


async function Buscar(Nombre,sigla, bandera, pagina, cantidadPorPagina) {
  
  const resp = await httpService.get(urlResource, {
    params: { Nombre, sigla, bandera, pagina, cantidadPorPagina },
  });
 
  return resp.data;
}

async function BuscarPorPaciente(idpaciente) {
 console.log(idpaciente)
  const resp = await httpService.get(urlResource1, {
   
    params: { idpaciente }
  });

 
  return resp.data;
}


async function BuscarPorProfesional(idprofesional) {
 
  const resp = await httpService.get(urlResource1, {
    
    params: { idprofesional }
  });

  
  return resp.data;
}


async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.Id);
  return resp.data;
}






async function putAsignarObraSocialPaciente(idpaciente,idobrasocial, idusuario) {
  try {
 console.log("Por aca pasa post")
    await httpService.put(urlResourceAsignarPaciente, {
      idpaciente,
      idobrasocial,
      idusuario
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}


async function putDesafectarObraSocialPaciente(idpaciente,idobrasocial, idusuario) {
  try {
 
    await httpService.put(urlResourceDesafectarPaciente, {
      idpaciente,
      idobrasocial,
      idusuario
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}


async function putActivarObraSocial(idobrasocial) {
  try {

    await httpService.put(urlResourceActivarObraSocial, {
      
      idobrasocial
    });
   
  } catch (error) {
    console.error('Error al registrar el profesional:', error.response?.data || error.message);
  }
}

export const obrassocialesService = {
  Buscar, BuscarPorPaciente, BuscarPorProfesional, putAsignarObraSocialPaciente, putDesafectarObraSocialPaciente, putActivarObraSocial
};
