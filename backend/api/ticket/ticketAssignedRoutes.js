const express = require("express");
const Router = express.Router();
const ticketAssignedController = require("./ticketAssignedController");

Router.post("/:id", ticketAssignedController.ticketAssign);

module.exports = Router;
