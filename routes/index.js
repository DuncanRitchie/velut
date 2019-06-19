const router = require('express').Router();
const wordRoutes = require('./word-routes');
const path = require('path');

// API routes
router.use('/api/words', wordRoutes);

// If no API routes are met, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
