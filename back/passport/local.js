const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");
// { 가져올 변수, 새로지을 이름 }

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 존재하는 사용자인지 확인
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 사용자입니다.",
            });
          }
          // 탈퇴 여부
          if (user.withdraw) {
            return done(null, false, { message: "회원 탈퇴한 사용자입니다." });
          }
          // 비밀번호 일치 여부
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
