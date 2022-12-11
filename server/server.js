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
	db.addCodeBlock();
	res.send("server");
});

app.listen(PORT, () => {
	console.log("server is running");
});
