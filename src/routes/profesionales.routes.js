import { Router } from "express";

import { createProfesionales, getProfesionales, getProfesionalProfesion, getProfesionalesHorarios,getProfesionalBuscarID } from '../controllers/profesionales.controllers.js';

const router = Router();

router.get("/profesionales", getProfesionales);

router.get("/profesionaleshorarios", getProfesionalesHorarios);

router.get("/profesionalesProfesionid", getProfesionalProfesion);

router.post("/profesionales", createProfesionales);

router.get("/profesionalid", getProfesionalBuscarID);



export default router;