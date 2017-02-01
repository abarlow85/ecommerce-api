require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db/mongoose');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// routes
app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));

app.use(errorHandler);



app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

module.exports = app;
