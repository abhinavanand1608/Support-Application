const express = require("express");
const Router = express.Router();
const brandController = require("../brand/brandController");

//Add Tickets
Router.post("/createTicket", brandController.createTicket);

//View Tickets
Router.get("/viewTicket/:id", brandController.viewTicket);

module.exports = Router;
