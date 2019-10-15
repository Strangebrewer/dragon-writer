const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  projectId: { type: Schema.Types.ObjectId },
  image: String,
  imageId: String,
  largeImage: String,
  midImage: String,
  thumbnail: String,
  published: { type: Boolean, default: false },
  publicId: String,
  subject: String,
  theme: String,
  texts: [{
    type: Schema.Types.ObjectId,
    ref: "Text"
  }]
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;