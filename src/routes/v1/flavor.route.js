const express = require('express');
const { flavorController } = require('../../controllers');

const router = express.Router();

router.route('/').get(flavorController.getFlavors);

module.exports = router;
