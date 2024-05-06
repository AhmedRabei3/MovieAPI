const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth");
const watchController = require("../controller/watch");

router.post("/add", [auth.check], watchController.addToWatchList);

// get all movies in the user's watch list
router.get("/watchlist", auth.check , watchController.showWatchList);

router.delete("/delete/:id", auth.check , watchController.deleteFormWatchList);

module.exports = router;
