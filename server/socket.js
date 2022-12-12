const axios = require("axios");
const io = require("socket.io")(4545, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

let users = {};

io.on("connection", (socket) => {
	const socketId = socket.id;
	console.log(socketId + " - connected");
	users[socketId] = "";
	socket.on("connectedToCodeBlock", (title) => {
		users[socketId] = title;
		socket.join(title);
		countSpectators(io, users, title);
	});
	socket.on("backAtHome", (lastCodeBlock) => {
		const room = lastCodeBlock;
		users[socketId] = "home";
		socket.leave(room);
		countSpectators(socket, users, lastCodeBlock);
	});
	socket.on("changeInEditor", async (title, editorValue) => {
		const room = title;
		await axios.put("http://localhost:4000/update_codeBlock", { title, changedCode: editorValue });
		socket.to(room).emit("changedCode", editorValue);
	});
	socket.on("disconnect", () => {
		const lastCodeBlockOfRemovedSocket = users[socketId];
		delete users[socketId];
		countSpectators(socket, users, lastCodeBlockOfRemovedSocket);
	});
});

function countSpectators(io, users, room) {
	io.to(room).emit("spectatorsCount", Object.values(users).filter((currentRoom) => currentRoom === room).length);
}

module.exports = { io };
