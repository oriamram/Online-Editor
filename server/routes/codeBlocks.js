const express = require("express");
const db = require("../databaseManager/dbManager");

const codeBlockRouter = express.Router();

//response with relevant codeBlock object
codeBlockRouter.get("/", async (req, res) => {
	const codeBlock = await db.getCodeBlock(req.query.title);
	if (codeBlock) res.send(codeBlock);
	else res.sendStatus(404);
});

//response with all codeBlock objects
codeBlockRouter.get("/all", async (req, res) => {
	res.send(await db.getAllCodeBlocks());
});

//add codeBlock to database
codeBlockRouter.post("/", async (req, res) => {
	await db.addCodeBlock({ title: req.body.title, initialCode: req.body.initialCode, solutionCode: req.body.solutionCode });
	res.sendStatus(204);
});

//update a codeBlock's changedBody
codeBlockRouter.put("/", async (req, res) => {
	res.sendStatus(await db.updateCodeBlock(req.body.title, req.body.changedCode));
});

module.exports = { codeBlockRouter };
