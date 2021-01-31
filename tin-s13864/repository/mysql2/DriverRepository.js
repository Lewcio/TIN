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
    const query = `SELECT d._id as _id, d.firstName, d.lastName, d.dateOfBirth, d.nationality as driverNationality,
        t._id as team_id, t.name, t.nationality as teamNationality, t.dateOfCreate, t.colors, c.dateFrom, c.dateTo
        FROM Driver d
        left join Contract c on c.driver_id = d._id
        left join Team t on c.team_id = t._id
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
                teams: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.team_id) {
                    const team = {
                        _id: row.team_id,
                        name: row.name,
                        nationality: row.teamNationality,
                        dateOfCreate: row.dateOfCreate,
                        dateFrom: row.dateFrom,
                        dateTo: row.dateTo,
                        colors: row.colors
                    };
                    driver.teams.push(team)
                }
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
    const sql = `INSERT into Driver (firstName, lastName, dateOfBirth, nationality) VALUES (?, ?, ?, ?)`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, nationality]);
};

exports.updateDriver = (driverId, driverData) => {
    const firstName = driverData.firstName;
    const lastName = driverData.lastName;
    const dateOfBirth = driverData.dateOfBirth;
    const nationality = driverData.nationality;
    const sql = `UPDATE Driver set firstName = ?, lastName = ?, dateOfBirth = ?, nationality = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, nationality, driverId]);
};

exports.deleteDriver = (driverId) => {
    const sql = 'DELETE FROM Driver where _id = ?';
    return db.promise().execute(sql, [driverId]);
};