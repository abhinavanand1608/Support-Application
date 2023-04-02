const express = require("express");
const Router = express.Router();
const viewTicketDetailController = require("./viewTicketDetailController");

Router.get("/:id", viewTicketDetailController.viewTicketDetail);

module.exports = Router;
