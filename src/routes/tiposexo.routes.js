import { Router } from "express";

import { getTipoSexo } from '../controllers/tiposexo.controllers.js';

const router = Router();

router.get("/tiposexo", getTipoSexo);


export default router;