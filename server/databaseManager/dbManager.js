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

	async addCodeBlock() {
		await this.codeBlock.create({
			title: "async func",
			initialCode: `function test(){
				let a = 1
			}`,
		});
	}
}

module.exports = dbManager;
