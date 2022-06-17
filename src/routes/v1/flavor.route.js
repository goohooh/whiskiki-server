const express = require('express');
const { flavorController } = require('../../controllers');

const router = express.Router();

router.route('/').get(flavorController.getFlavors);
router.route('/details').get(flavorController.getFlavorsPage);

module.exports = router;
