import { Router } from "express";

import { getPacientes } from '../controllers/pacientes.controllers.js';

const router = Router();

router.get("/pacientes", getPacientes);


export default router;