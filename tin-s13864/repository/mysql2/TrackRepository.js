const db = require("../../config/mysql2/db");

exports.getTracks = () => {
    return db.promise().query("SELECT * FROM Track")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getTrackById = (trackId) => {
    const query = `SELECT t._id as _id, t.location, t.length,
        r._id as race_id, r.name, r.date, r.laps, r.track_id
        FROM Track t
        left join Race r on r.track_id = t._id
        where t._id = ?`
    return db.promise().query(query, [trackId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const track = {
                _id: parseInt(trackId),
                location: firstRow.location,
                length: firstRow.length,
                races: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.race_id) {
                    const race = {
                        _id: row.race_id,
                        name: row.name,
                        date: row.date,
                        laps: row.laps
                    };
                    track.races.push(race);
                }
            }
            return track;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createTrack = (newTrackData) => {
    const location = newTrackData.location;
    const length = newTrackData.length;
    const sql = `INSERT into Track (location, length) VALUES (?, ?)`;
    return db.promise().execute(sql, [location, length]);
};

exports.updateTrack = (trackId, trackData) => {
    const location = trackData.location;
    const length = trackData.length;
    const sql = `UPDATE Track set location = ?, length = ?, where _id = ?`;
    return db.promise().execute(sql, [location, length, trackId]);
};

exports.deleteTrack = (trackId) => {
    const sql1 = 'DELETE FROM Race where track_id = ?';
    const sql2 = 'DELETE FROM Track where _id = ?';
    return db.promise().execute(sql1, [trackId])
        .then(() => {
            return db.promise().execute(sql2, [trackId])
        });
};