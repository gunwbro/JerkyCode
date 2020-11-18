const express = require("express");
const { Tech, Tag } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.render("tag", {
      title: "Jerky Code",
      menuName: "Tag",
      admin: req.user,
      tags
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log("?");
    const tag = await Tag.findOne({ where: { id: req.params.id } });
    const techs = await tag.getPosts();
    res.render("tech", {
      title: "Jerky Code",
      menuName: "Post",
      admin: req.user,
      techs
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;