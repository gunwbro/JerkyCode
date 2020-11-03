const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Jerky Code",
    menuName: "Home",
  });
});

router.get("/profile", (req, res, next) => {
  res.render("profile", {
    title: "Jerky Code",
    menuName: "Profile",
  });
});

router.get("/project", (req, res, next) => {
  res.render("project", {
    title: "Jerky Code",
    menuName: "Project",
  });
});

router.get("/tech", (req, res, next) => {
  res.render("tech", {
    title: "Jerky Code",
    menuName: "Tech",
  });
});

router.get("/tag", (req, res, next) => {
  res.render("tag", {
    title: "Jerky Code",
    menuName: "Tag",
  });
});
module.exports = router;
