const express = require('express');
const router = express.Router();

const trackApiController = require('../../api/TrackAPI');

router.get('/', trackApiController.getTracks);
router.get('/:trackId', trackApiController.getTracksById);
router.post('/', trackApiController.createTrack);
router.put('/:trackId', trackApiController.updateTrack);
router.delete('/:trackId', trackApiController.deleteTrack);

module.exports = router;