const db = require("../../config/mysql2/db");

exports.getDrivers = () => {
    return db.promise().query("SELECT * FROM Driver")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getDriverById = (driverId) => {
    const query = `SELECT d._id as _id, d.firstName, d.lastName, d.dateOfBirth, d.nationality as driverNationality, d.team_id,
        t._id as team_id, t.name, t.nationality as teamNationality, t.dateOfCreate, t.colors
        FROM Driver d
        left join Team t on t._id = d.team_id
        where d._id = ?`
    return db.promise().query(query, [driverId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const driver = {
                _id: parseInt(driverId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                dateOfBirth: firstRow.dateOfBirth,
                nationality: firstRow.driverNationality,
                team: null
            }
            if (firstRow.team_id) {
                const team = {
                    _id: firstRow.team_id,
                    name: firstRow.name,
                    nationality: firstRow.teamNationality,
                    dateOfCreate: firstRow.dateOfCreate,
                    colors: firstRow.colors
                };
                driver.team = team
            }
            return driver;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createDriver = (newDriverData) => {
    const firstName = newDriverData.firstName;
    const lastName = newDriverData.lastName;
    const dateOfBirth = newDriverData.dateOfBirth;
    const nationality = newDriverData.nationality;
    const teamId = newDriverData.teamId;
    const sql = `INSERT into Driver (firstName, lastName, dateOfBirth, nationality, team_id) VALUES (?, ?, ?, ?, ?)`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, nationality, teamId]);
};

exports.updateDriver = (driverId, driverData) => {
    const firstName = driverData.firstName;
    const lastName = driverData.lastName;
    const dateOfBirth = driverData.dateOfBirth;
    const nationality = driverData.nationality;
    const teamId = driverData.teamId;
    const sql = `UPDATE Driver set firstName = ?, lastName = ?, dateOfBirth = ?, nationality = ?, team_id = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, nationality, teamId, driverId]);
};

exports.deleteDriver = (driverId) => {
    const sql = 'DELETE FROM Driver where _id = ?';
    return db.promise().execute(sql, [driverId]);
};