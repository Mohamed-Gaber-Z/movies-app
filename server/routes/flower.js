const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Flower, validate} = require('../models/flowershop');

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const color = req.body.color;
  // if (color !== "red" || color !== "black" || color !=="blue")
  // return res.status(400).send('Invalid color');

  let flower = new Flower({
    name: req.body.name,
    descr: req.body.descr,
    color: req.body.color
  });

  flower = await flower.save();
  res.send(flower);
});

router.get('/', async (req,res) => {
  try {
    const flower = await Flower.find();
    res.send(flower);
  } catch (e) {
    res.send(e)
  }
});

router.get('/:id', async (req, res) => {
  try {

    const flower = await Flower.findById(req.params.id);
    res.send(flower);
  } catch (e) {
    res.send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    res.send(flower);
  } catch(e) {
    res.send(e);
  }
});

router.patch('/:id', async (req, res) => {
  try{
    const id = req.params.id
    const flower = await Flower.findByIdAndUpdate(id, {$set: {
      name: req.body.name,
      descr: req.body.descr,
      color: req.body.color
    }});
      res.send(flower);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
