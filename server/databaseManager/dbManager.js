const mongoose = require("mongoose");
const { userSchema } = require("./schemas");

class dbManager {
	constructor() {
		mongoose.connect(process.env.DB_URL || "mongodb://mongo:27017/users", async () => {
			console.log("connected to db");
		});
		this.userModel = mongoose.model("users", userSchema);
	}

	async addUser() {
		const newUser = await this.userModel.create({
			name: "ori",
			age: 21,
		});
		console.log(newUser);
	}

	async getAllUsers() {
		return await this.userModel.find({});
	}
}

module.exports = dbManager;
