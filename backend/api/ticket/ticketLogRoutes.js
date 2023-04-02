const express = require("express");
const Router = express.Router();
const ticketLogController = require("./ticketLogController")

Router.get("/:id", ticketLogController.getTicketLog);

module.exports = Router;
