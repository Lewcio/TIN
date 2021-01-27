exports.showRaceList = (req, res, next) => {
    res.render('race/list', { navLocation: 'race' });
}

exports.showAddRaceForm = (req, res, next) => {
    res.render('race/form', { navLocation: 'race' });
}

exports.showRaceDetails = (req, res, next) => {
    res.render('race/details', { navLocation: 'race' });
}