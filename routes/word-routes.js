const router = require('express').Router();
const wordsController = require('../controllers/words-controller');

router
	.route('/')
	.get(wordsController.findAll)
	// .post(wordsController.create)

router
	.route('/:id')
	.get(wordsController.findById)
	// .put(wordsController.update)
	// .delete(wordsController.remove)

module.exports = router;
