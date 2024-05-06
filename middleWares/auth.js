const helper = require("../utils/helper");

exports.check = async (req, res, next) => {
  let token = req.headers["authorization"];
  token = await token?.replace("Bearer", "")?.trim();
  token ? console.log(token) : console.log("no token provided");

  const payload = helper.verify(token);
  if (payload) {
    req.userId = payload.sub;
    return next();
  }
  res.status(401).json({
    message: "Unauthorized !!",
  });
};
