const express = require("express");
const brandController = require("../brand/brandController");

const Router = express.Router();

//ADD AGENT
Router.post("/addAgent", brandController.addAgent);

//VIEW ALL AGENTS
Router.get("/viewAgent/:id", brandController.viewAgent);

module.exports = Router;
