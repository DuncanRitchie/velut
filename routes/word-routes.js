const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/count')
	.get(wordsController.count)

router
	.route('/lte/')
	.get(wordsController.findWordsShorterThan)

router
	.route('/alph/')
	.get(wordsController.findWordsAlphabetical)

router
	.route('/class/')
	.get(wordsController.findWordsClassical)

router
	.route('/')
	.get(wordsController.findWordsClassical)

router
	.route('/one/')
	.get(wordsController.findOneWord)

router
	.route('/id/')
	.get(wordsController.findById)

// router
// 	.route('/')
// 	.get(wordsController.findWordsAlphabetical)

module.exports = router;
