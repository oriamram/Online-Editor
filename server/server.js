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

app.get("/add", async (req, res) => {
	await db.addUser();
	res.send("added");
});

app.get("/get", async (req, res) => {
	res.send(await db.getAllUsers());
});

app.listen(PORT, () => {
	console.log("server is running");
});
