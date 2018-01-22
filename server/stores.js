const response = require('./stores.json');

function stores(req, res) {
    res.send(response);
}

module.exports = stores;
