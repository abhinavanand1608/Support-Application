const Ticket = require("../../models/ticket");

exports.updateData = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  if (req.body.assignTo != null) {
    Ticket.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          assignTo: {
            userId: req.body.assignTo.userId,
            userName: req.body.assignTo.userName,
            userEmail: req.body.assignTo.userEmail,
          },

          ticketStatus: req.body.ticketStatus,
          ticketSubject: req.body.ticketSubject,
        },
      },
      { new: true }
    )
      .then(function (result) {
        // req.app.io.sockets.emit(result.assignTo.userId, {
        //   ticketId: result._id,
        //   ticketSubject: result.ticketSubject,
        // });
        // console.log("result is  ", result);
        res.status(200).json({
          updatedStatus: result,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (req.body.escalatedTo != null) {
    Ticket.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          escalatedTo: {
            userId: req.body.escalatedTo.userId,
            userName: req.body.escalatedTo.userName,
            userEmail: req.body.escalatedTo.userEmail,
          },
          ticketStatus: req.body.ticketStatus,
        },
      },
      { new: true }
    )
      .then(function (result) {
        res.status(200).json({
          updatedStatus: result,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (req.body.resolvedBy != null) {
    Ticket.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          resolvedBy: {
            userId: req.body.resolvedBy.userId,
            userName: req.body.resolvedBy.userName,
            userEmail: req.body.resolvedBy.userEmail,
          },
          ticketStatus: req.body.ticketStatus,
        },
      },
      { new: true }
    )
      .then(function (result) {
        res.status(200).json({
          updatedStatus: result,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    Ticket.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ticketStatus: req.body.ticketStatus,
        },
      },
      { new: true }
    )
      .then(function (result) {
        res.status(200).json({
          updatedStatus: result,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};
