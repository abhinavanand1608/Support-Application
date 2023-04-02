const express = require("express");
const Router = express.Router();
const ticketEscalatedController = require("./ticketEscalatedController");

Router.post("/:id", ticketEscalatedController.ticketEscalated);

module.exports = Router;
