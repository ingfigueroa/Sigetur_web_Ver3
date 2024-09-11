import { Router } from "express";

import { createPacientes, getPacientes } from '../controllers/pacientes.controllers.js';

const router = Router();

router.get("/pacientes", getPacientes);

router.post("/pacientes", createPacientes);


export default router;