app.controller(
  "superAdminController",
  function ($scope, $state, $rootScope, $http, SuperAdminFactory) {
    $scope.type = JSON.parse(localStorage.getItem("SuperAdmin"));
    $scope.brandsArray = [];
    SuperAdminFactory.getAllBrands($http).then(function (response) {
      $scope.brands = response.data.allBrands;
      $scope.brandsArray = $scope.brands;

      // let superAdminId = JSON.parse(localStorage.getItem("SuperAdmin")).userId;
      // console.log(superAdminId);
      console.log("All Brands ", $scope.brands);
    });

    console.log("In add brand controller");
    $scope.deleteBrand = function (brand) {
      brand.isDeleted = true;
    };

    $scope.addBrandDetails = function () {
      // let firstName = $scope.addBrand.fname;
      // let lastName = $scope.addBrand.lname;
      // let brandName = $scope.addBrand.name;
      // let brandEmail = $scope.addBrand.email;
      // let brandPassword = $scope.addBrand.password;
      // let brandUserName = $scope.addBrand.userName;
      // let brandPhone = $scope.addBrand.phone;

      let superAdminId = JSON.parse(localStorage.getItem("SuperAdmin")).userId;
      // console.log(superAdminId);
      console.log("image selected --->", $scope.imageUpload);
      uploadImage($scope.imageUpload, $http)
        .then(function (result) {
          $scope.addBrand.imageUrl = result.data.Location;
          $scope.addBrand.companyId = superAdminId;
          SuperAdminFactory.addBrandDetails($scope.addBrand, $http)
            .then(function (response) {
              if (response.status != 200) {
                throw new Error("HTTP Status " + response.status);
              }
              return response;
            })
            .then(function (response) {
              console.log(response);
              console.log(response.data.brandInfo);
              $scope.brands.push(response.data.brandInfo);
              // $(function () {
              //   $("#exampleModalling").modal("hide");
              // });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    $scope.logOut = function () {
      localStorage.removeItem("SuperAdmin");
      localStorage.removeItem("accessToken");
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

// app.controller(
//   "addBrandController",
//   function ($scope, $state, $rootScope, $http) {
//     console.log("In view brand controller");

//     $scope.addBrandDetails = function () {
//       let brandName = $scope.addBrand.name;
//       let brandEmail = $scope.addBrand.email;
//       let brandPassword = $scope.addBrand.password;

//       console.log(brandName, brandEmail, brandPassword);
//       $http({
//         method: "GET",
//         url: "http://localhost:8080/brand/viewBrand",
//         data: {
//           name: brandName,
//           email: brandEmail,
//           password: brandPassword,
//         },
//       })
//         .then(function (response) {
//           if (response.status != 200) {
//             throw new Error("HTTP Status " + response.status);
//           }
//           return response;
//         })
//         .then(function (response) {
//           console.log(response);
//           console.log(response.data.brandInfo);
//           //   $state.go("admin");
//         })
//         .catch((err) => console.log(err));
//     };
//   }
// );
