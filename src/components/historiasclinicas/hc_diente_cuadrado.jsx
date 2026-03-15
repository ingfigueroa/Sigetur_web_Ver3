import React from "react";

const hc_diente = ({ pieza, data, modo, tipoSeleccionado, onActualizar }) => {
  const numero = Number(pieza);
  
  const numeroAbajo =
    (numero >= 31 && numero <= 48) || (numero >= 71 && numero <= 85);

  const posicionY = numeroAbajo ? 60 : -8;

  const getColor = (cara) => {
    const caraNormalizada = cara.toLowerCase();

    const color = data?.caras?.[caraNormalizada]?.color;

    return color || "#ffffff";
  };

  const handleClickCara = (cara) => {
   
    onActualizar(pieza, cara, tipoSeleccionado);
  };

  return (
    <g>
      <g>
        {/* Cara Superior */}

        <polygon
          points="0 0 10 12 30 12 42 0"
          fill={getColor("vestibular")}
          stroke="black"
          onClick={() => handleClickCara("vestibular")}
        />

        {/* Cara Izquierda */}
        <polygon
          points="0 0 10 12 10 28 0 42"
          fill={getColor("mesial")}
          stroke="black"
          onClick={() => handleClickCara("mesial")}
        />

        {/* Cara Derecha */}
        <polygon
          points="30 12 40 0 40 42 30 28"
          fill={getColor("distal")}
          stroke="black"
          onClick={() => handleClickCara("distal")}
        />

        {/* Cara Inferior */}
        <polygon
          points="0 42 10 30 30 28 40 42"
          fill={getColor("lingual")}
          stroke="black"
          onClick={() => handleClickCara("lingual")}
        />

        {/* Centro */}
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          fill={getColor("oclusal")}
          stroke="black"
          onClick={() => handleClickCara("oclusal")}
        />

    {/*    {tipoSeleccionado.situaciondentaria === "CARIES" && (
  <circle
    cx="20"
    cy="20"
    r="6"
    fill="#FF6B6B"
    opacity="0.7"
    pointerEvents="none"
  />
)} */}
      </g>

      {/* Número de pieza */}
      <text
        x="20"
        y={posicionY}
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        fill="#333"
      >
        {/* <a href=""> {pieza}</a>  */}
        {pieza}
      </text>
    </g>
  );
};

export default hc_diente;
