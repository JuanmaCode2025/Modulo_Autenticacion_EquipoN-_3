import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    match: [/.+\@.+\..+/, 'Formato de correo inválido'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
  },
  termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Puedes agregar métodos personalizados aquí (como comparar contraseñas)
// Ejemplo: userSchema.methods.matchPassword = async function (password) { ... }

const User = mongoose.model('User', userSchema);

export default User;