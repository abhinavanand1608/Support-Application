const express = require("express");
const Router = express.Router();
const commentController = require("./commentController");

//Adding Comments
Router.post("/addComment", commentController.addComment);

//View Comments
Router.get("/viewComment/:id", commentController.viewComment);

module.exports = Router;
