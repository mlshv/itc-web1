const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);

const user = { username: 'courier', password: 'delivery1337', id: 1 };

const findUser = (username, callback) => {
    if (username == user.username) {
        callback(null, user);
    } else {
        callback(new Error('User not found'));
    }
};

const applyAuth = app => {
    app.use(
        session({
            store: new RedisStore({
                url: process.env.REDIS_URL
            }),
            secret: process.env.APP_SECRET,
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy((username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (password !== user.password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        })
    );
};

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

applyAuth.authenticate = (req, res, next) => {
    console.log(req.body);
    return passport.authenticate('local')(req, res, next);
};

applyAuth.protectRoute = (req, res, next) =>
    req.isAuthenticated() ? next() : res.sendStatus(401);

module.exports = applyAuth;
