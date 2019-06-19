const mongoose = require('mongoose');
const URI = require('../mongodb_uri');

mongoose.connect(process.env.MONGODB_URI || URI);

// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error : ' + err);
});
