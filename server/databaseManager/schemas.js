const { Schema } = require("mongoose");

const userSchema = new Schema({
	name: String,
	age: Number,
});

module.exports = { userSchema };
