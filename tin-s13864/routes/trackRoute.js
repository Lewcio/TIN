const express = require('express');
const router = express.Router();

const trackController = require('../controllers/trackController');

router.get('/', trackController.showTrackList);
router.get('/add', trackController.showAddTrackForm);
router.get('/details/:trackId', trackController.showTrackDetails);

router.post('/add', trackController.addTrack);
router.post('/edit', trackController.updateTrack);
router.get('/delete/:trackId', trackController.deleteTrack);

module.exports = router;