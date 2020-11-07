const express = require("express");
const { Project } = require("../models");

const router = express.Router();

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