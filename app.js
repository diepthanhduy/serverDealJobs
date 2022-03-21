const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const tasksRoute = require("./Routes/Task");

//Sử dụng body-parser để lấy được json từ req
app.use(bodyParser.json());

//Route api của Task
app.use("/taskApi", tasksRoute);

//Chạy app tại port 3000
app.listen(3000);

//Connect DB
connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/appDealJobs");
    console.log("Connected to DB success!");
  } catch (error) {
    console.log("Connect fail: " + error);
  }
};
connectDB();
