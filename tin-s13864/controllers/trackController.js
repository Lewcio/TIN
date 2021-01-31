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
        navLocation: 'track'
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
                navLocation: 'track'
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
                navLocation: 'track'
            });
        });
}

exports.addTrack = (req, res, next) => {
    const trackData = { ...req.body };
    TrackRepository.createTrack(trackData)
        .then(result => {
            res.redirect('/tracks');
        });
};

exports.updateTrack = (req, res, next) => {
    const trackId = req.body._id;
    const trackData = { ...req.body };
    TrackRepository.updateTrack(trackId, trackData)
        .then(result => {
            res.redirect('/tracks');
        });
};

exports.deleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.deleteTrack(trackId)
        .then(() => {
            res.redirect('/tracks');
        });
};