// models/Encuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const encuestaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_area: { type: String, default: null },
  id_encargado: { type: String, default: null },
  cantidad: { type: Number, default: null },
  fecha_creada: { type: Date, default: null },
  fecha_limite: { type: Date, default: null },
  calificacion: { type: Number, default: null },
});

const Encuesta = mongoose.model('encuestas', encuestaSchema);

export default Encuesta;