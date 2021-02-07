const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const raceController = require('../controllers/raceController');

router.get('/', raceController.showRaceList);
router.get('/add', authUtils.permitAuthenticatedUser, raceController.showAddRaceForm);
router.get('/edit/:raceId', authUtils.permitAuthenticatedUser, raceController.showEditRaceForm)
router.get('/details/:raceId', raceController.showRaceDetails);

router.post('/add', authUtils.permitAuthenticatedUser, raceController.addRace);
router.post('/edit', authUtils.permitAuthenticatedUser, raceController.updateRace);
router.get('/delete/:raceId', authUtils.permitAuthenticatedUser, raceController.deleteRace);

module.exports = router;