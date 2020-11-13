const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares"); 

const { Tech } = require("../models");

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
    })
    fileURL = null;
    res.redirect("/project");
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

router.get("/:id", async (req, res, next) => {
  try {
    const tech = await Tech.findOne({ where: { id: req.params.id } });
    res.render("techPost", {
      title: "Jerky Code",
      menuName: tech.title,
      tech,
      admin: req.user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;