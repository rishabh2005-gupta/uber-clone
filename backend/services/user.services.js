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
