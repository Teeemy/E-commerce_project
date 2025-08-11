// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// console.log("cloudinary.config",{
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });
// module.exports = cloudinary;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dlooj57rr",
    api_key: "444225367927963",
    api_secret: "0icFgZk4BMy5VuhqIM_NUtCTp4s"
});

module.exports = cloudinary;