const RaceRepository = require('../repository/mysql2/RaceRepository');
const TrackRepository = require('../repository/mysql2/TrackRepository');

exports.showRaceList = (req, res, next) => {
    RaceRepository.getRaces()
        .then(races => {
            res.render('race/list', {
                races: races,
                navLocation: 'race'
            });
        });
};

exports.showAddRaceForm = (req, res, next) => {
    TrackRepository.getTracks()
        .then(tracks => {
            res.render('race/form', {
                race: {},
                allTracks: tracks,
                pageTitle: 'Nowy wyścig',
                formMode: 'createNew',
                btnLabel: 'Dodaj wyścig',
                formAction: '/races/add',
                navLocation: 'race',
                validationErrors: []
            });
        });
};

exports.showEditRaceForm = (req, res, next) => {
    const raceId = req.params.raceId;
    let allTracks;
    TrackRepository.getTracks()
        .then(tracks => {
            allTracks = tracks
            return RaceRepository.getRaceById(raceId);
        })
        .then(race => {
            res.render('race/form', {
                race: race,
                allTracks: allTracks,
                formMode: 'edit',
                pageTitle: 'Edycja wyścigu',
                btnLabel: 'Edytuj wyścig',
                formAction: '/races/edit',
                navLocation: 'race',
                validationErrors: []
            });
        });
};

exports.showRaceDetails = (req, res, next) => {
    const raceId = req.params.raceId;
    let allTracks;
    TrackRepository.getTracks()
        .then(tracks => {
            allTracks = tracks
            return RaceRepository.getRaceById(raceId);
        })
        .then(race => {
            res.render('race/form', {
                race: race,
                allTracks: allTracks,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wyścigu',
                formAction: '',
                navLocation: 'race',
                validationErrors: []
            });
        });
};

exports.addRace = (req, res, next) => {
    const raceData = { ...req.body };
    let allTracks;
    TrackRepository.getTracks()
        .then(tracks => {
            allTracks = tracks
            return RaceRepository.createRace(raceData);
        })
        .then(result => {
            res.redirect('/races');
        })
        .catch(err => {
            res.render('race/form', {
                race: raceData,
                allTracks: allTracks,
                pageTitle: 'Nowy wyścig',
                formMode: 'createNew',
                btnLabel: 'Dodaj wyścig',
                formAction: '/races/add',
                navLocation: 'race',
                validationErrors: err.details
            });
        });
};

exports.updateRace = (req, res, next) => {
    const raceId = req.body._id;
    const raceData = { ...req.body };
    let allTracks;
    TrackRepository.getTracks()
        .then(tracks => {
            allTracks = tracks
            return RaceRepository.updateRace(raceId, raceData);
        })
        .then(result => {
            res.redirect('/races');
        })
        .catch(err => {
            res.render('race/form', {
                race: raceData,
                allTracks: allTracks,
                formMode: 'edit',
                pageTitle: 'Edycja wyścigu',
                btnLabel: 'Edytuj wyścig',
                formAction: '/races/edit',
                navLocation: 'race',
                validationErrors: err.details
            });
        });
};

exports.deleteRace = (req, res, next) => {
    const raceId = req.params.raceId;
    RaceRepository.deleteRace(raceId)
        .then(() => {
            res.redirect('/races');
        });
};