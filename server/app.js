require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db/mongoose');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

const corsOptions = {
	origin: ['http://localhost:3000'],
	exposedHeaders: 'x-auth'
};
app.use(cors(corsOptions));

app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);

	next();
});

// routes

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));

app.use(errorHandler);



app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

module.exports = app;
