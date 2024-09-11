import { Router } from "express";

import { getProfesiones } from '../controllers/profesiones.controllers.js';

const router = Router();

router.get("/profesiones", getProfesiones);


export default router;