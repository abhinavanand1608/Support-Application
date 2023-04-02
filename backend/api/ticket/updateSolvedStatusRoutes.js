const express = require("express");
const Router = express.Router();
const updateSolvedStatusController = require("./updateSolvedStatusController")

Router.put("/:ticketId", updateSolvedStatusController.updateStatus);

module.exports = Router;