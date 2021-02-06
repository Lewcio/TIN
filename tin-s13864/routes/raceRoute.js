const express = require('express');
const router = express.Router();

const raceController = require('../controllers/raceController');

router.get('/', raceController.showRaceList);
router.get('/add', raceController.showAddRaceForm);
router.get('/edit/:raceId', raceController.showEditRaceForm)
router.get('/details/:raceId', raceController.showRaceDetails);

router.post('/add', raceController.addRace);
router.post('/edit', raceController.updateRace);
router.get('/delete/:raceId', raceController.deleteRace);

module.exports = router;