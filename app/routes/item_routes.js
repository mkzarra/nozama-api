// Express docs: http://expressjs.com/en/api.html
const express = require('express');

// pull in Mongoose model for items
const Item = require('../models/item');

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler');

// this file is a collection of methods that help us detect situations when we need
// to throw a custom error
const { handle404 } = require('../../lib/custom_errors');
// we'll use this function to send 404 when non-existant document is requested

// instantiate a router (mini app that only handles routes)
const router = express.Router();

// INDEX
// GET /items
router.get('/items', (req, res) => {
  Item.find()
    .then(items => {
      // `items` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return items.map(item => item.toObject());
    })
    // respond with status 200 and JSON of the items
    .then(items => res.status(200).json({ items: items }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

// SHOW
// GET /items/5a7db6c74d55bc51bdf39793
router.get('/items/:id', (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Item.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "item" JSON
    .then(item => res.status(200).json({ item: item.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res));
});

module.exports = router;
