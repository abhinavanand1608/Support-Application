const express = require("express");
const Router = express.Router();
const loginController = require("./authController");

Router.post("/login", loginController.login);

module.exports = Router;
