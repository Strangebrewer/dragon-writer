const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const subjectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  projectId: { type: Schema.Types.ObjectId },
  image: String,
  largeImage: String,
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