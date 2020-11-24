const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares"); 

const { Tech, Tag } = require("../models");
const { timeStamp } = require("console");

const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = express.Router();
let fileURL;

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/", async (req, res, next) => {
  try {
    const techs = await Tech.findAll();
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

router.get("/post", isLoggedIn, (req, res, next) => {
  fileURL = null;
  res.render("newTech", {
    title: "Jerky Code",
    menuName: "New Post",
    admin: req.user,
  })
})



router.post("/post", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const tech = await Tech.create({
      title: req.body.title,
      content: req.body.content,
      img: fileURL,
    });
    const tags = req.body.tag.match(/#[^\s#]*/g);
    if (tags) {
      const result = await Promise.all(tags.map(tag => Tag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await tech.addTags(result.map(r => r[0]));
    }
    fileURL = null;
    res.redirect("/tech");
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post("/post/img", upload.single('upload'), (req, res, next) => {
  console.log(req.file);
  fileURL = `/img/${req.file.filename}`;
  res.json({ 
    "uploaded": 1,
    "filename": req.file.filename,
    "url": `/img/${req.file.filename}`
   });
});

router.get("/search", async (req, res, next) => {
  const query = req.query.search;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const posts = await Tech.findAll({
      where: {
        title: {
          [Op.like]: "%" + query + "%"
        }
      }
    });
    res.render("tech", {
      title: "Jerky Code",
      menuName: "Post",
      admin: req.user,
      techs: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const tech = await Tech.destroy({ where: { id: req.params.id } });
    res.json(tech)
  } catch (error) {
    console.error(error);
    return next(error);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const tech = await Tech.findOne({ where: { id: req.params.id } });
    const tags = await tech.getTags();
    res.render("techPost", {
      title: "Jerky Code",
      menuName: tech.title,
      tech,
      tags,
      admin: req.user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;