const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  projectId: { type: Schema.Types.ObjectId },
  subjectId: { type: Schema.Types.ObjectId },
  image: String,
  largeImage: String,
  publicId: String,
  text: { type: String, required: true },
  title: { type: String, required: true },
  thesis: { type: String, required: true },
  errant: { type: Boolean, default: true }
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const Text = mongoose.model('Text', textSchema);

module.exports = Text;