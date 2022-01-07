
const express = require('express');
const router = express.Router();
const controller = require('../controller/typeControllers');

    router.get('/list', controller.show)

module.exports = router;