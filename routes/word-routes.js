const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/')
	.get(wordsController.findAll)

router
	.route('/:query')
	.get(wordsController.findAll)

router
	.route('/id/:id')
	.get(wordsController.findById)

module.exports = router;
