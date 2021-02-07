const db = require("../../config/mysql2/db");
const teamSchema = require("../../model/joi/Team");

exports.getTeams = () => {
    return db.promise().query("SELECT * FROM Team")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getTeamById = (teamId) => {
    const query = `SELECT t._id as _id, t.name, t.nationality as teamNationality, t.dateOfCreate, t.colors,
        d._id as driver_id, d.firstName, d.lastName, d.dateOfBirth, d.nationality as driverNationality, c.dateFrom, c.dateTo
        FROM Team t
        left join Contract c on c.team_id = t._id
        left join Driver d on c.driver_id = d._id 
        where t._id = ?`
    return db.promise().query(query, [teamId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const team = {
                _id: parseInt(teamId),
                name: firstRow.name,
                nationality: firstRow.teamNationality,
                dateOfCreate: firstRow.dateOfCreate,
                colors: firstRow.colors,
                drivers: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.driver_id) {
                    const driver = {
                        _id: row.driver_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        dateOfBirth: row.dateOfBirth,
                        nationality: row.driverNationality,
                        dateFrom: row.dateFrom,
                        dateTo: row.dateTo
                    };
                    team.drivers.push(driver);
                }
            }
            return team;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createTeam = (newTeamData) => {
    const vRes = teamSchema.validate(newTeamData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newTeamData.name;
    const nationality = newTeamData.nationality;
    const dateOfCreate = newTeamData.dateOfCreate;
    const colors = newTeamData.colors;
    const sql = `INSERT into Team (name, nationality, dateOfCreate, colors) VALUES (?, ?, ?, ?)`;
    return db.promise().execute(sql, [name, nationality, dateOfCreate, colors]);
};

exports.updateTeam = (teamId, teamData) => {
    const vRes = teamSchema.validate(teamData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = teamData.name;
    const nationality = teamData.nationality;
    const dateOfCreate = teamData.dateOfCreate;
    const colors = teamData.colors;
    const sql = `UPDATE Team set name = ?, nationality = ?, dateOfCreate = ?, colors = ? where _id = ?`;
    return db.promise().execute(sql, [name, nationality, dateOfCreate, colors, teamId]);
};

exports.deleteTeam = (teamId) => {
    const sql1 = 'DELETE FROM Contract where team_id = ?';
    const sql2 = 'DELETE FROM Team where _id = ?';
    return db.promise().execute(sql1, [teamId])
        .then(() => {
            return db.promise().execute(sql2, [teamId])
        });
};