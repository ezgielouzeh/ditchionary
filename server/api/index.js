const router = require('express').Router()
module.exports = router

//matches all requests to /api/users/
router.use('/users', require('./users'))

//404 Handler
//What if a user requests an API route that doesn't exist? For example, if we're serving up puppies, kittens and users, what if a user asks for /api/sloths?
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
