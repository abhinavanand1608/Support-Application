const ticketLog = require("../../models/ticketLog");

function declineStatus(req, res) {
  console.log(req.body);
  ticketLog
    .findOneAndUpdate(
      { ticketId: req.params.ticketId, "assignTo.userId": req.params.userId },
      {
        $set: {
          "assignTo.isAccepted": "Declined",
          ticketSolvedStatus: req.body.ticketSolvedStatus,
        },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).send(result);
      // console.log('decline  ',result);
    });
}

function acceptStatus(req, res) {
  ticketLog
    .findOneAndUpdate(
      { ticketId: req.params.ticketId, "assignTo.userId": req.params.userId },
      {
        $set: {
          "assignTo.isAccepted": "Accepted",
        },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).send(result);
      console.log(result);
    });
}

module.exports = { declineStatus, acceptStatus };

// {
//     query: { _id: req.params.ticketId, "assignTo.userId": req.params.userId },
//     sort: { $natural: -1 },
//     update: {
//       $set: {
//         "assignTo.userAction": "Declined",
//       },
//     },
//     upsert: true,
//   }
