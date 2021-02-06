const express = require('express');
const router = express.Router();

const raceApiController = require('../../api/RaceAPI');

router.get('/', raceApiController.getRaces);
router.get('/:raceId', raceApiController.getRacesById);
router.post('/', raceApiController.createRace);
router.put('/:raceId', raceApiController.updateRace);
router.delete('/:raceId', raceApiController.deleteRace);

module.exports = router;