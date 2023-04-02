app.service("AgentService", function () {
  function declineUserStatus($http, userId, ticketId) {
    return $http({
      method: "PUT",
      url:
        "http://localhost:8080/ticketStatus/decline/" + ticketId + "/" + userId,
      data: {
        assignTo: {
          isAccepted: "Declined",
        },
        ticketSolvedStatus: null,
      },
    });
  }

  function acceptUserStatus($http, userId, ticketId) {
    return $http({
      method: "PUT",
      url:
        "http://localhost:8080/ticketStatus/accept/" + ticketId + "/" + userId,
      data: {
        assignTo: {
          isAccepted: "Accepted",
        },
      },
    });
  }

  return {
    declineUserStatus: declineUserStatus,
    acceptUserStatus: acceptUserStatus,
  };
});
