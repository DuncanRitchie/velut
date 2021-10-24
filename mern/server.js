const express = require('express');
const app = express();

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// require db connection
require('./models');

// configure body parser for Ajax requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use files built by create-react-app
app.use(express.static('client/build'));

app.use(routes);

// start server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
