const TrackRepository = require('../repository/mysql2/TrackRepository');

exports.showTrackList = (req, res, next) => {
    TrackRepository.getTracks()
        .then(tracks => {
            res.render('track/list', {
                tracks: tracks,
                navLocation: 'track'
            });
        });
}

exports.showAddTrackForm = (req, res, next) => {
    res.render('track/form', {
        track: {},
        pageTitle: 'Nowy ror',
        formMode: 'createNew',
        btnLabel: 'Dodaj tor',
        formAction: '/tracks/add',
        navLocation: 'track',
        validationErrors: []
    });
}

exports.showEditTrackForm = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.getTrackById(trackId)
        .then(track => {
            res.render('team/form', {
                track: track,
                formMode: 'edit',
                pageTitle: 'Edycja toru',
                btnLabel: 'Edytuj tor',
                formAction: '/tracks/edit',
                navLocation: 'track',
                validationErrors: []
            });
        });
};

exports.showTrackDetails = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.getTrackById(trackId)
        .then(track => {
            res.render('track/form', {
                track: track,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły toru',
                formAction: '',
                navLocation: 'track',
                validationErrors: []
            });
        });
}

exports.addTrack = (req, res, next) => {
    const trackData = { ...req.body };
    TrackRepository.createTrack(trackData)
        .then(result => {
            res.redirect('/tracks');
        })
        .catch(err => {
            res.render('track/form', {
                track: trackData,
                pageTitle: 'Nowy ror',
                formMode: 'createNew',
                btnLabel: 'Dodaj tor',
                formAction: '/tracks/add',
                navLocation: 'track',
                validationErrors: err.details
            });
        });
};

exports.updateTrack = (req, res, next) => {
    const trackId = req.body._id;
    const trackData = { ...req.body };
    TrackRepository.updateTrack(trackId, trackData)
        .then(result => {
            res.redirect('/tracks');
        })
        .catch(err => {
            res.render('team/form', {
                track: trackData,
                formMode: 'edit',
                pageTitle: 'Edycja toru',
                btnLabel: 'Edytuj tor',
                formAction: '/tracks/edit',
                navLocation: 'track',
                validationErrors: err.details
            });
        });
};

exports.deleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.deleteTrack(trackId)
        .then(() => {
            res.redirect('/tracks');
        });
};