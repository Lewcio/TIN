const db = require("../../config/mysql2/db");

exports.getRaces = () => {
    return db.promise().query("SELECT * FROM Race")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getRaceById = (raceId) => {
    const query = `SELECT r._id as _id, r.name, r.date, r.laps, r.track_id,
        t._id as track_id, t.location, t.length
        FROM Race r
        left join Track t on t._id = r.track_id
        where r._id = ?`
    return db.promise().query(query, [raceId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const race = {
                _id: parseInt(raceId),
                name: firstRow.name,
                date: firstRow.date,
                laps: firstRow.laps,
                track: null
            }
            if (firstRow.track_id) {
                const track = {
                    _id: firstRow.track_id,
                    location: firstRow.location,
                    length: firstRow.length
                };
                race.track = track
            }
            return race;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createRace = (newRaceData) => {
    const name = newRaceData.name;
    const date = newRaceData.date;
    const laps = newRaceData.laps;
    const trackId = newRaceData.trackId;
    const sql = `INSERT into Race (name, date, laps, track_id) VALUES (?, ?, ?, ?)`;
    return db.promise().execute(sql, [name, date, laps, trackId]);
};

exports.updateRace = (raceId, raceData) => {
    const name = raceData.name;
    const date = raceData.date;
    const laps = raceData.laps;
    const trackId = raceData.trackId;
    const sql = `UPDATE Race set name = ?, date = ?, laps = ?, track_id = ? where _id = ?`;
    return db.promise().execute(sql, [name, date, laps, trackId, raceId]);
};

exports.deleteRace = (raceId) => {
    const sql = 'DELETE FROM Race where _id = ?';
    return db.promise().execute(sql, [raceId]);
};