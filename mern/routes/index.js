const router = require('express').Router()
const wordRoutes = require('./word-routes')
const lemmaRoutes = require('./lemma-routes')
const path = require('path')

// API routes
router.use('/api/words', wordRoutes)
router.use('/api/lemmata', lemmaRoutes)

// If no API routes are met, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router
