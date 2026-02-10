import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "/src/css/CalendarTurnos.css";
import { toLocalDate } from "../../components/utils/fecha";

export default function CalendarTurnos({ fecha, onChange }) {
  const hoy = toLocalDate(new Date());

  const fechaSeleccionada = toLocalDate(fecha);


  return (
    <div className="calendar-container">
      <Calendar
        value={fechaSeleccionada}
        onChange={onChange}
        locale="es-AR"
        calendarType="gregory"
        tileClassName={({ date, view }) => {
          if (view !== "month") return null;

          const d = toLocalDate(date);

          if (
            d.getTime() === hoy.getTime()
          ) {
            return "dia-hoy";
          }

          if (
            fechaSeleccionada &&
            d.getTime() === fechaSeleccionada.getTime()
          ) {
            return "dia-seleccionado";
          }

          return null;
        }}
      />
    </div>
  );
}

