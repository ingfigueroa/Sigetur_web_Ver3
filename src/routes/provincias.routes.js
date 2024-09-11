import { Router } from "express";

import { getProvincias } from '../controllers/provincias.controllers.js';

const router = Router();

router.get("/provincias", getProvincias);


export default router;