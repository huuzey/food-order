const {
  createfood,
  getfoodid,
  getfood,
} = require("../controllers/foodController");

const router = require("express").Router();

router.post("/postfood", createfood);
router.get("/getfood", getfood);
router.get("/getfood/:id", getfoodid);
module.exports = router;
