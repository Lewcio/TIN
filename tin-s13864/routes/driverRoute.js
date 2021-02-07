const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const driverController = require('../controllers/driverController');

router.get('/', driverController.showDriverList);
router.get('/add', authUtils.permitAuthenticatedUser, driverController.showAddDriverForm);
router.get('/edit/:driverId', authUtils.permitAuthenticatedUser, driverController.showEditDriverForm)
router.get('/details/:driverId', driverController.showDriverDetails);

router.post('/add', authUtils.permitAuthenticatedUser, driverController.addDriver);
router.post('/edit', authUtils.permitAuthenticatedUser, driverController.updateDriver);
router.get('/delete/:driverId', authUtils.permitAuthenticatedUser, driverController.deleteDriver);

module.exports = router;