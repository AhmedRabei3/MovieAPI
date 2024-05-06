const { User } = require("../models/User");

exports.check = async (req, res, next) => {
  const user = await User.findById(req.userId);
  user.isAdmin ? next() : res.status(400).json({ message: "Forbidden" });
};
