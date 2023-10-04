const express = require('express');
const router = express.Router();
const indexController = require('../controller/index_controller');


router.get('/', indexController.renderHome);
router.use('/room', require('./room.js'));
router.use('/signup', indexController.signup);
router.use('/login', indexController.login);

module.exports = router;