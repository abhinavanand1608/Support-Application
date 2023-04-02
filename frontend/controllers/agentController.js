app.controller(
  "agentController",
  function ($scope, $state, $rootScope, $http, socketFactory, AgentService) {
    $scope.userLoggedInId = JSON.parse(localStorage.getItem("Agent"));
    $scope.showTicketStatus = false;
    $scope.selectedValue = null;
    $scope.currentStatus = function (status) {
      console.log("Inside current status function!!");
      $scope.selectedValue = status;
      // console.log($scope.selectedValue);
      if (status) {
        $scope.showTicketStatus = true;
      }
    };

    $scope.setTicketStatus = function (data) {
      const ticketId = data.ticketId;
      $http({
        method: "PUT",
        url: "http://localhost:8080/updateSolvedStatus/" + ticketId,
        data: {
          ticketSolvedStatus: $scope.selectedValue,
        },
      });
      $scope.showTicketStatus = false;
    };
    // $scope.selectedTicketId;
    $scope.allData = [];
    // getAllData.getAllTicketDetails()
    $http({
      method: "GET",
      url: "http://localhost:8080/ticketLog/" + $scope.userLoggedInId.userId,
    })
      .then((result) => {
        console.log(result.data);
        $scope.allData = result.data;
        console.log($scope.allData);
      })
      .catch((err) => {});

    $scope.acceptStatus = function (data) {
      $scope.activated = true;
      if ($scope.activated == true) {
        $scope.hideButton = true;
      }
      AgentService.acceptUserStatus(
        $http,
        $scope.userLoggedInId.userId,
        data.ticketId
      )
        .then()
        .catch();
    };

    $scope.declineStatus = function (data) {
      // const index = $scope.allData.findIndex((obj) => obj.id === data.id);
      // if (index !== -1) {
      //   $scope.allData.splice(index, 1);
      // }
      $scope.notActivated = true;
      if ($scope.notActivated == true) {
        $scope.hideButton = true;
      }
      AgentService.declineUserStatus(
        $http,
        $scope.userLoggedInId.userId,
        data.ticketId
      )
        .then()
        .catch();
    };

    socketFactory.on($scope.userLoggedInId.userId, function (data) {
      $scope.$apply(function () {
        // $scope.data = data;

        $scope.allData.push(data);
      });
      console.log("data is ", data);
      // $scope.selectedTicketId = data.ticketId;
      // console.log("selected ticket is  ", $scope.selectedTicketId);
    });

    $scope.logOut = function () {
      localStorage.removeItem("Agent");
      localStorage.removeItem("accessToken");
      $state.go("login");
    };
  }
);
