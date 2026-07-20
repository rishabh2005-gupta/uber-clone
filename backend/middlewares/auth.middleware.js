const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const isBlackListed = await users.findOne({ token: token });
  if(isBlackListed){
    return res.status(401).json({message:'unauthorized'})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decoded._id);

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
