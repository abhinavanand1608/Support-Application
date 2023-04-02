const ticketLog = require("../../models/ticketLog");

function closeButton(req, res) {
  ticketLog
    .findOneAndUpdate(
      { ticketId: req.params.ticketId },
      {
        $set: {
          ticketStatus: "Closed",
        },
      },
      { new: true }
    )
    .then((result) => {
      res.status(200).send(result);
      // console.log('close  ',result);
    });;
}

module.exports = { closeButton };
