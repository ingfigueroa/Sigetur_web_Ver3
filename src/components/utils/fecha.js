// utils/fecha.js
// utils/fecha.js


function capitalizarPrimera(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const formatearFechaLarga = (fecha, mostrarAno = false) => {
  if (!fecha) return "";

  const fechaObj = new Date(fecha + "T00:00:00");
  const opciones = { weekday: "long", day: "numeric", month: "long" };
  if (mostrarAno) opciones.year = "numeric";

  const fechaLarga = fechaObj.toLocaleDateString("es-AR", opciones).replace(",", "");
  return capitalizarPrimera(fechaLarga);
};

export const formatearFechaLargaConelAnio = (fecha, mostrarAno = true) => {
  if (!fecha) return "";

  const fechaObj = new Date(fecha);

  // sumar 1 día
  fechaObj.setDate(fechaObj.getDate() + 1);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  if (mostrarAno) opciones.year = "numeric";

  return fechaObj.toLocaleDateString("es-AR", opciones).replace(",", "");
};


export const obtenerMes = (fechaInput = new Date()) => {
  const fecha = new Date(fechaInput); // convertir string a Date si es necesario
  const opciones = { month: "long" };
  return fecha.toLocaleDateString("es-AR", opciones).toUpperCase();
};

// Días de la semana en mayúsculas
export const diasSemana = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
  "DOMINGO",
];

// Meses en mayúsculas
export const meses = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];

// Obtener día de la semana de una fecha (ej: "MARTES")
export function getDiaSemana(fecha) {
  const indice = new Date(fecha).getDay(); // 0=Domingo, 1=Lunes...
  return diasSemana[(indice + 6) % 7]; // ajusto para que Lunes sea primero
}

// Obtener mes en mayúsculas (ej: "AGOSTO")
export function getMes(fecha) {
  const indice = new Date(fecha).getMonth(); // 0=Enero
  return meses[indice];
}



// Obtener la fecha de hoy en formato YYYY-MM-DD (útil para inputs type="date")
export function getFechaActualISO() {
  return new Date().toISOString().split("T")[0];
}


export function getFechaISO(fecha) {
  if (!fecha) return "";
  const fechaObj = new Date(fecha);
  return fechaObj.toISOString().split("T")[0];
}

// fecha.js
export function validarHorasDesdeHastaIntervalo(horaDesdeId, horaHastaId, intervalo, mensajeOut) {

  if (horaDesdeId === null || horaDesdeId === undefined || horaDesdeId === "") {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar HORA DESDE."};
  }
   if (!horaHastaId) {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar HORA HASTA. "};
  }
   if (!intervalo) {
    return { valido: false, mensaje: mensajeOut + "Falta seleccionar el INTERVALO. "};
  }

  if (horaDesdeId >= horaHastaId) {
    
    return { valido: false, mensaje: mensajeOut + " La hora DESDE no puede ser mayor o igual a la hora HASTA."};
  }

  return { valido: true, mensaje: "Rango de horas válido" };
}

// src/utils/fecha.js
export function calcularEdad(fechaNacimiento) {
 
  if (!fechaNacimiento) return null;

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

