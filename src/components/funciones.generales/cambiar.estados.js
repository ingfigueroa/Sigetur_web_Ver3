


async function cambiarEstados () {

  try {
    setHoraTurno(turno?.hora); // Actualiza `setHoraTurno` con `item.desde`
                               
    // Obtiene la hora actual y la asigna a `setHoraActual`
    // O ajusta el formato según lo necesites
    setHoraActual(horaActual);
  
    if (turno?.sigla == "PEN") {
     
      if (Fecha > fechaActual) {
        setModalMensaje(
          "No se puede dar el PRESENTE en esta fecha. El PRESENTE se da a partir de la fecha del turno."
        );
        openMdlMensaje();
        return;
      }
    
  
      definirEstadosdeTurnos(turno, "PENDIENTE");
    } else if (turno?.sigla === "LIB") {
    
      if (Fecha >= fechaActual) {
        
        definirEstadosdeTurnos(turno, "LIBRE");
      } else {
        setModalMensaje(
          "Fecha expirada. No se puede cambiar el estado del turno."
        );
        openMdlMensaje();
      }
    }
    else if (turno?.sigla  == "PRE NCOB") {
      
        setModalMensaje(
          "Fecha expirada. No se puede cambiar el estado del turno."
        );
        
    }
  } catch (error) {
    
  }}
 
