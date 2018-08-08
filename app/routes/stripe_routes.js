// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for stripes
const Stripe = require('../models/stripe')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /stripes
router.post('/stripes', requireToken, (req, res) => {
  // set owner of new stripe to be current user
  req.body.stripe.owner = req.user.id

  Stripe.create(req.body.stripe)
    // respond to succesful `create` with status 201 and JSON of new "stripe"
    .then(stripe => {
      res.status(201).json({ stripe: stripe.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

module.exports = router
