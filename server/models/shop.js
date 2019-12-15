const mongoose = require('mongoose');
const Joi = require('joi');
const {Flower, flowerSchema} = require('./flowershop');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 255
  },
  descr: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 255
  },
  place: {
    type: String,
    required: true,
    enum: ['ismalia', 'portsaid', 'elsweess']
  },
  flowerref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flower',
    required: true
  }
});

const Shop = mongoose.model('Shop', shopSchema);

function shopValidation (shop) {
  const schema = {
    name: Joi.string().required().min(6).max(255),
    descr: Joi.string().required().min(10).max(255),
    place: Joi.string().required().valid('ismalia', 'portsaid', 'elsweess'),
    flowerref: Joi.required()
  }

  return Joi.validate(shop, schema);
};

exports.Shop = Shop;
exports.validate = shopValidation;
