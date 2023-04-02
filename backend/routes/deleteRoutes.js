const express = require("express");
const Router = express.Router();
const deleteController = require("../controllers/deleteController")

//For deleting brands
Router.post("/brands/:id", deleteController.deleteBrand);



module.exports = Router;