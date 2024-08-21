// models/Rol.js (o el nombre de tu archivo)
import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
});

const Rol = mongoose.model('estatus', rolSchema); // Asegúrate de que el nombre del modelo sea correcto

export default Rol;