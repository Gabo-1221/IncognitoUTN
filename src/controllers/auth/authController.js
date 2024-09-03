// controllers/auth/authController.js
import bcrypt from 'bcrypt';
import Usuario from '../../models/Usuario.js'; // Agrega la extensión .js
import Rol from '../../models/Rol.js'; // Agrega la extensión .js
import EstatusD from '../../models/EstadosUser.js'; // Agrega la extensión .js
import jwt from 'jsonwebtoken';
import userHelper from '../../helpers/userHelper.js'; // Agrega la extensión .js
import { storage } from '../../config/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Define los roles como constantes
const ROL_ADMIN = "66be37bf44270796dde41a7a";
const ROL_EVALUADOR = "66be379a44270796dde41a79";
const ROL_MYSTERY = "66be375044270796dde41a76";
/* const rolAdministrador = await Rol.findOne({ nombre: 'Administrador' });
    const rolEvaluador = await Rol.findOne({ nombre: 'Evaluador' });
    const rolMystery = await Rol.findOne({ nombre: 'Mystery Shopper' }); */

// Función auxiliar para determinar la vista según el rol
function getViewForRole(rol) {
  if (rol === 'Administrador') {
    return 'perfil/perfilAdmin';
  } else if (rol === 'Evaluador') {
    return 'perfil/perfilEvaluer';
  } else {
    return 'perfil/perfilMystery';
  }
}

// Muestra el formulario de inicio de sesión
export const formLogin = (req, res) => {
  // Puedes incluir un mensaje de error si está disponible en la sesión o en la solicitud
  const error = req.query.error || null; // Usar parámetros de consulta para mensajes de error
  const message = req.query.message || ''; // Mensaje de error si hay
  res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error, message });
};

// Maneja el inicio de sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Busca al usuario por correo electrónico
    const usuario = await Usuario.findOne({ correo: email });
    if (!usuario) {
      /* return res.status(401).json({ message: 'Credenciales inválidas' }); */
      return res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error: true, message: 'Credenciales inválidas' });
    }
    // Compara la contraseña ingresada con la contraseña encriptada
    const match = await bcrypt.compare(password, usuario.contrasena);
    if (!match) {
      /* return res.status(401).json({ message: 'Credenciales inválidas' }); */
      return res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error: true, message: 'Credenciales inválidas' });
    }

    const rolAdministrador = await Rol.findOne({ nombre: 'Administrador' });
    const rolEvaluador = await Rol.findOne({ nombre: 'Evaluador' });
    const rolMystery = await Rol.findOne({ nombre: 'Mystery Shopper' });
    const estadoActivo = await EstatusD.findOne({ nombre: 'Activo' }); 
    const estadoInactivo = await EstatusD.findOne({ nombre: 'Inactivo' });
    const estadoSuspendido = await EstatusD.findOne({ nombre: 'Desuscrito' });
    if (!usuario.status.equals(estadoActivo._id)) {
      return res.render('auth/formLogin', { 
        title: 'Incognito UTN | Iniciar sesión', 
        error: true, 
        message: 'Usuario no activo' 
      });
    }
    if (usuario.status.equals(estadoInactivo._id)) {
      return res.render('auth/formLogin', { 
        title: 'Incognito UTN | Iniciar sesión', 
        error: true, 
        message: 'Usuario inactivo' 
      });
    }
    req.session.userId = usuario._id;
    // Verifica si el usuario marcó la casilla "Recuérdame"
    if (req.body.rememberMe) {
      // Genera un token JWT
      const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Expira en 30 días
      // Guarda el token en una cookie
      res.cookie('rememberMeToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // Expira en 30 días
    }     

    // Redirige al usuario según su rol
    // Redirige al usuario según su rol (comparando ObjectIds)
    if (usuario.rol.equals(rolAdministrador._id)) {
      res.redirect('/admin/home');
    } else if (usuario.rol.equals(rolEvaluador._id)) {
      res.redirect('/evaluador/home');
    } else if (usuario.rol.equals(rolMystery._id)) {
      res.redirect('/mystery/home');
    } 
    else {
      // Maneja el caso de un rol inválido
      /* res.status(500).json({ message: 'Rol inválido' }); */
      return res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error: true, message: 'Rol inválido' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' + error.message });
  }
};

