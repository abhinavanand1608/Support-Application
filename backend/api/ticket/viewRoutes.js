const express = require("express");
const Router = express.Router();
const viewTicketInfo = require("./ticketController");

Router.get("/ticketInfo/:id", viewTicketInfo);

// console.log("Hi");
module.exports = Router;
