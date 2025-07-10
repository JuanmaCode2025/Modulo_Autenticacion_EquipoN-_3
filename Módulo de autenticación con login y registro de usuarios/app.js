import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './DB/database.js';
import userRouter from './router/user.js';
import dashboardRouter from './router/dashboard.js';
import { validarJWT } from './middlewares/tokens.js';

// Configuración inicial
dotenv.config();
const app = express();

// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a DB
connectDB();

// 1. Archivos públicos (accesibles sin autenticación)
app.use(express.static(join(__dirname, 'public')));

// 2. Archivos privados (requieren autenticación)
app.use('/private', validarJWT, express.static(join(__dirname, 'private')));

// 3. Rutas API
app.use('/api/user', userRouter);
app.use('/api/user/dashboard', dashboardRouter);// Cambiado para consistencia

// Ruta para el registro
app.get('/register', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'registro.html'));
});

// Ruta del dashboard protegida
app.get('/dashboard', validarJWT, (req, res) => {
  res.sendFile(join(__dirname, 'private', 'dashboard.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, msg: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});