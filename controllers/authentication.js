const jwt = require('jwt-simple');
const config = require('../config');
const Admin = require('../models/kitchen');

function token(admin) {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: admin.id,
        iat: timestamp
        }, config.secret
    );
}

exports.signin = function(req, res, next) {
    res.send({ token: token(req.admin) });
}

exports.signup = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || password) {
        return res.status(422).send({ error: 'Email and/or password cannot be blank'});
    }
    Admin.findOne({ username: username }, function(err, existingAdmin) {
        if (err) {
            return next(err);
        }
        if (existingAdmin) {
            return res.status(422).send({ err: 'Username already in use'});
        }
        const admin = new Admin({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password
        });
        admin.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ token: token(admin) });
        });
    });
}