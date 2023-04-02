const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ticket: {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ticketSubject: {
      type: String,
    },
  },
  commentText: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
