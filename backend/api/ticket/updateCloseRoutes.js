const express = require("express");
const Router = express.Router();
const updateCloseController = require("./updateCloseController")

Router.put("/:ticketId", updateCloseController.closeButton)

module.exports = Router;