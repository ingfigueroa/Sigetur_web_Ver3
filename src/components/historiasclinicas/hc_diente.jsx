import React from "react";

const hc_diente = ({ pieza, data, modo, tipoSeleccionado, onActualizar }) => {
  const numero = Number(pieza);

  const numeroAbajo =
    (numero >= 31 && numero <= 48) || (numero >= 71 && numero <= 85);

  const posicionY = numeroAbajo ? 60 : -8;

  const getColor = (cara) => {
    if (!data?.caras?.[cara] || data.caras[cara].length === 0) {
      return "#ffffff"; // blanco si no hay tratamiento
    }

    const ultimo = data.caras[cara][data.caras[cara].length - 1];

    if (ultimo.estado === "existente") return "#dc3545"; // rojo
    if (ultimo.estado === "requerido") return "#0d6efd"; // azul
    if (ultimo.estado === "realizado") return "#198754"; // verde

    return "#ffffff";
  };

  const handleClickCara = (cara) => {
    onActualizar(pieza, cara, modo, tipoSeleccionado);
  };

  return (
    <g>
      {/* OCLUSAL */}
      <polygon
        points="20,5 35,20 20,35 5,20"
        fill={getColor("oclusal")}
        stroke="black"
        onClick={() => handleClickCara("oclusal")}
        style={{ cursor: "pointer" }}
      />

      {/* VESTIBULAR */}
      <polygon
        points="5,20 20,35 20,45 5,30"
        fill={getColor("vestibular")}
        stroke="black"
        onClick={() => handleClickCara("vestibular")}
        style={{ cursor: "pointer" }}
      />

      {/* LINGUAL */}
      <polygon
        points="20,35 35,20 35,30 20,45"
        fill={getColor("lingual")}
        stroke="black"
        onClick={() => handleClickCara("lingual")}
        style={{ cursor: "pointer" }}
      />

      {/* MESIAL */}
      <polygon
        points="5,20 20,5 20,15 5,30"
        fill={getColor("mesial")}
        stroke="black"
        onClick={() => handleClickCara("mesial")}
        style={{ cursor: "pointer" }}
      />

      {/* DISTAL */}
      <polygon
        points="20,5 35,20 35,30 20,15"
        fill={getColor("distal")}
        stroke="black"
        onClick={() => handleClickCara("distal")}
        style={{ cursor: "pointer" }}
      />*/

      {/* Número de pieza */}
      <text
        x="20"
        y={posicionY}
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        fill="#333"
      >
        {pieza}
      </text>
    </g>
  );
};

export default hc_diente;

 {/* Cara Izquierda */}
  <rect
    x="0"
    y="10"
    width="10"
    height="20"
    fill={getColor("mesial")}
    stroke="black"
    onClick={() => handleClickCara("mesial")}
  />

  {/* Cara Derecha */}
  <rect
    x="30"
    y="10"
    width="10"
    height="20"
    fill={getColor("distal")}
    stroke="black"
    onClick={() => handleClickCara("distal")}
  />

  {/* Cara Inferior */}
  <rect
    x="10"
    y="30"
    width="20"
    height="10"
    fill={getColor("vestibular")}
    stroke="black"
    onClick={() => handleClickCara("vestibular")}
  />

  {/* Centro */}
  <rect
    x="10"
    y="10"
    width="20"
    height="20"
    fill={getColor("lingual")}
    stroke="black"
    onClick={() => handleClickCara("lingual")}
  />
