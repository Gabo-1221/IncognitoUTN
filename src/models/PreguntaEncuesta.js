// models/PreguntaEncuesta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const preguntaEncuestaSchema = new mongoose.Schema({
  id_encuesta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'encuestas' 
  },
  id_pregunta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'preguntas' 
  },
});

const PreguntaEncuesta = mongoose.model('preguntaencuestas', preguntaEncuestaSchema);

export default PreguntaEncuesta; 