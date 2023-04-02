const express = require("express");
const superAdminController = require("./superAdminController");

const Router = express.Router();

//ADD BRAND
Router.post("/addBrand", superAdminController.addBrand);

//VIEW ALL BRANDS
Router.get("/viewBrand", superAdminController.viewBrand);

module.exports = Router;

//passport.authenticate("jwt", { session: false }),
