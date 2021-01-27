exports.showDriverList = (req, res, next) => {
    res.render('driver/list', { navLocation: 'driver' });
}

exports.showAddDriverForm = (req, res, next) => {
    res.render('driver/form', { navLocation: 'driver' });
}

exports.showDriverDetails = (req, res, next) => {
    res.render('driver/details', { navLocation: 'driver' });
}