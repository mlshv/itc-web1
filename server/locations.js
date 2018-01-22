const stores = require('./stores.json');

const response = Object.values(stores).map(({ uuid, location }) => ({
    uuid,
    location
}));

function locations(req, res) {
    res.send({ payload: { locations: response } });
}

module.exports = locations;
