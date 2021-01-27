exports.showTeamList = (req, res, next) => {
    res.render('team/list', { navLocation: 'team' });
}

exports.showAddTeamForm = (req, res, next) => {
    res.render('team/form', { navLocation: 'team' });
}

exports.showTeamDetails = (req, res, next) => {
    res.render('team/details', { navLocation: 'team' });
}