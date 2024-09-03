// helpers/userHelper.js
import Usuario from '../models/Usuario.js';
import Rol from '../models/Rol.js';
import e from 'connect-flash';

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
        fecha_nac: usuario.fecha_nac,
        contrasena: usuario.contrasena, // <-- Agrega esta línea para incluir la contraseña
        imagen: usuario.profilePicture,
        encuestas_creadas: usuario.encuestas_creadas,
        encuestas_resueltas: usuario.encuestas_resueltas,
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

const userHelper = {
  getUserData,
  updateUserData
};


// Exporta el objeto como valor por defecto
export default userHelper;