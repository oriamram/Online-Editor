const mongoose = require("mongoose");
const { codeBlockSchema } = require("./schemas");
require("dotenv").config();

class dbManager {
	constructor() {
		mongoose.connect(process.env.DB_URI, async () => {
			console.log("connected to db");
		});
		this.codeBlock = mongoose.model("code-blocks", codeBlockSchema);
	}

	//add a new codeBlock
	async addCodeBlock({ title, initialCode, solutionCode }) {
		try {
			await this.codeBlock.create({
				title,
				initialCode,
				changedCode: initialCode,
				solutionCode,
			});
		} catch (e) {
			console.log("cant add that to database");
		}
	}

	//returns all codeBlocks
	async getAllCodeBlocks() {
		return await this.codeBlock.find();
	}

	//returns a specific codeBlock
	async getCodeBlock(title) {
		return await this.codeBlock.findOne({ title });
	}

	//updates a codeBlock 'changesCode'
	async updateCodeBlock(title, changedCode) {
		try {
			await this.codeBlock.updateOne({ title }, { changedCode });
			return 204;
		} catch (e) {
			return 404;
		}
	}
}

const db = new dbManager();

module.exports = db;
