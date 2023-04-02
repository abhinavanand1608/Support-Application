app.factory("TicketFactory", function () {
  function getAllTickets($http, companyNameId) {
    return $http({
      method: "GET",
      url: "http://localhost:8080/ticket/viewTicket/" + companyNameId,
    });
  }
  function addCommentDetails(comment, $http) {
    console.log(comment);
    return $http({
      method: "POST",
      url: "http://localhost:8080/comment/addComment",
      data: comment,
    });
  }
  function viewCommentDetails($http, userId) {
    console.log(userId);
    return $http({
      method: "GET",
      url: "http://localhost:8080/comment/viewComment/" + userId,
    });
  }
  function saveEscalatedUserStatus($http, ticketDetails){
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
  }

  function saveResolvedUserStatus($http, ticketDetails) {
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
  }
  return {
    getAllTickets: getAllTickets,
    addCommentDetails: addCommentDetails,
    viewCommentDetails: viewCommentDetails,
    saveEscalatedUserStatus: saveEscalatedUserStatus,
    saveResolvedUserStatus: saveResolvedUserStatus,
  };
});
