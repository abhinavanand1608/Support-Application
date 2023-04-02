const Ticket = require("../../models/ticket");

function viewAgent(req, res) {
  //   console.log("Hello");
  Ticket.find({ userId: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = { viewAgent };
