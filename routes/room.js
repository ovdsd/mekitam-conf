const express = require('express');
const router = express.Router();
const indexController = require('../controller/index_controller');

router.get('/', indexController.createNewRoom);

router.get('/:room', indexController.joinRoom);

router.get('/end/:room', indexController.leaveRoom);

module.exports = router;