const db = require("./databaseManager/dbManager");
const axios = require("axios");
const io = require("socket.io")(4545, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

let codeBlocksUses = {};

(async function addCodeBlocks() {
	(await db.getAllCodeBlocks()).forEach((codeBlock) => (codeBlocksUses[codeBlock.title] = 0));
})();

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("connectedToCodeBlock", (title) => {
		codeBlocksUses[title] += 1;
	});
	socket.on("backAtHome", (lastCodeBlock) => {
		codeBlocksUses[lastCodeBlock] -= 1;
	});
	socket.on("changeInEditor", async (title, editorValue) => {
		await axios.put("http://localhost:4000/update_codeBlock", { title, changedCode: editorValue });
		socket.broadcast.emit("changedCode", editorValue);
	});
});
