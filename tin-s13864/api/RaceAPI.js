const RaceRepository = require('../repository/mysql2/RaceRepository');

exports.getRaces = (req, res, next) => {
    RaceRepository.getRaces()
        .then(drivers => {
            res.status(200).json(drivers);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getRacesById = (req, res, next) => {
    const raceId = req.params.raceId;
    RaceRepository.getRaceById(raceId)
        .then(race => {
            if (!race) {
                res.status(404).json({
                    message: 'Race with id: '+raceId+' not found'
                })
            } else {
                res.status(200).json(race);
            }
        });
};

exports.createRace = (req, res, next) => {
    RaceRepository.createRace(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateRace = (req, res, next) => {
    const raceId = req.params.raceId;
    RaceRepository.updateRace(raceId, req.body)
        .then(result => {
            res.status(200).json({message: 'Race updated!', race: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRace = (req, res, next) => {
    const raceId = req.params.raceId;
    RaceRepository.deleteRace(raceId)
        .then(result => {
            res.status(200).json({message: 'Removed race', race: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};