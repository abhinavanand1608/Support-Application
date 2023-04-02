var app = angular.module("app", ["ui.router"]);

app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("superAdmin", {
        url: "/superAdmin",
        templateUrl: "views/superAdmin.html",
        controller: "superAdminController",
      })
      .state("login", {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "loginController",
      })
      .state("brand", {
        url: "/brandAdmin",
        templateUrl: "views/brand.html",
        controller: "brandController",
      })
      .state("ticket", {
        url: "/ticket/:id",
        templateUrl: "views/ticket.html",
        controller: "ticketController",
      })
      .state("agent", {
        url: "/agent",
        templateUrl: "views/agent.html",
        controller: "agentController",
      });
      
    // .state("agent", {
    //   templateUrl: "views/agent.html",
    //   controller: "agentController",
    // })
    $urlRouterProvider.otherwise("login");
  },
  
]);

app.directive("fileModel", [
    "$parse",
    function ($parse) {
      return {
        restrict: "A",
        link: function (scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind("change", function () {
            scope.$apply(function () {
              modelSetter(scope, element[0].files[0]);
            });
          });
        },
      };
    },
  ]);
