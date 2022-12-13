const axios = require("axios");

const io = require("socket.io")(4545, {
	cors: {
		origin: "*",
	},
});

//users object to keep track
let users = {};

io.on("connection", (socket) => {
	const socketId = socket.id;
	console.log(socketId + " - connected");
	users[socketId] = ""; //add user to users object

	//when user enters to a codeBlock page
	socket.on("connectedToCodeBlockPage", (title) => {
		users[socketId] = title;
		socket.join(title);
		countSpectators(io, users, title);
	});
	//when user is back at home page
	socket.on("backAtHome", (lastCodeBlock) => {
		users[socketId] = "home";
		socket.leave(lastCodeBlock);
		countSpectators(socket, users, lastCodeBlock);
	});
	//when user changes the editor content
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

//send to all users in a room the number of spectators
function countSpectators(io, users, room) {
	io.to(room).emit("spectatorsCount", Object.values(users).filter((currentRoom) => currentRoom === room).length);
}

module.exports = { io };
