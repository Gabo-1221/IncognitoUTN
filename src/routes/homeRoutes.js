const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/home', { title: 'Incognito UTN' });
});

router.get('/como_funciona', (req, res) => {
    res.render('home/como_funciona', { title: 'Incognito UTN | Como funciona' });
  });

module.exports = router;
