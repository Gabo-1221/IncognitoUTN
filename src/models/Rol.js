// models/Rol.js (o el nombre del archivo)
import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
});

const Rol = mongoose.model('roles', rolSchema);

export default Rol;