app.controller(
  "ticketController",
  function (
    $scope,
    $rootScope,
    $state,
    $http,
    $stateParams,
    TicketInfoFactory,
    TicketFactory,
    BrandFactory,
    socketFactory
  ) {
    $scope.userLoggedInId = JSON.parse(localStorage.getItem("BrandAdmin"));
    $scope.userId = $stateParams.id;
    $scope.showEscalatedTick = false;
    $scope.showResolvedTick = false;
    $scope.selectedValue = null;
    $scope.assignToEscalatedUser = function (agent) {
      console.log("Inside Func");
      // $scope.selectedValue = agent;
      $scope.selectedValue = JSON.parse(agent);
      console.log($scope.selectedValue);
      if (agent) {
        console.log("assigned");
        $scope.showEscalatedTick = true;
      }
    };

    $scope.assignToResolvedUser = function (agent) {
      console.log("Inside Func");
      // $scope.selectedValue = agent;
      $scope.selectedValue = JSON.parse(agent);
      console.log($scope.selectedValue);
      if (agent) {
        console.log("assigned");
        $scope.showResolvedTick = true;
      }
    };
    var companyNameId = JSON.parse(localStorage.getItem("BrandAdmin")).userId;
    BrandFactory.getAllAgents($http, companyNameId).then(function (response) {
      $scope.agents = response.data.allAgents;
      $scope.agentsArray = $scope.agents;

      console.log("All Agents ", $scope.agents);
    });
    // console.log($scope.agen);
    // console.log("userid " + $scope.userId);
    TicketInfoFactory.viewTicketInfo($http, $scope.userId)
      .then(function (response) {
        // console.log(response.data);
        $scope.ticketDetails = response.data[0];
      })
      .catch(function (err) {
        console.log(err);
      });
    // TicketFactory.saveEscalatedUserStatus($http, ticketDetails)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // TicketFactory.saveResolvedUserStatus($http, ticketDetails)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    $scope.saveEscalatedUserStatus = function(ticketDetails) {
      const ticketId = ticketDetails._id;
      console.log(ticketId);
      // console.log($scope.selectedValue._id);
      $http({
        method: "PUT",
        url: "http://localhost:8080/update/" + ticketId,
        data: {
          escalatedTo: {
            userId: $scope.selectedValue._id,
            userName: $scope.selectedValue.userName,
            userEmail: $scope.selectedValue.email,
          },
        },
      });
      $http({
        method: "POST",
        url: "http://localhost:8080/ticketEscalated/" + ticketId,
        data: {
          owner: $scope.userLoggedInId.userId,
          ticketId: $scope.userId,
          escalatedTo: {
            userId: $scope.selectedValue._id,
            userName: $scope.selectedValue.userName,
            userEmail: $scope.selectedValue.email,
          },
          ticketStatus: ticketDetails.ticketStatus,
        },
      });
      $scope.showEscalatedTick = false;
    };

    $scope.saveResolvedUserStatus = function(ticketDetails) {
      const ticketId = ticketDetails._id;
      console.log(ticketId);
      $http({
        method: "PUT",
        url: "http://localhost:8080/update/" + ticketId,
        data: {
          resolvedBy: {
            userId: $scope.selectedValue._id,
            userName: $scope.selectedValue.userName,
            userEmail: $scope.selectedValue.email,
          },
          ticketStatus: "Closed",
        },
      });
      $scope.showResolvedTick = false;
    };

    $scope.closeTicket = function (ticketDetails) {
      const ticketId = ticketDetails._id;
      console.log('ticketId  ',ticketDetails)
      console.log(ticketId);
      $http({
        method: "PUT",
        url: "http://localhost:8080/update/" + ticketId,
        data: {
          ticketStatus: "Closed",
        },
        
      });

      $http({
        method: "PUT",
        url: "http://localhost:8080/updateClose/" + ticketId,
        data: {
          ticketStatus: "Closed",
          assignTo: {
            isAccepted: null,
          },
        },
      });
    };
    console.log("In add comment controller");
    // $scope.commentsArray = [];
    // TicketFactory.viewComment($http).then(function (response) {
    //   $scope.comments = response.data.allComments;
    //   $scope.commentsArray = $scope.comments;

    //   // let superAdminId = JSON.parse(localStorage.getItem("SuperAdmin")).userId;
    //   // console.log(superAdminId);
    //   console.log("All Comments ", $scope.comments);
    // });
    $scope.commentArray = [];
    $scope.viewAllComments = function () {
      TicketFactory.viewCommentDetails(
        $http,
        $scope.userLoggedInId.userId
      ).then(function (response) {
        $scope.commentss = response.data.allComments;
        console.log($scope.commentss);
        $scope.commentArray.push($scope.commentss);
        // console.log($scope.commentsArray);
      });
    };
    $scope.addComment = function (ticketDetails) {
      $scope.comment.userId = $scope.userLoggedInId.userId;
      const ticket = {
        ticketId: ticketDetails._id,
        ticketSubject: ticketDetails.ticketSubject,
      };
      $scope.comment.ticket = ticket;
      TicketFactory.addCommentDetails($scope.comment, $http)
        .then(function (response) {
          if (response.status != 200) {
            throw new Error("HTTP Status " + response.status);
          }
          return response;
        })
        .then(function (response) {
          console.log(response);
          console.log(response.data.commentDetails);

          $scope.commentss.push(response.data.commentDetails);
          console.log($scope.commentss);
          // $scope.comments.push(response.data.commentInfo);
          // $(function () {
          //   $("#exampleModalling").modal("toggle");
          // });
        })
        .catch((err) => console.log(err));
    };

    $scope.logOut = function () {
      localStorage.removeItem("BrandAdmin");
      localStorage.removeItem("accessToken");
      $state.go("login");
    };
  }
);
