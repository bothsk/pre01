const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passportConfig");
const {
  user_register,
  user_register2,
  user_register3,
  user_login,
  user_failed,
} = require("../controllers/indexController");

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/regis", user_register);

router.post("/regis2", user_register2);

router.post("/regis3", user_register3);

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  user_login,
  user_failed
);

module.exports = router;
