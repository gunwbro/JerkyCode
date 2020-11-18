const express = require("express");
const { Tech, Tag } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let numPost = [];
    const tags = await Tag.findAll();
    for (let tag of tags) {
      const posts = await tag.getPosts();
      numPost[tag.id] = Object.keys(posts).length;
      console.log(Object.keys(posts).length);
    }
    // const result = await tags.map(async tag => {
    //   const posts = await tag.getPosts();
    //   numPost[tag.id] = Object.keys(posts).length;
    //   console.log(Object.keys(posts).length);
    // });
    console.log(numPost);
    res.render("tag", {
      title: "Jerky Code",
      menuName: "Tag",
      admin: req.user,
      tags,
      numPost
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
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