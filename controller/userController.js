const asyncHandler = require("express-async-handler");
const {
  User,
  validationRegUser,
  validationLoginUser,
} = require("../models/User");
const bcrypt = require("bcrypt");
const helper = require("../utils/helper");

/**--------------------------------------------------
 * @desc  Create a new user account
 * @method  POST
 * @access   Public
 * @rout /api/reg
 *-------------------------------------------------*/

module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validationRegUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;

  // check if email  is already exist in the database
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email has been used" });

  user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  // save user in  the database
  await user.save();
  res
    .status(201)
    .json({ message: "User created successfully! , please login" });
  // if faild to create user
  if (!user) return res.status(400).send("Create failed!");
});

/**--------------------------------------------------
 * @desc  login
 * @method  POST
 * @access   Public
 * @route /api/login
 *-------------------------------------------------*/

module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validationLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email or Password" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Email or Password is wrong!" });
  res.status(200).json({
    sucess: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: helper.sign({ sub: user.id }),
    },
  });
});
/**--------------------------------------------------
 * @desc  user profile
 * @method  GET
 * @access   private
 * @route /api/me
 *-------------------------------------------------*/

module.exports.me = asyncHandler(async (req, res) => {
  // get data from the user who make the request
  const user = await User.findById(req.userId);
  res.json({
    success: true,
    data: {
      name: user.name,
      id: user.id,
      email: user.email,
    },
  });
});
