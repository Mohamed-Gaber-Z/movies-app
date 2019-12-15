const mongoose = require('mongoose');
const Joi = require('joi');
const {genereSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genereSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', movieSchema);

function movievalidation (movie) {
  const schema = {
    title: Joi.string().required().min(5).max(255),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255)
  };

  return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validate = movievalidation;
