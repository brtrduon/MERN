const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Img = mongoose.model('Img');

exports.getitems = function(req, res, next) {
    Item.find({}, function(err, items) {
        if (err) {
            return next(err);
        }
        res.json(items);
        console.log(items);
    });
}

exports.img = function(req, res, next) {
    // console.log(req.file);
    const originalname = req.file.originalname;
    const mimetype = req.file.mimetype;
    const size = req.file.size;
    const path = req.file.path;

    Img.findOne({ originalname: originalname }, function(err, existingImg) {
        if (err) {
            return next(err);
        };
        if (existingImg) {
            return next(existingImg);
        };
        const img = new Img({
            originalname: originalname,
            mimetype: mimetype,
            size: size,
            path: path
        });
        img.save(function(err) {
            if (err) {
                return next(err);
            };
            res.json({ img });
            console.log('img saved, breh');
        });
    });
};

exports.additem = function(req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    console.log(name, price, desc);

    Item.findOne({ name: name }, function(err, existingItem) {
        if (err) {
            return next(err);
        };
        if (existingItem) {
            return res.status(422).send({ err: 'Item already exists' });
        };
        const item = new Item({
            name: name,
            price: price,
            desc: desc,
        });
        item.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ item });
            console.log('item saved, breh');
        });
    });
};