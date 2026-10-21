const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainsSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 Character"],
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 Character"],
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s.]+\S+$/, "Please enter a valid email"],
      minlength: [5, "Email must be at least 5 Char long"],
    },
    socketId: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
    status: {
      type: String,
      enum: ['active','inactive'],
      default:'inactive',
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "Color must be at least 3 characters long"],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, "Plate must be at least 3 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, captain) => {
        delete captain.password;
        return captain;
      },
    },
  },
);
captainsSchema.index({ location: "2dsphere" });

captainsSchema.methods.generateAuthToken =function(){
  const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
  return token
}
captainsSchema.methods.comparePassword=async function (password) {
  return await bcrypt.compare(password,this.password);
}
captainsSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10)
}

const captains = mongoose.model("Captain", captainsSchema);

module.exports = captains;
