// Express docs: http://expressjs.com/en/api.html
const express = require('express');
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport');

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

// INDEX
// GET /orders
router.get('/orders', requireToken, (req, res) => {
  Order.find()
    .then(orders => {
      // `orders` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return orders.map(order => order.toObject());
    })
    // respond with status 200 and JSON of the orders
    .then(orders => res.status(200).json({ orders: orders }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

// SHOW
// GET /orders/5a7db6c74d55bc51bdf39793
router.get('/orders/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Order.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "order" JSON
    .then(order => res.status(200).json({ order: order.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

// CREATE
// POST /orders
router.post('/orders', requireToken, (req, res) => {
  // set owner of new order to be current user
  req.body.order.owner = req.user.id;

  console.log(Object.keys(req.body.order), Object.keys(req.body.order).length);

  if (Object.keys(req.body.order).length !== 4) {
    console.log('fail order not 4');
    res.status(422).json({ message: 'fail order not 4' });
  }
  if (Object.keys(req.body.order.items).length < 1) {
    console.log('fail items not there');
    res.status(422).json({ message: 'fail order not 4' });
    // return
  }
  const colsInEachItem = req.body.order.items.map(item => Object.keys(item).length === 2)
  if (colsInEachItem.some(item => item === false)) {
    res.status(422).json({ message: 'hey hi nice to meet you' });
  }

  Order.create(req.body.order)
    // respond to succesful `create` with status 201 and JSON of new "order"
    .then(order => {
      res.status(201).json({ order: order.toObject() });
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res));
})

// UPDATE
// PATCH /orders/5a7db6c74d55bc51bdf39793
router.patch('/orders/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.order.owner;

  Order.findById(req.params.id)
    .then(handle404)
    .then(order => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, order);

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.order).forEach(key => {
        if (req.body.order[key] === '') {
          delete req.body.order[key];
        }
      });

      // pass the result of Mongoose's `.update` to the next `.then`
      return order.update(req.body.order);
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

// DESTROY
// DELETE /orders/5a7db6c74d55bc51bdf39793
router.delete('/orders/:id', requireToken, (req, res) => {
  Order.findById(req.params.id)
    .then(handle404)
    .then(order => {
      // throw an error if current user doesn't own `order`
      requireOwnership(req, order);
      // delete the order ONLY IF the above didn't throw
      order.remove();
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

module.exports = router;
