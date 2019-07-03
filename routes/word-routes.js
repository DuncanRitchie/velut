const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/count')
	.get(wordsController.count)

router
	.route('/lte:query')
	.get(wordsController.findAllWordsShorterThan)

router
	.route('/word/:query')
	.get(wordsController.findAllWord)

router
	.route('/:query')
	.get(wordsController.findAll)

router
	.route('/id/:id')
	.get(wordsController.findById)

router
	.route('/')
	.get(wordsController.findAll)

module.exports = router;
