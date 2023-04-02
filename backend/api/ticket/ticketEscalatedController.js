const ticketLog = require("../../models/ticketLog");
// console.log(TicketLog)

exports.ticketEscalated = (req, res) => {
  // console.log("ticket data", req.body.ticketData);
  const ticketAssignDetails = new ticketLog({
    owner: req.body.owner,
    ticketId: req.body.ticketId,
    escalatedTo: {
      userId: req.body.escalatedTo.userId,
      userName: req.body.escalatedTo.userName,
      userEmail: req.body.escalatedTo.userEmail,
    },
    ticketStatus: req.body.ticketStatus,
  });

  ticketAssignDetails.save();
  return res.json("Successfully donee");
};
