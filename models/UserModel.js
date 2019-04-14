const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const tempPw = bcrypt.hashSync("BootsNPants", bcrypt.genSaltSync(10), null);

const userSchema = new Schema({
	username: { type: String, required: true },
	url: String,
	password: { type: String, required: true, default: tempPw },
	email: String,
	order: String,
  image: String,
  imageId: String,
  largeImage: String,
  midImage: String,
  thumbnail: String,
  publicId: String,
	projects: [{
		type: Schema.Types.ObjectId,
		ref: "Project"
	}],
	images: [{
		type: Schema.Types.ObjectId,
		ref: 'Image'
	}]
},
	{
		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;