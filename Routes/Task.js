const express = require("express");
const router = express.Router();

//Model Task
const Task = require("../Models/Task");

const User = require("../Models/User");

//Update Task (có người Book công việc này)
router.put("/update", (req, res) => {
  const dataUpdate = {
    StatusBook: req.body.StatusBook,
    IDUserBook: req.body.IDUserBook,
  };
  Task.updateOne({ _id: req.body._id }, { $set: dataUpdate })
    .exec()
    .then(res.json({ message: "Success" }))
    .catch((error) => res.json({ message: error }));
});

//Get Task chưa có người nhận (StatusBook = 0)
router.get("/", async (req, res) => {
  try {
    const data = await Task.find({
      StatusBook: 0,
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//Get task trả về các task mà được user đang đăng nhập đã book
router.post("/task-booked", async (req, res) => {
  try {
    const data = await Task.find({
      IDUserBook: req.body.IDUserBook,
      StatusBook: 1,
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//Get task trả về các task mà được user đang đăng nhập đã tạo
router.post("/task-created", async (req, res) => {
  try {
    const data = await Task.find({
      IDCreator: req.body.IDCreator,
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//Post Task tạo một task mới
router.post("/", async (req, res) => {
  const task = new Task({
    Name: req.body.Name,
    Description: req.body.Description,
    Price: req.body.Price,
    public_id: req.body.public_id,
    secure_url: req.body.secure_url,
    IDCreator: req.body.IDCreator,
    NameCreator: req.body.NameCreator,
    PhoneCreator: req.body.PhoneCreator,
    AddressCreator: req.body.AddressCreator,
  });
  try {
    const saveTask = await task.save();
    res.json(saveTask);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
