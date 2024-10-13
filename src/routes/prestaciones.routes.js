import { Router } from "express";

import { getCapitulos, getPrestacion, getPrestaciones } from '../controllers/prestaciones.controllers.js';

const router = Router();

router.get("/capitulos", getCapitulos);
router.get("/prestaciones", getPrestaciones);
router.get("/prestacion", getPrestacion);


export default router;