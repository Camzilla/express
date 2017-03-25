var router = require('express').Router()

// Add USERS Routes
router.use(require('./users'))

// Add prismic Routes
router.use(require('./prismic'))

module.exports = router
