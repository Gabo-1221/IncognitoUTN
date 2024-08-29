// src/controllers/mystery/mysteryController.js
import userHelper from '../../helpers/userHelper.js'; //Importa la función auxiliar
import Encuesta from '../../models/Encuesta.js';
import Area from '../../models/Area.js';
import Categoria from '../../models/Categoria.js';

export const getHomeMystery = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('mystery/homeMystery', { title: 'Incognito UTN | Dashboard', username: userData.username, rol: userData.rol,
          imagen: userData.imagen, activeSection: 'dashboard'
       });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

export const getPerfilMystery = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('perfil/perfilMystery', {
        title: 'Incognito UTN | Mi perfil', username: userData.username, rol: userData.rol,
        apellido: userData.apellidos, email: userData.correo, fecha_nac: userData.fecha_nac,
         message: null, messageEmail: null, MessageNewPassword: null, MessageNewPasswordError: null,
         imagen: userData.imagen, activeSection: 'perfil'
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
};

/* getListaEncuestasPendientes */
export const getListaEncuestasPendientes = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      // Obtener las encuestas resueltas por el usuario
      const encuestasResueltas = userData.encuestas_resueltas; 

      // Usamos populate y $nin para filtrar las encuestas
      const encuestas = await Encuesta.find({
        _id: { $nin: encuestasResueltas } // Filtrar por encuestas no resueltas
      }).populate({
        path: 'id_area',
        select: 'color_hover nombre' // Agregar el campo nombre a la selección
      });

       // Filtrar encuestas por fecha_limite, usuarios que han respondido y cantidad
      const fechaActual = new Date();
      const encuestasFiltradas = encuestas.filter(encuesta => {
        const fechaLimite = new Date(encuesta.fecha_limite);
        if (fechaLimite > fechaActual) {
          // Validación 1: El usuario no ha respondido la encuesta
          if (!encuesta.id_usuarios_respondieron.includes(userId)) { 
            // Validación 2: La cantidad de usuarios que han respondido es menor que la cantidad máxima
            if (encuesta.id_usuarios_respondieron.length < encuesta.cantidad) {
              // Calcular la diferencia en días
              const diffEnMilisegundos = fechaLimite.getTime() - fechaActual.getTime();
              const diffEnDias = Math.ceil(diffEnMilisegundos / (1000 * 60 * 60 * 24));
              encuesta.dias_restantes = diffEnDias; // Agregar dias_restantes a la encuesta
              return true; // Incluir la encuesta en el resultado
            }
          }
        }
        return false; // Excluir la encuesta del resultado
      });

      res.render('mystery/listaEncuestasPendientes', { title: 'Incognito UTN | Encuestas pendientes', username: userData.username, rol: userData.rol,
          imagen: userData.imagen, activeSection: 'encuestasPendientes', encuestas: encuestasFiltradas
       });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
}

/* getListaEncuestasRealizadas */
export const getListaEncuestasRealizadas = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {      
      // Obtener las encuestas resueltas por el usuario
      const encuestasResueltas = userData.encuestas_resueltas;

      // Usamos populate y $in para filtrar las encuestas
      const encuestas = await Encuesta.find({
        _id: { $in: encuestasResueltas } // Filtrar por encuestas resueltas
      }).populate({
        path: 'id_area',
        select: 'color_hover nombre'
      });
      res.render('mystery/listaEncuestasRealizadas', { title: 'Incognito UTN | Encuestas realizadas', username: userData.username, rol: userData.rol,
          imagen: userData.imagen, activeSection: 'encuestasRealizadas', encuestas: encuestas
       });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
}

const mysteryController = {
  getHomeMystery,
  getPerfilMystery,
  getListaEncuestasPendientes,
  getListaEncuestasRealizadas
};

export default mysteryController;