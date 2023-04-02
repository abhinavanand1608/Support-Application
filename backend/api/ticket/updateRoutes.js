const express = require("express");
const Router = express.Router();
const updateController = require("./updateController");

Router.put("/:id", updateController.updateData);

module.exports = Router;
