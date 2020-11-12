const local = require("./localStrategy");
const { Admin } = require("../models");
const passport = require("passport");

module.exports = (passport) => {
  passport.serializeUser((admin, done) => {   // 사용자 정보 객체를 세션에 아이디로 저장
    done(null, admin.id);
  });

  passport.deserializeUser((id, done) => {    // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
    Admin.findOne({ where: { id } })
      .then(admin => done(null, admin))
      .catch(err => done(err));
  });

  local(passport);
}