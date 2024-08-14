// controllers/auth/authController.js
const bcrypt = require('bcrypt');
const Usuario = require('../../models/Usuario');
const jwt = require('jsonwebtoken');
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
    if (usuario.rol === 3) {
      res.redirect('/admin/home');
    } else if (usuario.rol === 2) {
      res.redirect('/evaluador/home');
    } else if (usuario.rol === 1) {
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
      terms: true
    });

    await nuevoUsuario.save();
    req.session.userId = nuevoUsuario._id;
    
    res.redirect('/auth/selectRol');

  } catch (error) {
    console.error(error);
    res.status(500).render('auth/formRegistro', {title: 'Incognito UTN | Registrate', error: true, message: 'Error al registrar el usuario' });
  }
};



exports.selectRolEvaluador = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuario no autenticado' });
    }

    /* ROLES: 1 "MYSTERY" 2 "EVALUADOR" 3 "ADMIN" */
    /* /evaluador/home */
    await Usuario.findByIdAndUpdate(userId, { rol: 2 });
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

    await Usuario.findByIdAndUpdate(userId, { rol: 1 });
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
