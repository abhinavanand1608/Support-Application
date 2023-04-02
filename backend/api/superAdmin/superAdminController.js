const Brand = require("../../models/brand");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

exports.addBrand = (req, res) => {
  const brandDetail = req.body;
  // console.log(req.body)
  //   const id = Date.now();
  // const brandName = req.body.brandName;
  // const brandPhone = req.body.phone;
  // const brandEmail = req.body.email;
  // const brandPassword = req.body.password;
  // const brandUserName = req.body.userName;
  var salt = bcrypt.genSaltSync(10);
  const brandDetails = new Brand({
    name: brandDetail.brandName,
    phone: brandDetail.phone,
    email: brandDetail.email,
    password: bcrypt.hashSync(brandDetail.password, salt),
    userName: brandDetail.userName,
    typeOfUser: "BrandAdmin",
    createdAt: new Date(),
  });

  const brandAdminDetails = new User({
    firstName: brandDetail.firstName,
    lastName: brandDetail.lastName,
    userName: brandDetail.userName,
    phone: brandDetail.phone,
    email: brandDetail.email,
    
    password: bcrypt.hashSync(brandDetail.password, salt),
    typeOfUser: "BrandAdmin",
    companyId: req.body.companyId,
    imageUrl: req.body.imageUrl,
  });

  User.findOne({ email: brandDetail.email }).then((result) => {
    if (result) {
      res.send("Brand Admin Already Exists !!");
    } else {
      brandAdminDetails
        .save()
        .then((result) => {
          console.log(result);
          // res.status(200).json({
          //   message: "Founder Created Successfully !!",
          //   founderDetails: result,
          // });
        })
        .catch((err) => console.log(err));
    }
  });

  Brand.findOne({ name: brandDetail.brandName }).then((result) => {
    if (result) {
      res.send("Brand Already Exists !!");
    } else {
      brandDetails
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: "Brand Created Successfully !!",
            brandInfo: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

exports.viewBrand = (req, res, next) => {
  Brand.find().then((result) => {
    console.log(res);
    res.status(200).json({
      message: "These are all the brands !!",
      allBrands: result,
    });
  });
};
