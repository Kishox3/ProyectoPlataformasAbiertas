// API/app/routes/index.js
const router = require('express').Router();

router.use('/usuarios', require('../controllers/usuarios'));
router.use('/marcas',   require('../controllers/marcas'));
router.use('/prendas',  require('../controllers/prendas'));
router.use('/ventas',   require('../controllers/ventas'));
router.use('/reportes', require('../controllers/reportes'));

module.exports = router;
