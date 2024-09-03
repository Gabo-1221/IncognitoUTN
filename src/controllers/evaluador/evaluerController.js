// controllers/evaluador/evaluerController.js

import userHelper from '../../helpers/userHelper.js';
import Area from '../../models/Area.js';
import Categoria from '../../models/Categoria.js';
import Encuesta from '../../models/Encuesta.js';
import Pregunta from '../../models/Pregunta.js';

export const getHomeEvaluer = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
      res.render('evaluer/homeEvaluer', { title: 'Evaluador', username: userData.username, rol: userData.rol });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getPerfilEvaluer = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('perfil/perfilEvaluer', { title: 'Incognito UTN | Mi perfil', username: userData.username, rol: userData.rol,
         apellido: userData.apellidos, email: userData.correo, fecha_nac: userData.fecha_nac, message: null, messageEmail: null, MessageNewPassword: null,MessageNewPasswordError: null, });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getMyQuestions = async(req, res) => {
  try {
    const userId = req.session.userId;
    
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
      console.log(userId)  
      
      //const idEncargado = mongoose.Types.ObjectId(userId);
      const encuestas = await Encuesta.find({id_encargado:userId});
      const areas = await Area.find();
      const categorias = await Categoria.find();
      console.log(encuestas)
      res.render('evaluer/MisEncuestas',{title:'Mis Encuestas',
        encuestas:encuestas, 
        username: userData.username, 
        rol: userData.rol,areas:areas,
        categorias,categorias  })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

  } catch (error) {
    res.status(500).json({message:'Error 2',error:error.message});
  }
}

export const getMyAreas = async(req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
    
    const areas = await Area.find({id_creo:userId });
    res.render('evaluer/MisAreas',{
      title:'Mis Areas',
      areas:areas,
      username: userData.username, 
      rol: userData.rol
    })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({message:'Error 2',error:error.message});
  }
}

export const getMyCategoria = async(req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
    const categorias = await Categoria.find({id_creo:userId });
    res.render('evaluer/MisCategorias',{
      title:'Mis Categorias',
      categorias:categorias,
      username: userData.username, 
      rol: userData.rol})
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({message:'Error 2',error:error.message});
  }
}

export const getMyAsks = async(req, res) => {
  try {
    const userId = req.session.userId;
    
    const userData = await userHelper.getUserData(userId); 
    if (userData) {
    
    const categorias = await Categoria.find();
    const preguntas = await Pregunta.find({id_creo:userId });
    res.render('evaluer/MisPreguntas',{
      title:'Mis Preguntas',
      preguntas:preguntas,
      username: userData.username, 
      rol: userData.rol,
      categorias:categorias})
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    
  }
}

const evaluerController = {
  getHomeEvaluer,
  getPerfilEvaluer,
  getMyQuestions,
  getMyAreas,
  getMyCategoria,
  getMyAsks
};

export default evaluerController;