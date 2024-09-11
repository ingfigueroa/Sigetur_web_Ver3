import { Router } from "express";

import { getCapitulos, getPrestaciones } from '../controllers/prestaciones.controllers.js';

const router = Router();

router.get("/capitulos", getCapitulos);
router.get("/prestaciones", getPrestaciones);


export default router;