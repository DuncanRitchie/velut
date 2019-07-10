const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/count')
	.get(wordsController.count)

router
	.route('/lte/:query')
	.get(wordsController.findWordsShorterThan)

router
	.route('/alph/:query')
	.get(wordsController.findWordsAlphabetical)

router
	.route('/class/:query')
	.get(wordsController.findWordsClassical)

router
	.route('/:query')
	.get(wordsController.findWordsClassical)

router
	.route('/one/:query')
	.get(wordsController.findOneWord)

router
	.route('/id/:id')
	.get(wordsController.findById)

router
	.route('/')
	.get(wordsController.findWordsAlphabetical)

module.exports = router;
