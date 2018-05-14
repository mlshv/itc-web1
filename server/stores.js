const storesData = require('./stores.json');

const response = Object.values(storesData).map(
    ({ title, uuid, link, heroImageUrl, sellsAlcohol, categories, etaRange, priceBucket }) => ({
        title,
        uuid,
        link,
        heroImageUrl,
        sellsAlcohol,
        categories,
        etaRange,
        priceBucket
    })
);

function stores(req, res) {
    const offset = +req.query.offset || 0;
    const limit = +req.query.limit || 10;

    res.send({
        payload: {
            stores: response.slice(offset, offset + limit),
            hasMore: offset + limit < response.length
        }
    });
}

module.exports = stores;
