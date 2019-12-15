const mongoose = require('mongoose');
const Joi = require('joi');

const genereSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genereSchema);

function genrevalidation (genre) {
  const schema = {
    name: Joi.string().required().min(5)
  };
  return Joi.validate(genre, schema);
}

exports.genereSchema = genereSchema;
exports.Genre = Genre;
exports.validate = genrevalidation;
