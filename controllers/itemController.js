const Item = require('../models/Item');

exports.getItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
};

exports.createItem = async (req, res) => {
    const newItem = new Item(req.body);
    const saved = await newItem.save();
    res.json(saved);
};
