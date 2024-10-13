import { Router } from "express";

import { createProfesionales, getProfesionales, getProfesionalProfesion, getProfesionalesHorarios } from '../controllers/profesionales.controllers.js';

const router = Router();

router.get("/profesionales", getProfesionales);

router.get("/profesionaleshorarios", getProfesionalesHorarios);

router.get("/profesionalesid", getProfesionalProfesion);

router.post("/profesionales", createProfesionales);


export default router;