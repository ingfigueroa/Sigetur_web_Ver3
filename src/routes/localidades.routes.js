import { Router } from "express";

import { getLocalidades } from '../controllers/localidades.controllers.js';

const router = Router();

router.get("/localidades", getLocalidades);


export default router;