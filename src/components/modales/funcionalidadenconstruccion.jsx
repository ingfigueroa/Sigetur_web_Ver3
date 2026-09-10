
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import "../../css/funcionalidadenconstruccion.css";

const funcionalidadenconstruccion = ({titulo1}) => {
  return (
    <div className="funcionalidad-construccion">
      
     <h2>{titulo1}</h2> 
     <FontAwesomeIcon
        icon={faScrewdriverWrench}
        className="icono-construccion"
      />

     <h3>Funcionalidad en construcción</h3>
      <p> Estamos trabajando para incorporar esta funcionalidad. </p> 
      <span>Próximamente estará disponible.</span>
    </div>
  );
};

export default funcionalidadenconstruccion;

