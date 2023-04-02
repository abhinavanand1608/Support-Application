const express = require("express");
const Router = express.Router();
const agentController = require("../agent/agentController");

Router.put("/decline/:ticketId/:userId", agentController.declineStatus);
Router.put("/accept/:ticketId/:userId", agentController.acceptStatus);

module.exports = Router;
