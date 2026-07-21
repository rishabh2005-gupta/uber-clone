const captainModel = require("../models/captains");
const captainServices = require("../services/captains.services");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { FullName, email, password, vehicle } = req.body;
  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainServices.createCaptain({
    FirstName: FullName.FirstName,
    LastName: FullName.LastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, captain });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.status(200).json({ token, captain });
};

module.exports.profile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.loggedOut = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successfully" });
};
