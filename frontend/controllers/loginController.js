function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

app.controller("loginController", function ($scope, $state, $rootScope, $http) {
  
  // $scope.superAdmin;
  $scope.submit = function(){
    // console.log("1111");
    let userNameEmail = $scope.login.name;
    let password = $scope.login.password;

    // console.log(userNameEmail);
    $http({
      method: "POST",
      url: "http://localhost:8080/loginForm/login",
      data: {
        email: userNameEmail,
        password: password,
      },
    })
      .then(function (response) {
        if (response.status != 200) {
          throw new Error("HTTP Status " + response);
        }
        return response;
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        console.log(parseJwt(response.data.token));
        localStorage.setItem("accessToken", "Bearer " + response.data.token);
        const type = parseJwt(response.data.token)
          .typeOfUser.toString()
          .toLowerCase();
        console.log(type);

        switch (type) {
          case "admin":
            $state.go("admin");
            break;
          case "superadmin":
            localStorage.setItem(
              "SuperAdmin",
              JSON.stringify(parseJwt(response.data.token))
            );
            
            $state.go("superAdmin");
            break;
          case "brandadmin":
            localStorage.setItem(
              "BrandAdmin",
              JSON.stringify(parseJwt(response.data.token))
            );
            $state.go("brand");
            break;
          case "agent":
            localStorage.setItem(
              "Agent",
              JSON.stringify(parseJwt(response.data.token))
            )
            $state.go("agent");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
});
