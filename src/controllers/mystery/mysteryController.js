// src/controllers/mystery/mysteryController.js
import userHelper from '../../helpers/userHelper.js'; //Importa la función auxiliar

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
      res.render('mystery/listaEncuestasPendientes', { title: 'Incognito UTN | Encuestas pendientes', username: userData.username, rol: userData.rol,
          imagen: userData.imagen, activeSection: 'encuestasPendientes'
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
      res.render('mystery/listaEncuestasRealizadas', { title: 'Incognito UTN | Encuestas realizadas', username: userData.username, rol: userData.rol,
          imagen: userData.imagen, activeSection: 'encuestasRealizadas'
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