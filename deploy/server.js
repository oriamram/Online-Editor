const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const db = require("./databaseManager/dbManager");
const path = require("path");
const http = require("http");
const axios = require("axios");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

///////////////////////////////////////////////////////////////////////// socket

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: "*",
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
		await axios.put("https://online-coding-oriamram.herokuapp.com/update_codeBlock", { title, changedCode: editorValue });
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

///////////////////////////////////////////////////////////////////////////// server

app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());

app.use(express.static(path.join(__dirname + "/public")));

// app.get("/", async (req, res) => {
// 	res.send("server");
// });

//response with relevant codeBlock object
app.get("/get_codeBlock", async (req, res) => {
	res.send(await db.getCodeBlock(req.query.title));
});

//response with all codeBlock objects
app.get("/get_all_codeBlocks", async (req, res) => {
	res.send(await db.getAllCodeBlocks());
});

//add codeBlock to database
app.post("/add_codeBlock", async (req, res) => {
	await db.addCodeBlock({ title: req.body.title, initialCode: req.body.initialCode, solutionCode: req.body.solutionCode });
	res.sendStatus(204);
});

//update a codeBlock's changedBody
app.put("/update_codeBlock", async (req, res) => {
	res.sendStatus(await db.updateCodeBlock(req.body.title, req.body.changedCode));
});

// app.listen(PORT, () => {
// 	console.log("server is running");
// });

server.listen(PORT, () => {
	console.log("server online");
});
