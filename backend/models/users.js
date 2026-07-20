const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    FullName: {
      FirstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 Character"],
      },
      LastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 Character"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 Char long"],
    },
    password: {
      type: String,
      select:false,// jab user find karenge to password nhi milega 
      required: true,
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.methods.generateAuthToken =function(){
  const token=jwt.sign({_id:this._id},process.env.JWT_SECRET)
  return token
}
userSchema.methods.comparePassWord=async function (password) {
  return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
