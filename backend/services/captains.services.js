const captainModel = require("../models/captains");

module.exports.createCaptain = async ({
  FirstName,
  LastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !FirstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("all fields are required");
  }

  const captain = await captainModel.create({
    FullName: {
      FirstName,
      LastName,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
};
