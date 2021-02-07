const DriverRepository = require('../repository/mysql2/DriverRepository');

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
        navLocation: 'driver',
        validationErrors: []
    });
};

exports.showEditDriverForm = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.getDriverById(driverId)
        .then(driver => {
            res.render('driver/form', {
                driver: driver,
                formMode: 'edit',
                pageTitle: 'Edycja kierowcy',
                btnLabel: 'Edytuj kierowcę',
                formAction: '/drivers/edit',
                navLocation: 'driver',
                validationErrors: []
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
                navLocation: 'driver',
                validationErrors: []
            });
        });
};

exports.addDriver = (req, res, next) => {
    const driverData = { ...req.body };
    DriverRepository.createDriver(driverData)
        .then(result => {
            res.redirect('/drivers');
        })
        .catch(err => {
            res.render('driver/form', {
                driver: driverData,
                pageTitle: 'Nowy kierowca',
                formMode: 'createNew',
                btnLabel: 'Dodaj kierowce',
                formAction: '/drivers/add',
                navLocation: 'driver',
                validationErrors: err.details
            });
        });
};

exports.updateDriver = (req, res, next) => {
    const driverId = req.body._id;
    const driverData = { ...req.body };
    DriverRepository.updateDriver(driverId, driverData)
        .then(result => {
            res.redirect('/drivers');
        })
        .catch(err => {
            res.render('driver/form', {
                driver: driverData,
                formMode: 'edit',
                pageTitle: 'Edycja kierowcy',
                btnLabel: 'Edytuj kierowcę',
                formAction: '/drivers/edit',
                navLocation: 'driver',
                validationErrors: err.details
            });
        });
};

exports.deleteDriver = (req, res, next) => {
    const driverId = req.params.driverId;
    DriverRepository.deleteDriver(driverId)
        .then(() => {
            res.redirect('/drivers');
        });
};