const express = require('express');
const router = express.Router();

const raceController = require('../controllers/raceController');

router.get('/', raceController.showRaceList);
router.get('/add', raceController.showAddRaceForm);
router.get('/details/:raceId', raceController.showRaceDetails);

module.exports = router;