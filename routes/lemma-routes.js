const router = require('express').Router();
const lemmataController = require('../controllers/lemmata-controller');

router
	.route('/one/')
	.get(lemmataController.findOneLemma)

router
	.route('/')
	.get(lemmataController.findLemmata)

module.exports = router;
