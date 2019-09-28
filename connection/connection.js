// Connect to Mongo database
const mongoose = require('mongoose');

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, MONGODB_URI } = process.env;

const uri = MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/writing_tool?retryWrites=true`;

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