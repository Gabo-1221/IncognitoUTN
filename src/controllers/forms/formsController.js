// src/controllers/forms/formsController.js
import Pregunta from '../../models/Pregunta.js';
import Categoria from '../../models/Categoria.js';
import Area from '../../models/Area.js';
import Encuesta from '../../models/Encuesta.js';
import EncPre from '../../models/PreguntaEncuesta.js';
import Usu from '../../models/Usuario.js'; // Importa el modelo Usuario
import PreguntaEncuesta from '../../models/PreguntaEncuesta.js';
import userHelper from '../../helpers/userHelper.js';

// Controlador para agregar una nueva pregunta
export const newQuestion = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  const usuario = await userHelper.getUserData(userId);
  try {
    const { pregunta, categoria, user } = req.body;
    const newQuestion = new Pregunta({
      nombre: pregunta,
      id_categoria: categoria,
      id_creo: userId 
    });

    await newQuestion.save();
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaPreguntas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisPreguntas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
    
  } catch (error) {
    console.error("Error al agregar nueva pregunta:", error);
    // Manejar el error de manera apropiada, por ejemplo, redirigiendo a una página de error
  }
};

// Controlador para obtener una pregunta
export const findOnePregunta = async (req, res) => {
  const { idPregunta } = req.params;
  try {
    const pregunta = await Pregunta.findById(idPregunta);

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    
    res.json({
      title: "Editor Pregunta",
      id: pregunta._id,
      pregunta: pregunta.nombre,
      categoria: pregunta.id_categoria,
      creadoPor: pregunta.id_creo
    });
  } catch (error) {
    console.error("Error al obtener la pregunta:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para actualizar una pregunta
export const updateAsk = async (req, res) => {
  const userId = req.session.userId;
    // Validar que el usuario está autenticado
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  const usuario = await userHelper.getUserData(userId);
  const { id, pregunta, categoria, user } = req.body;
  try {
    const updatedPregunta = await Pregunta.findByIdAndUpdate(id, {
      nombre: pregunta,
      id_categoria: categoria,
      id_creo: userId
    }, { new: true }); // Devuelve el documento actualizado

    if (!updatedPregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaPreguntas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisPreguntas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error);
    // Manejar el error adecuadamente
  }
};


// Controlador para eliminar una pregunta
export const deletePregunta = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  const usuario = await userHelper.getUserData(userId);
  try {
    const { idpregunta } = req.params;
    
    await EncPre.deleteMany({ id_pregunta: idpregunta });
    const deletedPregunta = await Pregunta.findByIdAndDelete(idpregunta); 

    if (!deletedPregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaPreguntas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisPreguntas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para agregar una nueva categoría
export const newCategoria = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  const usuario = await userHelper.getUserData(userId);
  const { categoria,color } = req.body;
  try {
    const newCategoria = new Categoria({
      nombre: categoria,
      id_creo: userId,
      color_hover: color
    });

    await newCategoria.save();
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaCategorias');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisCategorias');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
    
  } catch (error) {
    console.error("Error al agregar nueva categoria:", error);
    // Manejar el error de manera apropiada
  }
};

// Controlador para obtener una categoría
export const findOneCategoria = async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const categoria = await Categoria.findById(idCategoria);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    res.json({
      title: "Editor Categoria",
      id: categoria._id,
      categoria: categoria.nombre,
      creadoPor: categoria.id_creo,
      color: categoria.color_hover
    });
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para actualizar una categoría
export const updateCategoria = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  const usuario = await userHelper.getUserData(userId);
  try {
    const { id, categoria, color } = req.body;
    const updatedCategoria = await Categoria.findByIdAndUpdate(id, {
      nombre: categoria,
      id_creo: userId,
      color_hover: color
    }, { new: true }); // Devuelve el documento actualizado

    if (!updatedCategoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaCategorias');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisCategorias');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al actualizar la categoria:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para eliminar una categoría
export const deleteCategoria = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
const usuario = await userHelper.getUserData(userId);
  try {
    const { idcategoria } = req.params;
    
    await Pregunta.deleteMany({ id_categoria: idcategoria }); // Eliminar preguntas asociadas
    const deletedCategoria = await Categoria.findByIdAndDelete(idcategoria);

    if (!deletedCategoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaCategorias');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisCategorias');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al eliminar la categoria:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para agregar una nueva area
export const newArea = async (req, res) => {
  const userId = req.session.userId;
    // Validar que el usuario está autenticado
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  const usuario = await userHelper.getUserData(userId);
  try {
    const { area, calificacion, color } = req.body;
    const newArea = new Area({
      nombre: area,
      promedio: calificacion,
      id_creo: userId,
      color_hover: color
    });

    await newArea.save();
    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaAreas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisAreas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 


  } catch (error) {
    console.error("Error al agregar nueva Area:", error);
    // Manejar el error de manera apropiada
  }
};

// Controlador para obtener un área
export const findOneArea = async (req, res) => {
  const { idArea } = req.params;
  try {
    const area = await Area.findById(idArea);

    if (!area) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }
    
    res.json({
      title: "Editor Area",
      id: area._id,
      area: area.nombre,
      promedio: area.promedio.toString(),
      creadoPor: area.id_creo,
      color: area.color_hover
    });
  } catch (error) {
    console.error("Error al obtener el area:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para actualizar un área
export const updateArea = async (req, res) => {
  const userId = req.session.userId;
  // Validar que el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  const usuario = await userHelper.getUserData(userId);
  const { id, area, promedio,color } = req.body;
  try {
    const updatedArea = await Area.findByIdAndUpdate(id, {
      nombre: area,
      promedio: promedio,
      id_creo: userId,
      color_hover: color
    }, { new: true }); // Devuelve el documento actualizado

    if (!updatedArea) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }

    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaAreas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisAreas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al actualizar el area:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para eliminar un área
export const deleteArea = async (req, res) => {
  const userId = req.session.userId;
    // Validar que el usuario está autenticado
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  const usuario = await userHelper.getUserData(userId);
  try {
    const { idArea } = req.params;

    // Buscar las encuestas relacionadas con el área
    const encuestas = await Encuesta.find({ id_area: idArea }, { nombre: 1, _id: 1 });

    // Eliminar las preguntas relacionadas con las encuestas
    for (const encuesta of encuestas) {
      await EncPre.deleteMany({ id_encuesta: encuesta._id });
    }

    // Eliminar las encuestas relacionadas con el área
    await Encuesta.deleteMany({ id_area: idArea });

    // Eliminar el área
    const deletedArea = await Area.findByIdAndDelete(idArea);

    if (!deletedArea) {
      return res.status(404).json({ message: 'Área no encontrada' });
    }

    if (usuario.rol == 'Administrador' ) {
      res.redirect('/admin/listaAreas');
    } else if (usuario.rol == 'Evaluador' ) {
      res.redirect('/evaluador/listaMisAreas');
    } else {
      res.status(500).json({message: 'Error al obtener vista para areas'})
    } 
  } catch (error) {
    console.error("Error al eliminar el area:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para agregar una nueva encuesta
export const newEncuesta = async (req, res) => {
  try {
    const { nombre, area, canperson, user, fechat } = req.body;
    const currentDate = new Date();
    const utcDate = currentDate.toLocaleDateString('en-CA');
    const idUser = req.session.userId;
    const newEncuesta = new Encuesta({
      nombre: nombre,
      id_area: area,
      id_encargado: idUser,
      fecha_creada: utcDate,
      fecha_limite: fechat,
      cantidad: canperson,
      calificacion: 4.9
    });

    await newEncuesta.save();
    //res.status(200).json({ message: 'Encuesta guardada correctamente' }); 
  } catch (error) {
    console.error("Error al guardar la encuesta:", error);
    res.status(500).json({ error: 'Error al guardar la encuesta' });
  }
};

export const findOneEncuesta = async(req, res ) => {
  const {idEncuesta} = req.params;
  
  try {

    const encuesta = await Encuesta.findById(idEncuesta);
    if(!encuesta){
      return res.status(404).json({message:'Encuesta no encontrada'})
    }
    res.json({
      title: "Editor Encuesta",
      id: encuesta._id,
      nombre: encuesta.nombre,
      area: encuesta.id_area,
      encargo: encuesta.id_encargado,
      cantidad: encuesta.cantidad,
      fechaT: encuesta.fecha_limite
    
    });
  } catch (error) {
    console.log('Error al obener la Encuesta deseada')
  }
};

export const obtenerDatosEncuesta = async (req, res) => {
  const { idEncuesta } = req.params;
  try {
    const userId = req.session.userId;
    const userData = await userHelper.getUserData(userId);

    const encuesta = await Encuesta.findById(idEncuesta);
    const areas = await Area.find();
 

    const fechaLimiteFormateada = new Date(encuesta.fecha_limite).toISOString().split('T')[0];

    res.render('forms/formEditarEncuesta',{ username: userData.username, rol: userData.rol,
      imagen: userData.imagen, activeSection: '',fechalimite:fechaLimiteFormateada, encuesta: encuesta , title:'Editar Encuesta' , areas})
    } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al obtener los datos de la encuesta' + error);
  }
};

export const preguntasSelects = async (req, res) => {
  const { idEncuesta } = req.params;

  try {
    const userId = req.session.userId;
    const userData = await userHelper.getUserData(userId);
    // Obtener todas las relaciones de PreguntaEncuesta para la encuesta específica
    const relaciones = await PreguntaEncuesta.find({ id_encuesta: idEncuesta });
    
    // Obtener todas las preguntas
    const preguntas = await Pregunta.find();
    
    // Obtener todas las categorías
    const categorias = await Categoria.find();
    
    // Extraer los IDs de las preguntas relacionadas a la encuesta
    const idPreguntasRelacionadas = relaciones.map(rel => rel.id_pregunta.toString());

    // Pasar las preguntas, categorías y los IDs de preguntas relacionadas a la vista
    res.render('forms/formEditarEncuestaP2', { username: userData.username, rol: userData.rol,
      imagen: userData.imagen, activeSection: '',title:'Editar Encuesta parte 2',preguntas, categorias, idPreguntasRelacionadas });
  } catch (error) {
    console.error('Error al obtener las preguntas:', error);
    res.status(500).json({ message: 'Error al obtener las preguntas' });
  }
};
//consulat ejemplo
export const actualizarEncuesta = async(req,res) => {

}

export const actualizarEncuestaPregunta = async(req,res) => {

}


// Controlador para eliminar una encuesta
export const deleteEncuesta = async (req, res) => {
  try {
    const { idEncuesta } = req.params;

    await EncPre.deleteMany({ id_encuesta: idEncuesta });
    const deletedEncuesta = await Encuesta.findByIdAndDelete(idEncuesta); 

    if (!deletedEncuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }

    res.redirect('/admin/listaEncuesta');
  } catch (error) {
    console.error("Error al eliminar la encuesta:", error);
    // Manejar el error adecuadamente
  }
};

// Controlador para agregar preguntas a una encuesta
export const newEncPreg = async (req, res) => {
  const { encuestaId, preguntasSeleccionadas } = req.body;

  try {
    for (const pregunta of preguntasSeleccionadas) {
      try {
        const newEncPre = new EncPre({
          id_encuesta: encuestaId,
          id_pregunta: pregunta,
        });
        await newEncPre.save();
      } catch (error) {
        console.error('Error al guardar la pregunta:', error);
        return res.status(500).json({ error: 'Error al guardar la pregunta' });
      }
    }
    res.json({ message: 'Preguntas guardadas correctamente' });
  } catch (error) {
    console.error('Error en newEncPreg:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const formsController = {
    newQuestion,
    findOnePregunta,
    updateAsk,
    deletePregunta,
    newCategoria,
    findOneCategoria,
    updateCategoria,
    deleteCategoria,
    newArea,
    findOneArea,
    updateArea,
    deleteArea,
    newEncuesta,
    findOneEncuesta,
    obtenerDatosEncuesta,
    preguntasSelects,
    actualizarEncuesta,
    actualizarEncuestaPregunta,
    deleteEncuesta,
    newEncPreg
};

export default formsController;