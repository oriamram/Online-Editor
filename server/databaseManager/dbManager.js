const mongoose = require("mongoose");
const { codeBlockSchema } = require("./schemas");

const URI = `mongodb+srv://user:123@mongoprojects.eaei3e7.mongodb.net/online-editor?retryWrites=true&w=majority`;

class dbManager {
	constructor() {
		mongoose.connect(process.env.DB_URL || URI, async () => {
			console.log("connected to db");
		});
		this.codeBlock = mongoose.model("code-blocks", codeBlockSchema);
	}

	async addCodeBlock({ title, initialCode }) {
		try {
			await this.codeBlock.create({
				title,
				initialCode,
				changedCode: initialCode,
			});
		} catch (e) {
			console.log("cant add that to database");
		}
	}

	async getAllCodeBlocks() {
		return await this.codeBlock.find();
	}

	async getCodeBlock(title) {
		return await this.codeBlock.findOne({ title });
	}
}

module.exports = dbManager;
