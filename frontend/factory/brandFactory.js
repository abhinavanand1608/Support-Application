app.service("BrandFactory", function () {
  function addAgentDetails(addAgent, $http) {
    return $http({
      method: "POST",
      url: "http://localhost:8080/agent/addAgent",
      data: addAgent,
    });
  }

  function getAllAgents($http, companyNameId) {
    return $http({
      method: "GET",
      url: "http://localhost:8080/agent/viewAgent/" + companyNameId,
    });
  }
  return {
    getAllAgents: getAllAgents,
    addAgentDetails: addAgentDetails,
  };
});
