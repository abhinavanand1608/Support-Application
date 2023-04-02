const User = require("../../models/user");
const Brand = require("../../models/brand");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found !!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      var match = bcrypt.compare(password, user.password);
      console.log(match);
      return match;
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password !!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          nameOfUser: loadedUser.userName,
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          companyName: loadedUser.companyName,
          typeOfUser: loadedUser.typeOfUser,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      console.log(token);
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
