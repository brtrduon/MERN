const mongoose = require('mongoose');
const Item = mongoose.model('Item');

// const multer = require('multer');
// const upload = multer({dest: '../client/uploads'});

// exports.uploaditem = function(req, res, next) {
//     upload.single('img'), (req, res, next) => {
//         console.log(req.file);
//     }
// }

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
            desc: desc
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