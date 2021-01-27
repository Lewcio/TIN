const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driverController');

router.get('/', driverController.showDriverList);
router.get('/add', driverController.showAddDriverForm);
router.get('/details/:driverId', driverController.showDriverDetails);

module.exports = router;