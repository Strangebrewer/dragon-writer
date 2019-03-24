// Connect to Mongo database
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// const uri = process.env.MONGODB_URI || 'mongodb://localhost/writing_tool';
const uri = process.env.MONGODB_URI || 'mongodb+srv://dangUser:dangUser@cluster0-rzvqk.mongodb.net/writing_tool?retryWrites=true';

mongoose.connect(uri).then(
	() => {
		/** ready. The `mongoose.connect()` promise resolves to undefined. */
		console.log('Connected to Mongo');
	},
	err => {
		/** handle initial connection error */
		console.log('error connecting to Mongo: ');
		console.log(err);
	}
);

module.exports = mongoose.connection;