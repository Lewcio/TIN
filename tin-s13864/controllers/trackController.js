exports.showTrackList = (req, res, next) => {
    res.render('track/list', { navLocation: 'track' });
}

exports.showAddTrackForm = (req, res, next) => {
    res.render('track/form', { navLocation: 'track' });
}

exports.showTrackDetails = (req, res, next) => {
    res.render('track/details', { navLocation: 'track' });
}