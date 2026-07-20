const users = require("../models/users");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");
const blackListTokenModel=require('../models/blackListToken')
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  validationResult(req); //request par run hui validations ke errors collect karke ek Result object return karta hai.

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  
  try {
    const { FullName, email, password } = req.body;
    const { FirstName, LastName } = FullName;
    const hashedPassword = await users.hashPassword(password);

    const user = await userServices.createUser({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({ token, user });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  const user = await users.findOne({ email }).select("+password");

  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassWord(password);

  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.profile = async (req, res, next) => {
  res.status(200).json(req.user, req.cookies);
};

module.exports.loggedOut = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization;
  await blackListTokenModel.create({token});
  res.status(200).json({
    message: "logged out",
  });
};
