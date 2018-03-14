const Authentication = require('./controllers/authentication');
const Admin = require('./controllers/admin');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'client/public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
const fileFilter = function(req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/bmp' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    callback(null, false);
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 }).single('img');



module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: "this isn't the path you seek"});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
    
    app.post('/additem', Admin.additem);
    
    app.get('/getitems', Admin.getitems);
}