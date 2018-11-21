const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const textOrderSchema = new Schema({
  // fields here
  order: String,
  project: String,
  subject: String
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const TextOrder = mongoose.model('TextOrder', textOrderSchema);

module.exports = TextOrder;