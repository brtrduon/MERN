const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './client/public/uploads');
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
 });

exports.getitems = function(req, res, next) {
    Item.find({}, function(err, items) {
        if (err) {
            return next(err);
        }
        res.json(items);
        console.log(items);
    });
}

exports.additem = function(req, res, next) {
    console.log(req);
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const img = req.file.path

    Item.findOne({ name: name }, function(err, existingItem) {
        if (err) {
            return next(err);
        }
        if (existingItem) {
            return res.status(422).send({ err: 'Item already exists' });
        }
        const item = new Item({
            name: name,
            price: price,
            desc: desc,
            img: img
        });
        item.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ item });
            console.log('item saved, breh');
        });
    });
}