const userHelper = require('../../helpers/userHelper'); // Importa la función auxiliar

exports.getHomeMystery = async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(400).json({ message: 'Usuario no autenticado' + userId });
      }
      const userData = await userHelper.getUserData(userId); 
      if (userData) {
        res.render('mystery/homeMystery', { title: 'Mystery', username: userData.username, rol: userData.rol });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error 2', error: error.message });
    }
  };
  
  exports.getPerfilMystery = async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(400).json({ message: 'Usuario no autenticado' + userId });
      }
      const userData = await userHelper.getUserData(userId);
      if (userData) {
        res.render('perfil/perfilMystery', { title: 'Incognito UTN | Mi perfil', username: userData.username, rol: userData.rol,
           apellido: userData.apellidos, email: userData.correo, fecha_nac: userData.fecha_nac, message: null, messageEmail: null, MessageNewPassword: null,MessageNewPasswordError: null, });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error 2', error: error.message });
    }
  };