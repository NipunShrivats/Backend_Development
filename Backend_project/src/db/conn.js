const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myWebsite1")
    .then(() => {
        console.log("connection sucessful");
    }).catch((error) => {
        console.log(error);
    })