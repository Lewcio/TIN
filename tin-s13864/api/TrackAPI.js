const TrackRepository = require('../repository/mysql2/TrackRepository');

exports.getTracks = (req, res, next) => {
    TrackRepository.getTracks()
        .then(tracks => {
            res.status(200).json(tracks);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getTracksById = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.getTrackById(trackId)
        .then(track => {
            if (!track) {
                res.status(404).json({
                    message: 'Track with id: '+track+' not found'
                })
            } else {
                res.status(200).json(track);
            }
        });
};

exports.createTrack = (req, res, next) => {
    TrackRepository.createTrack(req.body)
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

exports.updateTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.updateTrack(trackId, req.body)
        .then(result => {
            res.status(200).json({message: 'Track updated!', track: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    TrackRepository.deleteTrack(trackId)
        .then(result => {
            res.status(200).json({message: 'Removed track', track: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};