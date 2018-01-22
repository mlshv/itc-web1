const express = require('express');
const bodyParser = require('body-parser');

const store = require('./store');
const stores = require('./stores');
const locations = require('./locations');

const app = express();
const apiRouter = express.Router();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

apiRouter
    .get('/', (req, res) => {
        res.json({ message: 'API Initialized!' });
    })
    .get('/store', store)
    .get('/stores', stores)
    .get('/locations', locations);

app.use(apiRouter);

app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
