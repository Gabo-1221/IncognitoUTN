const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/home', { title: 'Incognito UTN' });
});

router.get('/sobreNosotros', (req, res) => {
    res.render('home/sobreNosotros', { title: 'Incognito UTN | Sobre nosotros' });
  });

module.exports = router;
