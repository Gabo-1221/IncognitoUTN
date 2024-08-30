// models/Pregunta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'categorias' // Referencia al modelo 'Categoria' (ajusta el nombre si es diferente) 
  },
  id_creo: { type: Number, default: null },
});

const Pregunta = mongoose.model('preguntas', preguntaSchema);

export default Pregunta; 