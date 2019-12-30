const router = require('express').Router();
const lemmataController = require('../controllers/lemmata-controller');

router
	.route('/count')
	.get(lemmataController.count)

router
	.route('/one/')
	.get(lemmataController.findOneLemma)

router
	.route('/english/:english')
	.get(lemmataController.findFromEnglish)

router
	.route('/id/:id')
	.get(lemmataController.findLemmaById)

router
	.route('/')
	.get(lemmataController.findLemmata)

module.exports = router;
