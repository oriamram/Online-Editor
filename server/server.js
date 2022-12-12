const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const db = require("./databaseManager/dbManager");
const { io } = require("./socket");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ["http://localhost:4545", "http://app:3000"] }));
app.use(json());

app.get("/", async (req, res) => {
	res.send("server");
});

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

app.listen(PORT, () => {
	console.log("server is running");
});
