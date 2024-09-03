// src/controllers/mystery/mysteryController.js
import userHelper from '../../helpers/userHelper.js'; //Importa la función auxiliar
import Encuesta from '../../models/Encuesta.js';
import Area from '../../models/Area.js';
import Categoria from '../../models/Categoria.js';
import PreguntaEncuesta from '../../models/PreguntaEncuesta.js';
import RespuestaEncuesta from '../../models/RespuestaEncuesta.js';
import Usuario from '../../models/Usuario.js';

export const getHomeMystery = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      res.render('mystery/homeMystery', {
        title: 'Incognito UTN | Dashboard', username: userData.username, rol: userData.rol,
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
      })
        .sort({ _id: -1 });

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

      res.render('mystery/listaEncuestasPendientes', {
        title: 'Incognito UTN | Encuestas pendientes', username: userData.username, rol: userData.rol,
        imagen: userData.imagen, activeSection: 'encuestasPendientes', encuestas: encuestasFiltradas, messageRegister: null
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
      })
        .sort({ _id: -1 });
      res.render('mystery/listaEncuestasRealizadas', {
        title: 'Incognito UTN | Encuestas realizadas', username: userData.username, rol: userData.rol,
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

export const responderEncuesta = async (req, res) => {
  const encuestaId = req.params.id;
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' + userId });
    }
    const userData = await userHelper.getUserData(userId);
    if (userData) {
      const encuesta = await Encuesta.findById(encuestaId).populate('id_area', 'nombre color_hover');
      const preguntas = await PreguntaEncuesta.find({ id_encuesta: encuestaId })
        .populate('id_pregunta') // Obtiene la información completa de la pregunta
        .populate({
          path: 'id_pregunta',
          populate: {
            path: 'id_categoria' // Obtiene la información completa de la categoría
          }
        });
      res.render('mystery/responderEncuesta', {
        title: 'Incognito UTN | Encuestas pendientes', username: userData.username, rol: userData.rol,
        imagen: userData.imagen, activeSection: 'encuestasPendientes', encuestaId: encuestaId, // Pasar el ID de la encuesta
        preguntas: preguntas, // Pasar las preguntas a la vista
        areaNombre: encuesta.id_area.nombre,
        areaColor: encuesta.id_area.color_hover
      });
      //console.log('Preguntas:', preguntas);
    }
    else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error 2', error: error.message });
  }
}

export const registrarRespuestaEncuesta = async (req, res) => {
  try {
    const encuestaId = req.body.encuestaId;
    const userId = req.session.userId;

    // Validar que el usuario está autenticado
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Iterar sobre las respuestas del formulario
    for (const key in req.body) {
      if (key.startsWith('pregunta_')) {
        const partes = key.split('_'); // Dividir la clave en partes
        const preguntaId = partes[1];
        const calificacion = req.body[key];

        // Verificar si calificacion es un array (si se seleccionó más de una estrella)
        if (Array.isArray(calificacion)) {
          // Iterar sobre las calificaciones del array
          calificacion.forEach(async calif => {
            // Crear un nuevo documento de RespuestaEncuesta para cada calificación
            const nuevaRespuesta = new RespuestaEncuesta({
              id_encuesta: encuestaId,
              id_pregunta: preguntaId,
              respuesta: calif, // Usar la calificación individual del array
              id_usuario: userId,
            });

            // Guardar la respuesta en la base de datos
            await nuevaRespuesta.save();
          });
        } else {
          // Si solo se seleccionó una estrella, guardar la respuesta directamente
          const nuevaRespuesta = new RespuestaEncuesta({
            id_encuesta: encuestaId,
            id_pregunta: preguntaId,
            respuesta: calificacion,
            id_usuario: userId,
          });

          await nuevaRespuesta.save();
        }
      }
    }

    // Actualizar el array encuestas_resueltas del usuario
    await Usuario.findByIdAndUpdate(userId, {
      $push: { encuestas_resueltas: encuestaId }
    });

    res.redirect('/mystery/listaEncuestasPendientes');
  } catch (error) {
    console.error('Error al registrar las respuestas:', error);
    res.status(500).json({ message: 'Error al guardar las respuestas' });
  }
};


const mysteryController = {
  getHomeMystery,
  getPerfilMystery,
  getListaEncuestasPendientes,
  getListaEncuestasRealizadas,
  responderEncuesta,
  registrarRespuestaEncuesta
};

export default mysteryController;