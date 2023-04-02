const ticketLog = require("../../models/ticketLog");

function updateStatus(req, res) {
  ticketLog
    .findOneAndUpdate(
      { ticketId: req.params.ticketId },
      {
        $set: {
          ticketSolvedStatus: req.body.ticketSolvedStatus,
        },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).send(result);
      // console.log('status  ',result);
    });
}

module.exports = { updateStatus };
