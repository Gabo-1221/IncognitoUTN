// controllers/auth/authController.js
const bcrypt = require('bcrypt');
const Usuario = require('../../models/Usuario');
const jwt = require('jsonwebtoken');
const userHelper = require('../../helpers/userHelper');

// Define los roles como constantes
const ROL_ADMIN = "66be37bf44270796dde41a7a";
const ROL_EVALUADOR = "66be379a44270796dde41a79";
const ROL_MYSTERY = "66be375044270796dde41a76";


// Muestra el formulario de inicio de sesión
exports.formLogin = (req, res) => {
  // Puedes incluir un mensaje de error si está disponible en la sesión o en la solicitud
  const error = req.query.error || null; // Usar parámetros de consulta para mensajes de error
  const message = req.query.message || ''; // Mensaje de error si hay
  res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error, message });
};

// Maneja el inicio de sesión
exports.login = async (req, res) => {
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
    // Verifica el estado del usuario
    const STATUS_INACTIVO = "66bf97b9d94dc47ae564b7d6"; // Define la constante para el estado desuscrito
    if (usuario.status == STATUS_INACTIVO) {
      return res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error: true, message: 'Usuario no activo' });
    }
    const STATUS_ACTIVO = "66bf97d6d94dc47ae564b7d7"; // Define la constante para el estado activo
    if (usuario.status !== STATUS_ACTIVO) {
      return res.render('auth/formLogin', { title: 'Incognito UTN | Iniciar sesión', error: true, message: 'Credenciales inválidas' });
    }    
    // Guarda el ObjectId del usuario en la sesión
    req.session.userId = usuario._id;
    // Verifica si el usuario marcó la casilla "Recuérdame"
    if (req.body.rememberMe) {
      // Genera un token JWT
      const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Expira en 30 días
      // Guarda el token en una cookie
      res.cookie('rememberMeToken', token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // Expira en 30 días
    }
    // Redirige al usuario según su rol
    if (usuario.rol === "66be37bf44270796dde41a7a") {
      res.redirect('/admin/home');
    } else if (usuario.rol === "66be379a44270796dde41a79") {
      res.redirect('/evaluador/home');
    } else if (usuario.rol === "66be375044270796dde41a76") {
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
exports.formRegistrar = (req, res) => {
  // Puedes incluir un mensaje de error si está disponible en la sesión o en la solicitud
  const error = req.query.error || null; // Usar parámetros de consulta para mensajes de error
  const message = req.query.message || ''; // Mensaje de error si hay

  res.render('auth/formRegistro', { title: 'Registro', error, message });
};

exports.Register = async (req, res) => {
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
      status: "66bf97d6d94dc47ae564b7d7"
    });

    await nuevoUsuario.save();
    req.session.userId = nuevoUsuario._id;

    res.redirect('/auth/selectRol');

  } catch (error) {
    console.error(error);
    res.status(500).render('auth/formRegistro', { title: 'Incognito UTN | Registrate', error: true, message: 'Error al registrar el usuario' });
  }
};



exports.selectRolEvaluador = async (req, res) => {
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

exports.selectRolMystery = async (req, res) => {
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

exports.updateUserData = async (req, res) => {
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
      const view = (userData.rol === 'Admin') ? 'perfil/perfilAdmin' :
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
        messageEmail: null
      });
    } else {
      const userData = await userHelper.getUserData(userId);
      res.render('perfil/perfilEvaluer', {
        title: 'Incognito UTN | Mi perfil',
        username: userData.username,
        rol: userData.rol,
        apellido: userData.apellidos,
        email: userData.correo,
        fecha_nac: userData.fecha_nac,
        message: result.message,
        messageEmail: result.messageEmail
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al actualizar los datos', error: error.message });
  }
};
// Función para cerrar sesión
exports.logout = (req, res) => {
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
