// routes/dashboard.js
import express from 'express';
import { getUserDashboard } from '../controllers/dashboard.js';
import { validarJWT } from '../middlewares/tokens.js';

const router = express.Router();

// Ruta protegida
router.get('/', validarJWT, getUserDashboard);

export default router;
