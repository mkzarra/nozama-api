const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
    },
    quantity: {
    type: Number,
    required: true
  }
}],
  total: {
    type: Number,
    required: true
  },
  submitted: {
    type: Boolean,
    required: true
  }
}, {
    timestamps: true
  })

module.exports = mongoose.model('Order', orderSchema)