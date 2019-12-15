const mongoose = require('mongoose');
const Joi = require('joi');

const flowerSchema = new mongoose.Schema({
  name:{
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
  color: {
    type: String,
    enum: ["red", "black", "blue"],
    required: true
  }
});

const Flower = mongoose.model('Flower', flowerSchema);

function flowerValidation (flower) {
  const schema = {
  name: Joi.string().required().min(6).max(255),
  descr: Joi.string().required().min(10).max(255),
  color: Joi.string().required().valid('red','black','blue')
}
return Joi.validate(flower, schema);
};

exports.Flower = Flower;
exports.flowerSchema = flowerSchema;
exports.validate = flowerValidation;
