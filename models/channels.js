var mongoose = require('mongoose');
// MONGOOSE MODEL CONFIG

var channelsSchema = new mongoose.Schema({
	auther: String,
	title: String,
	body: String,
	Field1: String,
	value1: String,
	Field2: String,
	value2: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Channel", channelsSchema);
