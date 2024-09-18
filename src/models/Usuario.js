// models/Usuario.js (o el nombre de tu archivo)
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  apellidos: { type: String, default: null },
  fecha_nac: { type: String, default: null },
  correo: { type: String, default: null },
  contrasena: { type: String, default: null },
  rol: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'roles' // Referencia al modelo 'roles'
  },
  terms: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  encuestas_creadas: { type: Array, default: [] }, 
  encuestas_resueltas: { type: Array, default: [] },
  updated_at: { type: Date, default: Date.now },
  status: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'estatususers' // Referencia al modelo 'status'
  },
  profilePicture: { type: String, default: null }
});

const Usuario = mongoose.model('usuarios', usuarioSchema);

export default Usuario; 