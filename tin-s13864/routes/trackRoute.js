const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const trackController = require('../controllers/trackController');

router.get('/', trackController.showTrackList);
router.get('/add', authUtils.permitAuthenticatedUser, trackController.showAddTrackForm);
router.get('/edit/:trackId', authUtils.permitAuthenticatedUser, trackController.showEditTrackForm);
router.get('/details/:trackId', trackController.showTrackDetails);

router.post('/add', authUtils.permitAuthenticatedUser, trackController.addTrack);
router.post('/edit', authUtils.permitAuthenticatedUser, trackController.updateTrack);
router.get('/delete/:trackId', authUtils.permitAuthenticatedUser, trackController.deleteTrack);

module.exports = router;