// Muestra el formulario de registro
export const formRegistrar = (req, res) => {
  // Puedes incluir un mensaje de error si está disponible en la sesión o en la solicitud
  const error = req.query.error || null; // Usar parámetros de consulta para mensajes de error
  const message = req.query.message || ''; // Mensaje de error si hay

  res.render('auth/formRegistro', { title: 'Registro', error, message });
};

export const Register = async (req, res) => {
  try {
    const { username, lastname, fecha_nac, email, password } = req.body;

    // Verifica si el correo ya está en uso
    const existingUser = await Usuario.findOne({ correo: email });
    if (existingUser) {
      // Si el correo ya existe, renderiza la vista de registro con un mensaje de error
      return res.render('auth/formRegistro', { title: 'Incognito UTN | Registrate', error: true, message: 'El correo electrónico ya está en uso' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const nuevoUsuario = new Usuario({
      nombre: username,
      apellidos: lastname,
      fecha_nac: fecha_nac,
      correo: email,
      contrasena: hashedPassword,
      rol: null,
      terms: true,
      status: "66bf97d6d94dc47ae564b7d7",
      profilePicture: null
    });

    await nuevoUsuario.save();
    req.session.userId = nuevoUsuario._id;

    res.redirect('/auth/selectRol');

  } catch (error) {
    console.error(error);
    res.status(500).render('auth/formRegistro', { title: 'Incognito UTN | Registrate', error: true, message: 'Error al registrar el usuario' });
  }
};



export const selectRolEvaluador = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }
    /* ROLES: 1 "MYSTERY" 2 "EVALUADOR" 3 "ADMIN" */
    /* 
    Mystery
    66be375044270796dde41a76
    Evaluador
    66be379a44270796dde41a79
    Admnistrador
    66be37bf44270796dde41a7a
     */
    /* /evaluador/home */
    await Usuario.findByIdAndUpdate(userId, { rol: "66be379a44270796dde41a79" });
    res.redirect('/evaluador/home');
  } catch (error) {
    console.error('Error al actualizar el rol a evaluador:', error);
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

export const selectRolMystery = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    await Usuario.findByIdAndUpdate(userId, { rol: "66be375044270796dde41a76" });
    res.redirect('/mystery/home');
  } catch (error) {
    console.error('Error al actualizar el rol a mystery:', error);
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};


/* exports.selectRol = (req, res) => {
  const userId = req.session.userId;
  res.render('selectRol', { userId });
}; */

export const updateUserData = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    const updatedData = {
      nombre: req.body.firstName,
      apellidos: req.body.lastName,
      correo: req.body.email,
      fecha_nac: req.body.fecha_nac,
      updated_at: Date.now()
    };

    const result = await userHelper.updateUserData(userId, updatedData);

    if (result.success) {
      const userData = await userHelper.getUserData(userId);
      const view = (userData.rol === 'Administrador') ? 'perfil/perfilAdmin' :
        (userData.rol === 'Evaluador') ? 'perfil/perfilEvaluer' :
          'perfil/perfilMystery';

      res.render(view, {
        title: 'Incognito UTN | Mi perfil',
        username: userData.username,
        rol: userData.rol,
        apellido: userData.apellidos,
        email: userData.correo,
        fecha_nac: userData.fecha_nac,
        message: result.message,
        MessageNewPassword: null,
        MessageNewPasswordError: null,
        messageEmail: null,
        activeSection: 'perfil',
        imagen: userData.imagen
      });
    } else {
      const userData = await userHelper.getUserData(userId);
      if (userData.rol === 'Administrador') {
        errorView = 'perfil/perfilAdmin'; // Vista de error para Admin
      } else if (userData.rol === 'Evaluador') {
        errorView = 'perfil/perfilEvaluer'; // Vista de error para Evaluador
      } else {
        errorView = 'perfil/perfilMystery'; // Vista de error para Mystery
      }
      res.render(errorView, {
        title: 'Incognito UTN | Mi perfil',
        username: userData.username,
        rol: userData.rol,
        apellido: userData.apellidos,
        email: userData.correo,
        fecha_nac: userData.fecha_nac,
        message: result.message,
        MessageNewPassword: null,
        MessageNewPasswordError: null,
        messageEmail: result.messageEmail,
        activeSection: 'perfil',
        imagen: userData.imagen
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al actualizar los datos', error: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    // 1. Obtener el usuario de la base de datos
    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 2. Comparar la contraseña actual con la contraseña almacenada
    const match = await bcrypt.compare(currentPassword, usuario.contrasena);
    if (!match) {
      // Contraseña actual incorrecta
      const userData = await userHelper.getUserData(userId);
      const view = getViewForRole(userData.rol); // Usar la función auxiliar para obtener la vista correcta
      return res.render(view, {
        title: 'Incognito UTN | Mi perfil',
        username: userData.username,
        rol: userData.rol,
        apellido: userData.apellidos,
        email: userData.correo,
        fecha_nac: userData.fecha_nac,
        message: null,
        MessageNewPassword: null,
        MessageNewPasswordError: 'La contraseña actual es incorrecta',
        messageEmail: null,
        activeSection: 'perfil',
        imagen: userData.imagen
      });
    }

    // 3. Verificar si la nueva contraseña y la confirmación coinciden
    if (newPassword !== confirmPassword) {
      // Las contraseñas no coinciden
      const userData = await userHelper.getUserData(userId);
      const view = getViewForRole(userData.rol);
      return res.render(view, {
        title: 'Incognito UTN | Mi perfil',
        username: userData.username,
        rol: userData.rol,
        apellido: userData.apellidos,
        email: userData.correo,
        fecha_nac: userData.fecha_nac,
        message: null,
        MessageNewPassword: null,
        MessageNewPasswordError: 'La nueva contraseña y la confirmación no coinciden',
        messageEmail: null,
        activeSection: 'perfil',
        imagen: userData.imagen
      });
    }

    // 4. Encriptar la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 5. Actualizar la contraseña en la base de datos
    usuario.contrasena = hashedPassword;
    await usuario.save();

    // 6. Redirigir al usuario a su perfil con un mensaje de éxito
    const userData = await userHelper.getUserData(userId);
    const view = getViewForRole(userData.rol);
    res.render(view, {
      title: 'Incognito UTN | Mi perfil',
      username: userData.username,
      rol: userData.rol,
      apellido: userData.apellidos,
      email: userData.correo,
      fecha_nac: userData.fecha_nac,
      message: null,
      MessageNewPassword: 'Contraseña actualizada con éxito',
      MessageNewPasswordError: null,
      messageEmail: null,
      activeSection: 'perfil',
      imagen: userData.imagen
    });

  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ message: 'Error al actualizar la contraseña', error: error.message });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    // Verificar si se ha subido un archivo
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }

    // Crear una referencia en Firebase Storage
    const storageRef = ref(storage, 'imagesUser/' + req.file.originalname);
    const metadata = {
      contentType: req.file.mimetype
    };

    // Subir la imagen a Firebase Storage
    await uploadBytes(storageRef, req.file.buffer, metadata);

    // Obtener la URL de la imagen
    const downloadURL = await getDownloadURL(storageRef);

    // Actualizar la URL de la imagen en el documento del usuario
    await Usuario.findByIdAndUpdate(userId, { profilePicture: downloadURL });

    // Obtener los datos del usuario
    const userData = await userHelper.getUserData(userId);

    // Determinar la vista según el rol
    const view = getViewForRole(userData.rol);

    // Renderizar la vista con la nueva imagen
    res.render(view, {
      title: 'Incognito UTN | Mi perfil',
      username: userData.username,
      rol: userData.rol,
      apellido: userData.apellidos,
      email: userData.correo,
      fecha_nac: userData.fecha_nac,
      message: null,
      MessageNewPassword: null,
      MessageNewPasswordError: null,
      messageEmail: null,
      activeSection: 'perfil',
      imagen: userData.imagen
    });

  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    res.status(500).json({ message: 'Error al actualizar la foto de perfil' });
  }
};


// Función para cerrar sesión
export const logout = (req, res) => {
  // Destruye la sesión
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    // Elimina la cookie "rememberMeToken" si existe
    res.clearCookie('rememberMeToken');
    // Redirige al usuario a la página de inicio de sesión
    res.redirect('/');
  });
};

// Crea un objeto con todas las funciones del controlador
const authController = {
  formLogin,
  login,
  formRegistrar,
  Register,
  selectRolEvaluador,
  selectRolMystery,
  updateUserData,
  updateUserPassword,
  updateProfilePicture,
  logout
};

// Exporta el objeto como valor por defecto
export default authController;