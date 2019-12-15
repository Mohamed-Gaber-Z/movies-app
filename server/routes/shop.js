const {Shop, validate} = require('../models/shop');
const {Flower} = require('../models/flowershop');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const flower = await Flower.findById(req.body.flowerref.ObjectId);
  if (!flower) return res.status(400).send('Invalid flower');

  let shop = new Shop({
    name: req.body.name,
    descr: req.body.descr,
    place: req.body.place,
    flowerref: req.body.flowerref
  });


  shop = await shop.save();
  res.send(shop);
});

router.get('/', async (req, res) => {
  try {
    const shop = await Shop.find().populate('flowerref');
    res.send(shop);
  } catch (e) {
    res.send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send('Invalid id');

    const shop = await Shop.findById(id).populate('flowerref');
    res.send(shop);
  } catch (e) {
    res.send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send('Invalid id');

    const shop = await Shop.findByIdAndDelete(id);
    res.send(shop);
  } catch (e) {
    res.send(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send('Invalid id');

    const shop = await Shop.findByIdAndUpdate(id, {$set: {
      name: req.body.name,
      descr: req.body.descr,
      place: req.body.place,
      flowerref: req.body.flowerref
    }});
    res.send(e);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
