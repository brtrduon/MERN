const Authentication = require('./controllers/authentication');
const Admin = require('./controllers/admin');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: "this isn't the path you seek"});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
}