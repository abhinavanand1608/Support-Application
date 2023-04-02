const express = require("express");
const Router = express.Router();
const viewAgentController = require("./viewAgentController");

Router.get("/agentDashboard/:id", viewAgentController.viewAgent);

module.exports = Router;
