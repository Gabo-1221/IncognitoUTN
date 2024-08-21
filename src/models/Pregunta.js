// models/Pregunta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_categoria: { type: String, default: null },
  id_creo: { type: Number, default: null },
});

const Pregunta = mongoose.model('preguntas', preguntaSchema);

export default Pregunta; 