const DriverRepository = require('../repository/mysql2/DriverRepository');
const TeamRepository = require('../repository/mysql2/TeamRepository');

exports.showDriverList = (req, res, next) => {
    DriverRepository.getDrivers()
        .then(drivers => {
            res.render('driver/list', {
                drivers: drivers,
                navLocation: 'driver'
            });
        });
};

exports.showAddDriverForm = (req, res, next) => {
    res.render('driver/form', {
        driver: {},
        pageTitle: 'Nowy kierowca',
        formMode: 'createNew',
        btnLabel: 'Dodaj kierowce',
        formAction: '/drivers/add',
        navLocation: 'driver'
    });
};

exports.showEditDriverForm = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.getDriverById(driverId)
        .then(driver => {
            res.render('driver/form', {
                driver: driver,
                allTeams: allTeams,
                formMode: 'edit',
                pageTitle: 'Edycja kierowcy',
                btnLabel: 'Edytuj kierowcę',
                formAction: '/drivers/edit',
                navLocation: 'driver'
            });
        });
};

exports.showDriverDetails = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.getDriverById(driverId)
        .then(driver => {
            res.render('driver/form', {
                driver: driver,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły kierowcy',
                formAction: '',
                navLocation: 'driver'
            });
        });
};

exports.addDriver = (req, res, next) => {
    const driverData = { ...req.body };
    DriverRepository.createDriver(driverData)
        .then(result => {
            res.redirect('/drivers');
        });
};

exports.updateDriver = (req, res, next) => {
    const driverId = req.body._id;
    const driverData = { ...req.body };
    DriverRepository.updateDriver(driverId, driverData)
        .then(result => {
            res.redirect('/drivers');
        });
};

exports.deleteDriver = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.deleteDriver(driverId)
        .then(() => {
            res.redirect('/drivers');
        });
};