const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./auth');
const store = require('./store');
const stores = require('./stores');
const locations = require('./locations');

const app = express();
const apiRouter = express.Router();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

auth(app);

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
    .get('/locations', locations)
    .post('/auth', auth.authenticate, (req, res) => res.json({ success: true }))
    .get('/orders', auth.protectRoute, (req, res) =>
        res.json({ success: true })
    );

app.use(apiRouter);

app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
