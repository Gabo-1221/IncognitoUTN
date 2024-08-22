// models/PreguntaEncuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const preguntaEncuestaSchema = new mongoose.Schema({
  id_encuesta: { type: String, default: null },
  id_pregunta: { type: String, default: null },
});

const PreguntaEncuesta = mongoose.model('PreguntaEncuesta', preguntaEncuestaSchema);

export default PreguntaEncuesta; 