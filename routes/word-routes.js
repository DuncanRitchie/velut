const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/count')
	.get(wordsController.count)

// router
// 	.route('/lte/')
// 	.get(wordsController.findWordsShorterThan)

router
	.route('/subwords/')
	.get(wordsController.findSubwords)

router
	.route('/anagrams/')
	.get(wordsController.findAnagrams)

router
	.route('/pattern/')
	.get(wordsController.findAdvanced)

router
	.route('/alph/')
	.get(wordsController.findWordsAlphabetical)

router
	.route('/class/')
	.get(wordsController.findWordsClassical)

router
	.route('/eccles/')
	.get(wordsController.findWordsEcclesiastical)

router
	.route('/')
	.get(wordsController.findWordsClassical)

router
	.route('/one/')
	.get(wordsController.findOneWord)

router
	.route('/id/')
	.get(wordsController.findById)

module.exports = router;
