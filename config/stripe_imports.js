const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY
const keySecret = process.env.STRIPE_SECRET_KEY

const app = require('express')
const stripe = require('stripe')(keySecret)

app.set('view engine', 'pug')
app.use(require('body-parser').urlencoded({ extended: false }))
app.get('/', (req, res) =>
  res.render('index.pug', { keyPublishable }))
  
app.post('/charge', (req, res) => {
  let amount = 500

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'sample charge',
        currency: 'usd',
        customer: customer.id
      }))
})
