const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(process.env.PORT || 3333);