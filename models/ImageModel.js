const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  image: { type: String, required: true },
  largeImage: String,
  midImage: String,
  thumbnail: String,
  publicId: String,
  title: String,
  caption: String,
  texts: [{
    type: Schema.Types.ObjectId,
    ref: "Text"
  }]
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;