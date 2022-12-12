const { Schema } = require("mongoose");

const codeBlockSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	initialCode: {
		type: String,
		required: true,
	},
	changedCode: String,
	solution: {
		type: String,
		required: true,
	},
});

module.exports = { codeBlockSchema };
