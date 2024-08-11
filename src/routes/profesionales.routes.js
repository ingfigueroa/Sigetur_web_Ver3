import { Router } from "express";

import { getProfesionales } from '../controllers/profesionales.controllers.js';

const router = Router();

router.get("/profesionales", getProfesionales);


export default router;