const express = require('express');
const router = express.Router();
const userController = require("../controller/userController.js")
const auth = require('../middleWares/auth')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST register a new user. */
router.post('/reg', userController.register);
/* login the user and return jwt token.*/
router.post("/login", userController.login);
/* get user profile */
router.get('/me',[auth.check],userController.me)

module.exports = router;
