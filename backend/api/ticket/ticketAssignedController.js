const ticketLog = require("../../models/ticketLog");
// console.log(TicketLog)

exports.ticketAssign = (req, res) => {
  console.log("ticket data", req.body);
  const ticketAssignDetails = new ticketLog({
    owner: req.body.owner,
    ticketId: req.body.ticketId,
    assignTo: {
      userId: req.body.assignTo.userId,
      userName: req.body.assignTo.userName,
      userEmail: req.body.assignTo.userEmail,
      userAction: req.body.userAction,
    },
    ticketStatus: req.body.ticketStatus,
    ticketSubject: req.body.ticketSubject,
  });

  ticketAssignDetails.save();
  return res.json("Successfully donee");
};
