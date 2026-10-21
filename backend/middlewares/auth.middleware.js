const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require('../models/blackListToken');
const captainModel = require('../models/captains');

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token ||
    (authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null); //Authorization: Bearer <token> use this in header

  if (!token) {
    return res.status(401).json({ message: "UnAuthorized1" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if(isBlackListed){
    return res.status(401).json({message:'unauthorized'})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "UnAuthorized2" });
    }

    req.user = user;

    return next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "UnAuthorized2" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies?.token ||
    (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized token not valid' });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: 'Unauthorized captain not found' });
    }
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
