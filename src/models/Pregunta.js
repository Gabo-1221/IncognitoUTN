// models/Pregunta.js (o el nombre del archivo)
import mongoose from 'mongoose';

const preguntaSchema = new mongoose.Schema({
  nombre: { type: String, default: null },
  id_categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'categorias' // Referencia al modelo 'Categoria' (ajusta el nombre si es diferente) 
  },
  id_creo: { 
    type: mongoose.Schema.Types.ObjectId, // Cambiar el tipo a ObjectId
    ref: 'usuarios' // Referencia al modelo de usuarios
  },
});

const Pregunta = mongoose.model('preguntas', preguntaSchema);

export default Pregunta; 