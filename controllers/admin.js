const mongoose = require('mongoose');
const Item = mongoose.model('Item');

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
    console.log('crack');
}

exports.additem = function(req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    console.log(name, price, desc);

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