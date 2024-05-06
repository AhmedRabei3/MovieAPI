const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const expire = process.env.EXPIRE;

exports.sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: expire});
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Token is not valid", error);
    return false;
  }
};
