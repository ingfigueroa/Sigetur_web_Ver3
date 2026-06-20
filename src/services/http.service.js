import axios from "axios";
import modalService from "./modalDialog.service";


const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});


httpService.interceptors.request.use(
  (request) => {
    
    modalService.BloquearPantalla(true);

    const token = localStorage.getItem("token");

    if (token) {
     request.headers.Authorization = `Bearer ${token}`;
    }
   
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  (error) => {
    modalService.BloquearPantalla(false);

    if (error.response && error.response.status === 401) {

      modalService.Alert(
        "Su sesión ha expirado. Debe volver a iniciar sesión.",
        "Sesión expirada",
        "Aceptar"
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default httpService;
