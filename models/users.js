const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  bdaycard: 
      [{ type: Schema.Types.ObjectId, 
        ref: "birthdays" }],
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
