const Authentication = require('./controllers/authentication');
const Admin = require('./controllers/admin');
// wanted to use a separate controller once the admin is logged in, but do whatever is simpler, I guess

const passportService = require('./services/passport');
const passport = require('passport');

const multer = require('multer');
const upload = multer({dest: '../uploads'});

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: "this isn't the path you seek"});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);

    // app.post('/imgupload', Admin.uploaditem);
    
    app.get('/getitems', Admin.getitems);

    app.post('/additem', Admin.additem);
}