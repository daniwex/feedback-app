import { model, Schema, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    required: [true, "please enter your email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "can't be empty"],
  },
  fullname: {
    type: String,
    required: [true, "can't be empty"],
  },
  password: {
    type: String,
    required: [true, "can't be empty"],
  },
});


const User = models.User || model("User", userSchema);

export default User;
