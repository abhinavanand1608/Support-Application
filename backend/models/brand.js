const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  typeOfUser: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Brand", brandSchema);
