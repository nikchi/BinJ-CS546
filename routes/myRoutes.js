const express = require('express');
const router = express.Router();
const xss = require('xss');
const data = require('../data/index');

router.get("/", (req, res) => {
	res.render("list", {pageTitle: "All Notes", notes: data.getAll() });
});

router.post("/", function (req, res) {
    //console.log(request.body);
	data.makeNote(req.body.title, req.body.dueDate, xss(req.body.summary), xss(req.body.body));
    //response.json({ success: true, message: xss(request.body.description) });
	let id = data.getCurrId();
	//console.log(id);
	res.json({success: true, newId: id });
});

router.get("/new", (req, res) => {
	res.render("form", {pageTitle: "New Note"});
});

router.post("/next", (req, res) => {
	let lastId = req.body.lastId;
	let next = data.getNext(lastId);
	//console.log(next);
	//console.log(lastId);
	res.json({note: next});
});

router.get("/:note", (req, res) => {
	let id = parseInt(req.params.note);
	res.render("single", {note: data.getNote(id)/*, next: data.getNextNote(id) */});
});

module.exports = router;