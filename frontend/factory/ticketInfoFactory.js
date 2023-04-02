app.service("TicketInfoFactory", function() {
    function viewTicketInfo($http, ticketId) {
        return $http({
          method: "GET",
          url: "http://localhost:8080/view/ticketInfo/" + ticketId,
        });
    }

    return {
      viewTicketInfo: viewTicketInfo,
    };
});