const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/count')
	.get(wordsController.count)

router
	.route('/lte/:query')
	.get(wordsController.findWordsShorterThan)

router
	.route('/one/:query')
	.get(wordsController.findOneWord)

router
	.route('/alph/:query')
	.get(wordsController.findWordsAlphabetical)

router
	.route('/:query')
	.get(wordsController.findWordsClassical)

router
	.route('/id/:id')
	.get(wordsController.findById)

router
	.route('/')
	.get(wordsController.findWordsAlphabetical)

module.exports = router;
