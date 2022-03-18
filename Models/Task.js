const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  Name: String,
  CreateDay: {
    type: Date,
    default: Date.now,
  },
  Description: String,
  Picture: String,
  Price: String,
  Status: {
    type: Number,
    default: 0,
  },
  StatusDone: {
    type: Number,
    default: 0,
  },
  IDUser: String,
  IDCategory: String,
});

module.exports = mongoose.model("Tasks", taskSchema, "Task");
