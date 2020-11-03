const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Jerkyb",
    menuName: "Home",
  });
});

router.get("/profile", (req, res, next) => {
  res.render("profile", {
    title: "Jerkyb",
    menuName: "Profile",
  });
});

router.get("/project", (req, res, next) => {
  res.render("project", {
    title: "Jerkyb",
    menuName: "Project",
  });
});

router.get("/tech", (req, res, next) => {
  res.render("tech", {
    title: "Jerkyb",
    menuName: "Tech",
  });
});

router.get("/tag", (req, res, next) => {
  res.render("tag", {
    title: "Jerkyb",
    menuName: "Tag",
  });
});
module.exports = router;
