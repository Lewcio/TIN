const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.get('/', teamController.showTeamList);
router.get('/add', teamController.showAddTeamForm);
router.get('/details/:teamId', teamController.showTeamDetails);

module.exports = router;