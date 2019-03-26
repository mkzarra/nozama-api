// Express docs: http://expressjs.com/en/api.html
const express = require('express');
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport');

// Stripe docs: https://stripe.com/docs/api/charges
const stripe = require(stripe)(process.env.STRIPE_SECRET_KEY);

// pull in Mongoose model for orders
const Order = require('../models/order');

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler');

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const { handle404, requireOwnership } = require('../../lib/custom_errors');
// we'll use handle404 to send 404 when non-existant document is requested
// we'll use requireOwnership to send 401 when a user tries to modify a resource
// that's owned by someone else

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();

router.post('/checkout', requireToken, async (req, res) => {
  console.log(req.body);
  const charge = await stripe.charges.create({
    amount: '',
    currency: 'usd',
    description: '',
    source: req.body.stripeToken
  });
  console.log(charge);
});

module.exports = router;