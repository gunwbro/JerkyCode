const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Jerky Code",
    menuName: "Home",
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

router.get("/tech", (req, res, next) => {
  res.render("tech", {
    title: "Jerky Code",
    menuName: "Tech",
    admin: req.user,
  });
});

router.get("/tag", (req, res, next) => {
  res.render("tag", {
    title: "Jerky Code",
    menuName: "Tag",
    admin: req.user,
  });
});
module.exports = router;
