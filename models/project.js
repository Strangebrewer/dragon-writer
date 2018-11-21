const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const projectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  link: { type: String, required: true },
  summary: String,
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "Subject"
  }],
  texts: [{
    type: Schema.Types.ObjectId,
    ref: "Text"
  }],
  order: String
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;