// models/Estatus.js (o el nombre de tu archivo)
import mongoose from 'mongoose';

const EstadosUserSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
});

const EstadosUser = mongoose.model('estatususers', EstadosUserSchema); // Asegúrate de que el nombre del modelo sea correcto

export default EstadosUser;