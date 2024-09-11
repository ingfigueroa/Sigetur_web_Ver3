import express from 'express';

import { getObrasSociales, getObrasSocialesPorPaciente } from '../controllers/obrassociales.controllers.js';

const router = express.Router();

// Ruta para obtener todas las obras sociales
router.get('/obrassociales', getObrasSociales);

// Ruta para obtener obras sociales de un paciente específico
router.get('/obrassociales/pacienteos', getObrasSocialesPorPaciente);



export default router;