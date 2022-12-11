const db = require("./databaseManager/dbManager");
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
});
