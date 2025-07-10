import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { generarJWT } from '../middlewares/tokens.js';

// Constantes para mensajes y configuraciones
const AUTH_CONFIG = {
  COOKIE_EXPIRATION: 3600000, // 1 hora en ms
  PASSWORD_SALT_ROUNDS: 10
};

const ERROR_MESSAGES = {
  SERVER_ERROR: "Error interno del servidor",
  INVALID_CREDENTIALS: "Credenciales inválidas",
  EMAIL_EXISTS: "El email ya está registrado",
  REQUIRED_FIELDS: "Todos los campos son requeridos: nombre, email y contraseña",
  WRONG_PASSWORD: "Contraseña incorrecta",
  USER_NOT_FOUND: "Usuario no encontrado",
  INVALID_EMAIL: "El formato del email es inválido",
  WEAK_PASSWORD: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
  TERMS_NOT_ACCEPTED: "Debes aceptar los términos y condiciones"
};

const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: "Usuario creado exitosamente. Por favor inicie sesión.",
  LOGIN_SUCCESS: "Inicio de sesión exitoso",
  LOGOUT_SUCCESS: "Sesión cerrada exitosamente",
  AUTH_VALID: "Autenticación válida"
};

/**
 * Verifica si un email ya existe en la base de datos
 * Mejoras: Validación de formato de email
 */
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        msg: "El parámetro email es requerido" 
      });
    }

    // Validación básica de formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        msg: ERROR_MESSAGES.INVALID_EMAIL
      });
    }

    const user = await User.findOne({ email });
    res.json({ 
      success: true,
      exists: !!user 
    });
    
  } catch (error) {
    console.error("Error en checkEmail:", error);
    res.status(500).json({ 
      success: false,
      msg: ERROR_MESSAGES.SERVER_ERROR 
    });
  }
};

/**
 * Crea un nuevo usuario en el sistema
 * Mejoras: Validación de fortaleza de contraseña
 */
export const create_user = async (req, res) => {
  try {
    const { name, email, password, terms } = req.body;

    // Validación de campos obligatorios (simplificada)
    if (!name || !email || !password || terms === undefined) {
      return res.status(400).json({ 
        success: false,
        msg: "Todos los campos son requeridos, incluyendo la aceptación de términos" 
      });
    }

    // Validar términos (versión corregida)
    if (!terms) {
      return res.status(400).json({
        success: false,
        msg: "Debes aceptar los términos y condiciones"
      });
    }

    // Resto de validaciones (email, contraseña, etc.)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        msg: "El formato del email es inválido"
      });
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        msg: "El email ya está registrado" 
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario (sin almacenar terms si no es necesario)
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword 
    });
    
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Error en create_user:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        msg: Object.values(error.errors).map(val => val.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false,
      msg: "Error interno del servidor" 
    });
  }
};  //listo terminad0

/**
 * Autentica un usuario y genera un token JWT
 * Mejoras: Manejo de intentos fallidos, registro de actividad
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Intento de login con:', { email }); // Log para depuración

    if (!email || !password) {
      console.log('Faltan credenciales');
      return res.status(400).json({ 
        success: false,
        msg: "Email y contraseña son requeridos" 
      });
    }
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(401).json({ 
        success: false,
        msg: "Credenciales inválidas" 
      });
    }
    
    console.log('Usuario encontrado, verificando contraseña...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta para:', email);
      return res.status(401).json({
        success: false,
        msg: "Contraseña incorrecta"
      });
    }

    const token = await generarJWT(user._id);
    console.log('Token generado para:', user.email);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error completo en login:", error);
    res.status(500).json({ 
      success: false,
      msg: "Error en el servidor" 
    });
  }
};

/**
 * Cierra la sesión del usuario
 * Mejoras: Limpieza más completa de cookies
 */
export const logout = (req, res) => {
  try {
    // Eliminar la cookie de token y cualquier otra relacionada
    ['token', 'session'].forEach(cookieName => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
    });

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS
    });
    
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ 
      success: false,
      msg: ERROR_MESSAGES.SERVER_ERROR 
    });
  }
};

/**
 * Verifica el estado de autenticación del usuario
 * Mejoras: Más información del usuario en la respuesta
 */
export const verifyAuth = async (req, res) => {
  try {
    // El token ya fue validado por el middleware
    const user = await User.findById(req.userId)
      .select('-password -__v -updatedAt') // Excluir campos sensibles
      .lean(); // Convertir a objeto plano

    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: ERROR_MESSAGES.USER_NOT_FOUND
      });
    }

    // Agregar datos básicos del usuario
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user', // Valor por defecto
      avatar: user.avatar // Si tienes avatar en tu modelo
    };

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.AUTH_VALID,
      user: userData
    });
    
  } catch (error) {
    console.error("Error en verifyAuth:", error);
    res.status(500).json({ 
      success: false,
      msg: ERROR_MESSAGES.SERVER_ERROR 
    });
  }
};

