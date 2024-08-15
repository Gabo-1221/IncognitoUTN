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

module.exports = { getUserData };