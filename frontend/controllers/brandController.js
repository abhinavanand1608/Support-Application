app.controller(
  "brandController",
  function (
    $scope,
    $state,
    $rootScope,
    $http,
    BrandFactory,
    TicketFactory,
    socketFactory
  ) {
    $scope.userLoggedInId = JSON.parse(localStorage.getItem("BrandAdmin"));
    $scope.showTick = false;
    $scope.selectedValue = null;
    // $scope.subjectOfTicket = null;
    $scope.assignToUser = function (agent) {
      console.log("Inside Func");
      // $scope.selectedValue = agent;
      $scope.selectedValue = JSON.parse(agent);
      console.log($scope.selectedValue);
      if (agent) {
        console.log("assigned");
        $scope.showTick = true;
      }
    };
    // console.log($scope.name.nameOfUser);
    var companyNameId = JSON.parse(localStorage.getItem("BrandAdmin")).userId;
    $scope.agentsArray = [];
    BrandFactory.getAllAgents($http, companyNameId).then(function (response) {
      $scope.agents = response.data.allAgents;
      $scope.agentsArray = $scope.agents;

      console.log("All Agents ", $scope.agents);
    });

    $scope.ticketsArray = [];
    TicketFactory.getAllTickets($http, companyNameId).then(function (response) {
      $scope.tickets = response.data.allTickets;
      $scope.tickedId = $scope.tickets._id;

      $scope.ticketsArray = $scope.tickets;

      console.log("All Tickets ", $scope.tickets);
    });

    console.log("In add agent and add ticket controller");
    $scope.addAgentDetails = function () {
      // var agentFname = $scope.addAgent.fname;
      // var agentLname = $scope.addAgent.lname;
      // var agentUserName = $scope.addAgent.userName;
      // var agentPhone = $scope.addAgent.phone;
      // var agentEmail = $scope.addAgent.email;
      // var agentPassword = $scope.addAgent.password;
      uploadImage($scope.imageUpload, $http)
        .then(function (result) {
          $scope.addAgent.imageUrl = result.data.Location;
          $scope.addAgent.typeOfUser = "Agent";
          $scope.addAgent.companyId = companyNameId;
          BrandFactory.addAgentDetails($scope.addAgent, $http)
            .then(function (response) {
              if (response.status != 200) {
                throw new Error("HTTP Status " + response.status);
              }
              return response;
            })
            .then(function (response) {
              console.log(response);
              console.log(response.data.agentDetails);
              $scope.agents.push(response.data.agentDetails);
              // $(function () {
              //   $("#exampleModalling").modal("toggle");
              // });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    };


    $scope.addTicket = function () {
      var ticketSubject = $scope.ticketSubject;
      // $scope.subjectOfTicket = $scope.ticketSubject;
      // var ticketStatus =
      var ticketSource = $scope.ticketSource;
      var ticketType = $scope.ticketType;
      var ticketDescription = $scope.ticketDescription;
      var customerName = $scope.customerName;
      var customerDetails = $scope.customerDetails;

      uploadImage($scope.imageUpload, $http)
        .then(function (result) {
          $http({
            method: "POST",
            url: "http://localhost:8080/ticket/createTicket",
            data: {
              owner: companyNameId,
              ticketSubject: ticketSubject,
              ticketSource: ticketSource,
              ticketType: ticketType,
              ticketDescription: ticketDescription,
              customerName: customerName,
              customerDetails: customerDetails,
              ticketImageUrl: result.data.Location,
              ticketStatus: "Open",
            },
          })
            .then(function (response) {
              if (response.status != 200) {
                throw new Error("HTTP Status " + response.status);
              }
              return response;
            })
            .then(function (response) {
              console.log(response);
              console.log(response.data.ticketDetails);
              $scope.tickets.push(response.data.ticketDetails);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };

    $scope.viewTicketInfo = (ticket) => {
      $scope.assignedTicket = ticket;
      console.log($scope.assignedTicket);

      $state.go("ticket", {
        id: $scope.assignedTicket._id,
      });
    };

    $scope.saveUserStatus = function (ticket) {
      // console.log('ticket is   ', ticket)
      const ticketId = ticket._id;
      // const tickettttSubject = $scope.subjectOfTicket;
      // console.log("ticket Subject  ", tickettttSubject);
      // console.log(ticketId);

      console.log($scope.selectedValue);
      $http({
        method: "PUT",
        url: "http://localhost:8080/update/" + ticketId,
        data: {
          assignTo: {
            userId: $scope.selectedValue._id,
            userName: $scope.selectedValue.userName,
            userEmail: $scope.selectedValue.email,
          },

          ticketStatus: "In Progress",
          ticketSubject: ticket.ticketSubject,
        },
      })
        .then((result) => {
          console.log(result.data.updatedStatus);
          socketFactory.emit(result.data.assignTo.userId, result.data);
        })
        .catch((err) => {});
      
        $http({
          method: "POST",
          url: "http://localhost:8080/ticketAssigned/" + ticketId,
          data: {
            owner: $scope.userLoggedInId.userId,
            ticketId: ticketId,
            assignTo: {
              userId: $scope.selectedValue._id,
              userName: $scope.selectedValue.userName,
              userEmail: $scope.selectedValue.email,
            },

            ticketStatus: "In Progress",
            ticketSubject: ticket.ticketSubject,
          },
        });

      $scope.showTick = false;
    };

    $scope.logOut = function () {
      localStorage.clear();
      $state.go("login");
    };
  }
);

function uploadImage(file, $http) {
  const fd = new FormData();
  fd.append("image", file);
  console.log("insideUploadService", fd);
  return $http({
    method: "POST",
    url: "http://localhost:8080/uploadImage",
    data: fd,
    headers: { "Content-Type": undefined },
  });
}
//  imageUrl: result.data.Location,
