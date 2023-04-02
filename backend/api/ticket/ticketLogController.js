const ticketLog = require("../../models/ticketLog");

function getTicketLog(req, res) {
  ticketLog
    .find({
      "assignTo.userId": req.params.id,
      ticketStatus: "In Progress",
    })
    .then((result) => {
      console.log("result is", result);
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
}

module.exports = { getTicketLog };
