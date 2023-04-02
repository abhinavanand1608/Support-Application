const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
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
    userAction: {
      type: String,
    },
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
  ticketSource: {
    type: String,
  },
  ticketType: {
    type: String,
  },
  ticketSubject: {
    type: String,
  },
  ticketDescription: {
    type: String,
  },
  ticketImageUrl: {
    type: String,
  },
  customerName: {
    type: String,
  },
  customerDetails: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
