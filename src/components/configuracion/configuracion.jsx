import React, { useState, useEffect } from "react";


const PASO = {
  CONSULTORIO: 0,
  REPRESENTANTE: 1,
  PARAMETROS: 2,
  RUTAS: 3,
  USUARIOS: 4,
};
function Configuracion() {
  const [pasoActual, setPasoActual] = useState(PASO.CONSULTORIO);

  

  useEffect(() => {
    // Simula el Load
    console.log("Inicializando configuración...");
  }, []);

  const siguiente = () => {
    if (pasoActual < 4) setPasoActual(pasoActual + 1);
  };

  const anterior = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1);
  };

  const getTitulo = () => {
    switch (pasoActual) {
      case PASO.CONSULTORIO:
        return "Datos del Consultorio";
      case PASO.REPRESENTANTE:
        return "Datos del Representante";
      case PASO.PARAMETROS:
        return "Parametrización";
      case PASO.RUTAS:
        return "Rutas de PDFs";
      case PASO.USUARIOS:
        return "Usuarios";
      default:
        return "";
    }
  };

  const estiloPaso = (paso) => ({
    padding: "10px",
    cursor: "pointer",
    backgroundColor: pasoActual === paso ? "#1976d2" : "#fff",
    color: pasoActual === paso ? "#fff" : "#000",
    border: "1px solid #ccc",
    marginBottom: "5px",
  });

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      
      {/* MENÚ IZQUIERDO */}
      <div style={{ width: "250px" }}>
        <div style={estiloPaso(PASO.CONSULTORIO)} onClick={() => setPasoActual(PASO.CONSULTORIO)}>
          Consultorio
        </div>
        <div style={estiloPaso(PASO.REPRESENTANTE)} onClick={() => setPasoActual(PASO.REPRESENTANTE)}>
          Representante
        </div>
        <div style={estiloPaso(PASO.PARAMETROS)} onClick={() => setPasoActual(PASO.PARAMETROS)}>
          Parámetros
        </div>
        <div style={estiloPaso(PASO.RUTAS)} onClick={() => setPasoActual(PASO.RUTAS)}>
          Rutas
        </div>
        <div style={estiloPaso(PASO.USUARIOS)} onClick={() => setPasoActual(PASO.USUARIOS)}>
          Usuarios
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1, padding: "20px" }}>
        
        <h2>{getTitulo()}</h2>

        {/* PANEL DINÁMICO */}
        {pasoActual === PASO.CONSULTORIO && (
          <div>
            <input placeholder="Razón Social" />
          </div>
        )}

        {pasoActual === PASO.REPRESENTANTE && (
          <div>
            <input placeholder="Apellido Representante" />
          </div>
        )}

        {pasoActual === PASO.PARAMETROS && (
          <div>
            <label>
              <input type="checkbox" /> Lunes
            </label>
          </div>
        )}

        {pasoActual === PASO.RUTAS && (
          <div>
            <button>Seleccionar ruta</button>
          </div>
        )}

        {pasoActual === PASO.USUARIOS && (
          <div>
            <input placeholder="Usuario" />
          </div>
        )}

        {/* BOTONES */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={anterior} disabled={pasoActual === 0}>
            Anterior
          </button>

          <button onClick={siguiente} style={{ marginLeft: "10px" }}>
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
}

export default  Configuracion;