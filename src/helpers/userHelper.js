const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol'); // Asegúrate de tener un modelo Rol

async function getUserData(userId) {
  try {
    const usuario = await Usuario.findById(userId);
    if (usuario) {
      const rol = await Rol.findById(usuario.rol);
      return {
        username: usuario.nombre,
        rol: rol.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        fecha_nac: usuario.fecha_nac
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null; 
  }
}


async function updateUserData(userId, updatedData) {
  try {
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // Verificar si el correo ya existe
    const existingUser = await Usuario.findOne({ correo: updatedData.correo, _id: { $ne: userId } });
    if (existingUser) {
      return { success: false, messageEmail: 'Este correo ya está en uso' };
    }

    // Actualizar los datos del usuario
    Object.assign(usuario, updatedData);
    await usuario.save();

    return { success: true, message: 'Datos actualizados con éxito' };
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    return { success: false, message: 'Error al actualizar los datos del usuario', error: error.message };
  }
}

module.exports = { getUserData, updateUserData };