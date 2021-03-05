const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

var allowedOrigins = ['http://localhost:3000', 'https://conttak.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(process.env.PORT || 3333);