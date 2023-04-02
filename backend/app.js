const express = require("express");
const User = require("./models/user");
const bodyParser = require("body-parser");
const superAdminRoutes = require("./api/superAdmin/brandRoutes");
const agentRoutes = require("./api/agent/agentRoutes");
const ticketRoutes = require("./api/ticket/ticketRoutes");
const loginRoutes = require("./api/login/loginRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const viewRoutes = require("./api/ticket/viewRoutes");
const updateRoutes = require("./api/ticket/updateRoutes");
const commentRoutes = require("./api/comment/commentRoutes");
const viewAgentRoutes = require("./api/agent/viewAgentRoutes");
const ticketDetailsRoutes = require("./api/ticket/ticketDetailsRoutes");
const ticketStatusRoutes = require("./api/ticket/ticketStatusRoutes");
const ticketAssignedRoutes = require("./api/ticket/ticketAssignedRoutes");
const ticketEscalatedRoutes = require("./api/ticket/ticketEscalatedRoutes");
const ticketLogRoutes = require("./api/ticket/ticketLogRoutes");
const updateCloseRoutes = require("./api/ticket/updateCloseRoutes");
const updateSolvedStatusRoutes = require("./api/ticket/updateSolvedStatusRoutes")
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const uploadFile = require("../backend/S3/s3");

// const isAuth = require("./middleware/is-auth");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

io.on("connection", (socket) => {
  // ...
});

app.io = io;

mongoose.connect(
  "mongodb+srv://abhinav007:abhinav007@cluster0.aoazbgz.mongodb.net/?retryWrites=true&w=majority"
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

User.findOne({ typeOfUser: "SuperAdmin" }, {})
  .then((superAdmin) => {
    if (superAdmin != null) {
      console.log(superAdmin);
    } else {
      var salt = bcrypt.genSaltSync(10);
      const newSuperAdmin = new User({
        firstName: "Super",
        lastName: "Admin",
        userName: "superadmin123",
        phone: 2333434,
        email: "superadd123@email.com",
        password: bcrypt.hashSync("superaddmin", salt),
        typeOfUser: "SuperAdmin",
      });

      newSuperAdmin
        .save()
        .then((savedAdmin) => {
          console.log(savedAdmin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .catch((err) => console.log(err));

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

app.post("/uploadImage", upload.single("image"), function (req, res, next) {
  const file = req.file;
  if (!file) {
    res.send("File not converted");
  }

  uploadFile(file)
    .then(function (result) {
      console.log("respose from aws is " + result);
      res.send(result);
    })
    .catch((err) => {
      console.log("error occurred", err);
    });
});

app.use("/brand", superAdminRoutes); //Creating Brands
app.use("/agent", agentRoutes); //Creating Agents
app.use("/ticket", ticketRoutes); //Creating Tickets
app.use("/delete", deleteRoutes); //Deleting Items
app.use("/view", viewRoutes); //Viewing each ticket
app.use("/update", updateRoutes); //Updating Data
app.use("/comment", commentRoutes); //Comments Routes
app.use("/viewAgent", viewAgentRoutes); //Viewing Agents
app.use("/ticketDetail", ticketDetailsRoutes); //Viewing Ticket Details
app.use("/ticketStatus", ticketStatusRoutes); //ticketStatusRoutes
app.use("/ticketAssigned", ticketAssignedRoutes); //ticketAssignedRoutes
app.use("/ticketEscalated", ticketEscalatedRoutes); //ticketEscalatedRoutes
app.use("/ticketLog", ticketLogRoutes); //ticketLogRoutes
app.use("/updateClose", updateCloseRoutes); //Updating TicketLogs on clicking close button
app.use("/updateSolvedStatus", updateSolvedStatusRoutes); //Updating Ticket Solved Status

app.use("/loginForm", loginRoutes); //Login Routes

// app.listen(8080);
httpServer.listen(8080);
