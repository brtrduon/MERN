const Authentication = require('./controllers/authentication');
const Admin = require('./controllers/admin');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'client/public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/bmp' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    cb(null, false);
};
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
 });



module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: "this isn't the path you seek"});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
    
    app.post('/additem', Admin.additem);

    app.post('/upload', upload.single('img'), (req, res) => {
        console.log('pewp');
        console.log(req.file);
        res.send('ok');
    });
    
    app.get('/getitems', Admin.getitems);
}