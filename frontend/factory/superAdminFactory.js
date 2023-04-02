app.service("SuperAdminFactory", function () {
  function addBrandDetails(addBrand, $http) {
    // console.log('addBrand-->>>',addBrand);
    return $http({
      method: "POST",
      url: "http://localhost:8080/brand/addBrand",
      data: addBrand,
    });
  }

  function getAllBrands($http) {
    return $http({
      method: "GET",
      url: "http://localhost:8080/brand/viewBrand",
    });
  }
  return {
    getAllBrands: getAllBrands,
    addBrandDetails: addBrandDetails,
  };
});
