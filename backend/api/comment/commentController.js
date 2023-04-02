const Comment = require("../../models/comment");

function addComment(req, res) {
  const commentText = req.body.commentText;

  const commentDetails = new Comment({
    userId: req.body.userId,
    ticket: {
      ticketId: req.body.ticket.ticketId,
      ticketSubject: req.body.ticket.ticketSubject,
    },
    commentText: commentText,
  });

  Comment.findOne({ _id: req.body._id }).then((result) => {
    if (result) {
      res.send("Ticket Already Exists !!!");
    } else {
      commentDetails
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: "Comment Successfully Created",
            commentDetails: result,
          });
        })
        .catch((err) => console.log(err));
    }
  });
}

function viewComment(req, res) {
  Comment.find({ userId: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "These are all the comments !!",
      allComments: result,
    });
  });
}
module.exports = { addComment, viewComment };
