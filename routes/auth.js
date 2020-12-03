const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Admin } = require("../models");
const logger = require("../logger");

const router = express.Router();

router.get("/login", isNotLoggedIn, async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ where: { name: process.env.ADMIN_NAME } });   
    if (admin === null) {
      logger.info("No Admin Account");
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      await Admin.create({
        name: process.env.ADMIN_NAME,
        password: hash,
      });
    }
    res.render("login", {
      admin: req.user,
      loginError: req.flash("loginError"),
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, admin, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!admin) {
      req.flash("loginError", info.message);
      return res.redirect("/auth/login");
    }
    return req.login(admin, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/auth/login");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;