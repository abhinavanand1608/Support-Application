const dotenv = require("dotenv");
const multer = require("multer");
const aws = require("aws-sdk");

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.S3_REGION,
});

const s3 = new aws.S3();

function uploadFile(file) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  return s3.upload(params).promise();
}

module.exports = uploadFile;
