import { Router } from "express";

import { getTipoDocumento } from '../controllers/tipodocumento.controllers.js';

const router = Router();

router.get("/tipodocumento", getTipoDocumento);


export default router;