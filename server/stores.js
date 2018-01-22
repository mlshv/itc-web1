const stores = require('./stores.json');

const response = Object.values(stores).map(
    ({ title, uuid, link, heroImageUrl, sellsAlcohol, categories }) => ({
        title,
        uuid,
        link,
        heroImageUrl,
        sellsAlcohol,
        categories
    })
);

function stores(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.offset || 10;
    res.send({
        payload: {
            stores: response.slice(offset, offset + limit),
            hasMore: offset + limit < response.length
        }
    });
}

module.exports = stores;
