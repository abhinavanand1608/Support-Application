var app = angular.module("app");

app.service("TicketService", function () {
  this.saveUserStatus = function ($http, agent) {
    console.log(agent);
    return $http({
      method: "PUT",
      url: "http://localhost:8080/update/" + agent._id,
    });
  };
});
