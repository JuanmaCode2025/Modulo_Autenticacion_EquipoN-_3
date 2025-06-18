// controllers/dashboard.js
import User from '../models/user.js';

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('name email avatar');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }


//funcion etra la hora:
function obtenerSaludoColombia(nombreCompleto) {
  const nombre = nombreCompleto.split(' ')[0];

  // Obtener hora actual en Colombia (GMT-5)
  const fechaUTC = new Date();
  const horaColombia = new Date(fechaUTC.getTime() - (5 * 60 * 60 * 1000));

  const hora = horaColombia.getHours();

  let saludo = 'Hola';
  if (hora >= 5 && hora < 12) {
    saludo = 'Buenos días';
  } else if (hora >= 12 && hora < 18) {
    saludo = 'Buenas tardes';
  } else {
    saludo = 'Buenas noches';
  }

  return `${saludo}, ${nombre}`;
}

// Respuesta mínima con saludo dinámico
const data = {
  user: {
    fullName: user.name,
    email: user.email,
    avatar: user.avatar || '/default-avatar.png'
  },
  greeting: obtenerSaludoColombia(user.name)
};



    res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error en getUserDashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el dashboard'
    });
  }
};
