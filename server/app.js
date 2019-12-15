require('./config/config');

const bodyparser = require('body-parser');
const express = require('express');

const {mongoose} = require('./db/mongoose');
const genreroute = require('./routes/genre');
const movieroute = require('./routes/movie');
const flowerroute = require('./routes/flower');
const shoproute = require('./routes/shop');

const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());

app.use('/genre', genreroute);
app.use('/movie', movieroute);
app.use('/flower', flowerroute);
app.use('/shop', shoproute);


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
