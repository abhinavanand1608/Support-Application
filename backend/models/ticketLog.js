const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketLogSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  assignTo: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    isAccepted: {
      type: String,
      default: null,
    },
  },
  ticketSolvedStatus: {
    type: String,
  },
  escalatedTo: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  resolvedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  
  ticketStatus: {
    type: String,
  },

  ticketSubject: {
    type: String,
  },

  createdAt: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("ticketLog", ticketLogSchema);
