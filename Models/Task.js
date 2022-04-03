const mongoose = require("mongoose");

//Tạo một model cho Task tương ứng với Collection Task trong DB
const taskSchema = mongoose.Schema({
  Name: String,
  CreateDay: {
    type: Date,
    default: Date.now,
  },
  Description: String,
  Price: String,
  public_id: String,
  secure_url: String,
  StatusBook: {
    type: Number,
    default: 0,
  },
  StatusDone: {
    type: Number,
    default: 0,
  },
  NameCreator: String,
  PhoneCreator: String,
  AddressCreator: String,
  IDCreator: String,
  IDUserBook: {
    type: String,
    default: "",
  },
  Latitude: {
    type: String,
    default: "",
  },
  Longitude: {
    type: String,
    default: "",
  },
});

//Export model Task ra tham số "Task" bên dưới là Task Collection trong DB
//  ánh xạ tới Task trong DB
module.exports = mongoose.model("Tasks", taskSchema, "Task");
