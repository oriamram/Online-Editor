const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const dbManager = require("./databaseManager/dbManager");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());

const db = new dbManager();

app.get("/", async (req, res) => {
	res.send("server");
});

//gets a body with {title:`...`} and returns the document
app.get("/get_code_block", async (req, res) => {
	res.send(await db.getCodeBlock(req.body.title));
});

//gets a body with {title , initialCode} and add to database
app.post("/add_code_block", async (req, res) => {
	await db.addCodeBlock({ title: req.body.title, initialCode: req.body.initialCode });
	res.sendStatus(204);
});

app.listen(PORT, () => {
	console.log("server is running");
});
