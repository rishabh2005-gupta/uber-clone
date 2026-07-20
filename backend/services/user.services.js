const User = require("../models/users");

module.exports.createUser = async ({
  FirstName,
  LastName,
  email,
  password,
}) => {
  if (!FirstName || !email || !password) {
    throw new Error("all fields are required");
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.statusCode = 400;
    throw error;
  }
  
  const user = await User.create({
    FullName: {
      FirstName,
      LastName,
    },
    email,
    password,
  });
  return user;
};
