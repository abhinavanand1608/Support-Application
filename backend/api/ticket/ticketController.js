const Ticket = require("../../models/ticket");

function viewTicketInfo(req, res) {
  //   console.log("Hello");
  Ticket.find({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = viewTicketInfo;
