const { Schema } = require("mongoose");

const codeBlockSchema = new Schema({
	title: String,
	initialCode: String,
});

module.exports = { codeBlockSchema };
