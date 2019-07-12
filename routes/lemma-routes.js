const router = require('express').Router();
const lemmataController = require('../controllers/lemmata-controller');

router
	.route('/one/')
	.get(lemmataController.findOneLemma)

router
	.route('/id/')
	.get(lemmataController.findLemmaById)

router
	.route('/')
	.get(lemmataController.findLemmata)

module.exports = router;
