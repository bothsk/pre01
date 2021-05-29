const express = require("express");
const router = express.Router();

const {
  user_register,
  user_register2,
  user_register3,
} = require("../controllers/indexController");

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/regis", user_register);

router.post("/regis2", user_register2);

router.post("/regis3", user_register3);

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
