const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Jerky Code",
    admin: req.user,
  });
});

router.get("/profile", (req, res, next) => {
  res.render("profile", {
    title: "Jerky Code",
    menuName: "Profile",
    admin: req.user,
  });
});

module.exports = router;
