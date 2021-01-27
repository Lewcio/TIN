const express = require('express');
const router = express.Router();

const trackController = require('../controllers/trackController');

router.get('/', trackController.showTrackList);
router.get('/add', trackController.showAddTrackForm);
router.get('/details/:trackId', trackController.showTrackDetails);

module.exports = router;