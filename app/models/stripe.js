const mongoose = require('mongoose')

const stripeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {

  timestamps: true
})

module.exports = mongoose.model('Stripe', stripeSchema)
