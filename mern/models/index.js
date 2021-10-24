const mongoose = require('mongoose');

if (process.env.ENVIRONMENT != "PRODUCTION") {
	const dotenv = require('dotenv');
	dotenv.config()
}

mongoose.connect(process.env.MONGODB_URI);

// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error : ' + err);
});
