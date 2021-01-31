const TeamRepository = require('../repository/mysql2/TeamRepository');

exports.showTeamList = (req, res, next) => {
    TeamRepository.getTeams()
        .then(teams => {
            res.render('team/list', {
                teams: teams,
                navLocation: 'team'
            });
        });
};

exports.showAddTeamForm = (req, res, next) => {
    res.render('team/form', {
        team: {},
        pageTitle: 'Nowa drużyna',
        formMode: 'createNew',
        btnLabel: 'Dodaj drużynę',
        formAction: '/teams/add',
        navLocation: 'team'
    });
};

exports.showEditTeamForm = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId)
        .then(team => {
            res.render('team/form', {
                team: team,
                formMode: 'edit',
                pageTitle: 'Edycja drużyny',
                btnLabel: 'Edytuj drużynę',
                formAction: '/teams/edit',
                navLocation: 'team'
            });
        });
};

exports.showTeamDetails = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId)
        .then(team => {
            res.render('team/form', {
                team: team,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły drużyny',
                formAction: '',
                navLocation: 'team'
            });
        });
};

exports.addTeam = (req, res, next) => {
    const teamData = { ...req.body };
    TeamRepository.createTeam(teamData)
        .then(result => {
            res.redirect('/teams');
        });
};

exports.updateTeam = (req, res, next) => {
    const teamId = req.body._id;
    const teamData = { ...req.body };
    TeamRepository.updateTeam(teamId, teamData)
        .then(result => {
            res.redirect('/teams');
        });
};

exports.deleteTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.deleteTeam(teamId)
        .then(() => {
            res.redirect('/teams');
        });
};