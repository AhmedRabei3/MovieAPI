const express = require("express");
const router = express.Router();
const auth = require("../middleWares/auth");
const admin = require("../middleWares/admin");

const movieController = require("../controller/movieController");

router.post("/", [auth.check, admin.check], movieController.create);
router.put("/:id", [auth.check, admin.check], movieController.update);
router.delete("/:id", [auth.check, admin.check], movieController.delete);
router.get("/all", auth.check, movieController.list);
router.get("/:id", auth.check, movieController.find);

router.get("/:id/rev", movieController.reviews);
router.post("/:id/rev", [auth.check], movieController.addReview);



module.exports = router;
