const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Project } = require("../models");

const router = express.Router();

fs.readdir("uploads", (error) => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync('uploads');
  }
});

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
    const projects = await Project.findAll();
    res.render("project", {
      title: "Jerky Code",
      menuName: "Project",
      projects: projects,
    });
    
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/post", (req, res, next) => {
  res.render("newProject", {
    title: "Jerky Code",
    menuName: "New Project",
  });
});



router.post("/post", upload.single('img'), async (req, res, next) => {
  try {
    console.log(req.body);
    const project = await Project.create({
      title: req.body.title,
      date: req.body.date,
      skills: req.body.skill,
      part: req.body.part,
      description: req.body.description,
      img: `/img/${req.file.filename}`
    })
    res.redirect("/project");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload2 = multer();
router.post("/post", upload2.none(), async (req, res, next) => {
  try {
    console.log(req.body);
    const project = await Project.create({
      title: req.body.title,
      date: req.body.date,
      skills: req.body.skill,
      part: req.body.part,
      description: req.body.description,
    })
    res.redirect("/project");
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id } });
    res.render("projectPost", {
      title: "Jerky Code",
      project,
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
})



module.exports = router;