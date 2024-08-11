import { Router } from "express";

import { getObrasSociales } from '../controllers/obrassociales.controllers.js';

const router = Router();

router.get("/obrassociales", getObrasSociales);


export default router;