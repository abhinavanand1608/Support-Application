const Agent = require("../../models/user");
const bcrypt = require("bcryptjs");

const Ticket = require("../../models/ticket");
exports.addAgent = (req, res, next) => {
  // const id = Date.now();

  const agentFirstName = req.body.firstName;
  const agentLastName = req.body.lastName;
  const agentUserName = req.body.userName;
  const agentPhone = req.body.phone;
  const agentEmailId = req.body.email;
  const agentPassword = req.body.password;

  var salt = bcrypt.genSaltSync(10);

  const agentDetails = new Agent({
    firstName: agentFirstName,
    lastName: agentLastName,
    userName: agentUserName,
    phone: agentPhone,
    email: agentEmailId,
    password: bcrypt.hashSync(agentPassword, salt),
    typeOfUser: "Agent",
    companyId: req.body.companyId,
  });
  Agent.findOne({ email: agentEmailId }).then((result) => {
    if (result) {
      res.send("Agent Already Exists !!");
    } else {
      agentDetails
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: "Agent Created Successfully !!",
            agentDetails: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

exports.viewAgent = (req, res, next) => {
  Agent.find({ companyId: req.params.id }).then((result) => {
    console.log(res);
    res.status(200).json({
      message: "These are all the agents !!",
      allAgents: result,
    });
  });
};

exports.createTicket = (req, res, next) => {
  // const ticketSubject = req.body.ticketSubject;
  // const ticketDescription = req.body.ticketDescription;
  // const ticketStatus = req.body.ticketStatus;
  // const ticketSource = req.body.ticketSource;
  // const reportedBy = req.body.reportedBy;

  const ticketDetails = new Ticket({
    // ticketStatus: req.body.ticketStatus,
    ticketSource: req.body.ticketSource,
    ticketType: req.body.ticketType,
    ticketSubject: req.body.ticketSubject,
    ticketDescription: req.body.ticketDescription,
    customerName: req.body.customerName,
    customerDetails: req.body.customerDetails,
    ticketImageUrl: req.body.ticketImageUrl,
    owner: req.body.owner,
    ticketStatus: req.body.ticketStatus,
    // companyId: req.body.companyId,
  });

  Ticket.findOne({ _id: req.body._id }).then((result) => {
    if (result) {
      res.send("Ticket Already Exists !!!");
    } else {
      ticketDetails
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: "Ticket Created Successfully",
            ticketDetails: result,
          });
        })
        .catch((err) => console.log(err));
    }
  });
};

exports.viewTicket = (req, res) => {
  Ticket.find({ owner: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "These are all the created tickets !!",
      allTickets: result,
    });
  });
};
