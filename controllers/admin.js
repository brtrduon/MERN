const mongoose = require('mongoose');
const Item = mongoose.model('Item');

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
    // dest: 'client/public/upload',
    // filename: file.originalname,
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 }).single('img');

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
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    const img = req.file;
    console.log(img);

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