import { Router } from "express";

import { getTurnosProfesionalFecha, putTurnosPasaraPendiente, getTurnosCrear, putTurnosCambiarEstados, getEstadosPorTurno } from '../controllers/turnos.controllers.js';

const router = Router();

router.get("/turnos", getTurnosProfesionalFecha);

router.put("/turnos/pasarapendiente", putTurnosPasaraPendiente);

router.get("/turnos/crearturnos", getTurnosCrear);

router.put("/turnos/cambiarestado", putTurnosCambiarEstados);

router.get("/turnos/estadosporturno", getEstadosPorTurno);


export default router;