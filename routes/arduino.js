const express = require('express');
const router = express.Router();
const arduinoMiddleware = require('../middleware/arduino');



router.post('/', arduinoMiddleware.createArduino);


router.get('/', arduinoMiddleware.getAllArduinos);


router.get('/:id', arduinoMiddleware.getArduinoById);


router.put('/:id', arduinoMiddleware.updateArduino);


router.delete('/:id', arduinoMiddleware.deleteArduino);

module.exports = router;
