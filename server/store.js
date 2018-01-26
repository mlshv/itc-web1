const stores = require('./stores.json');

function store(req, res) {
    const uuid = req.query.uuid;

    if (uuid) {
        const store = stores[uuid];
        if (store) {
            res.send({
                payload: {
                    ...store
                }
            });
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = store;
