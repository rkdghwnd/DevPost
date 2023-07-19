const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Comment, Image } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads"); // uploads 폴더에 저장
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext); // 파일이름 지정
    },
  }),
  // 20MB로 용량 제한
  limits: { fileSize: 20 * 1024 * 1024 },
});

// 로그인 정보 유지
router.get("/me", async (req, res, next) => {
  // GET /user/me
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // password 제외하고 가져오기
        include: [
          { model: Post, as: "Liked", attributes: ["id"] },
          { model: Post, attributes: ["id"] },
          {
            model: Comment,
            attributes: ["id"],
          },

          { model: Post, as: "Bookmarked", attributes: ["id"] },
        ],
      });
      return res.status(201).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로컬 로그인
router.post("/local/auth", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // POST /user/auth
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      // 클라이언트 쪽 에러
      console.log(info);
      return res.status(401).send(info.message);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        // passport 에러
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // password 제외하고 가져오기
        include: [
          { model: Post, attributes: ["id"] },
          { model: Post, as: "Liked", attributes: ["id"] },
          { model: Post, as: "Bookmarked", attributes: ["id"] },
          { model: Comment, attributes: ["id"] },
        ],
      });

      return res.status(201).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 카카오 로그인
router.get("/kakao/auth", isNotLoggedIn, passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(process.env.FRONT_END_DOMAIN);
  }
);

// 페이스북 로그인
router.get("/facebook/auth", isNotLoggedIn, passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect(process.env.FRONT_END_DOMAIN);
  }
);

// 구글 로그인
router.get(
  "/google/auth",
  isNotLoggedIn,
  passport.authenticate("google", {
    scope: ["email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect(process.env.FRONT_END_DOMAIN);
  }
);

// 로그아웃
router.delete("/auth", isLoggedIn, (req, res, next) => {
  // DELETE /user/auth
  req.logout(() => {
    req.session.destroy();
  });
  res.clearCookie("connect.sid");
  return res.status(200).send("log out");
});

// 회원가입
router.post("/info", async (req, res, next) => {
  // POST /user/info
  const exUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exUser) {
    return res.status(403).send("이미 사용중인 아이디입니다.");
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      introduce: "",
      password: hashedPassword,
      provider: "local",
    });

    res.status(200).send("sign up success");
  } catch (error) {
    console.error(error);
    next(error); // 상태코드 500
  }
});

// 내가 쓴글
router.get("/posts", isLoggedIn, async (req, res, next) => {
  // GET /user/posts
  try {
    if (req.user) {
      const posts = await Post.findAll({
        where: { UserId: req.user.id },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "nickname", "profile_img"],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            attributes: ["id"],
            include: [{ model: User, attributes: ["id"] }],
            attributes: ["id"],
          },
          {
            model: User,
            as: "Likers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Bookmarkers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(201).json(posts);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내가 쓴 댓글
router.get("/comments", isLoggedIn, async (req, res, next) => {
  // GET /user/comments
  try {
    if (req.user) {
      const comments = await Comment.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Post, attributes: ["id", "title"] }],
      });

      comments.sort((a, b) => b.createdAt - a.createdAt);

      return res.status(201).json(comments);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내가 북마크한 글
router.get("/bookmark", isLoggedIn, async (req, res, next) => {
  // GET /user/bookmark
  try {
    if (req.user) {
      const me = await User.findOne({
        where: { id: req.user.id },
        include: [{ model: Post, as: "Bookmarked" }],
      });

      const bookmark = await me.getBookmarked({
        order: [["createdAt", "DESC"]],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["id"] }],
            attributes: ["id"],
          },
          { model: User, as: "Likers", attributes: ["id"] },
          { model: User, as: "Bookmarkers", attributes: ["id"] },
          { model: Image },
        ],
      });
      return res.status(201).json(bookmark);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원정보 수정
router.patch("/me", upload.none(), isLoggedIn, async (req, res, next) => {
  // PATCH /user/me
  try {
    if (req.user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 13);
      await User.update(
        {
          nickname: req.body.nickname,
          introduce: req.body.introduce,
          password: hashedPassword,
          profile_img: req.body.image,
        },
        {
          where: { id: req.user.id },
        }
      );

      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },

        attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // password 제외하고 가져오기
        include: [
          { model: Post, attributes: ["id"] },
          {
            model: Comment,
            attributes: ["id"],
          },
          { model: Post, as: "Bookmarked", attributes: ["id"] },
        ],
      });
      return res.status(201).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 상대 프로필 정보
router.get("/you", async (req, res, next) => {
  // GET /user/you
  try {
    const yourInfo = await User.findOne({
      where: { id: parseInt(req.query.userId) },

      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      order: [[Post, "createdAt", "DESC"]],
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profile_img"],
            },
            {
              model: Image,
            },
            {
              model: Comment,
              attributes: ["id"],
              include: [{ model: User, attributes: ["id"] }],
            },
            {
              model: User,
              as: "Likers",
              attributes: ["id"],
            },
            {
              model: User,
              as: "Bookmarkers",
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    const comments = await Comment.findAll({
      limit: 10,
      where: { UserId: parseInt(req.query.userId) },
      include: [{ model: Post, attributes: ["id", "title"] }],
    });

    comments.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(201).json({ yourInfo, comments });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 비밀번호 유효성 검증
router.post("/password/validate", isLoggedIn, async (req, res, next) => {
  // POST `/user/password/validate`
  try {
    if (req.user) {
      console.log(req.body.password, req.user.password);
      const result = await bcrypt.compare(req.body.password, req.user.password);
      if (result) {
        return res.status(200).send("비밀번호 유효성 검증 성공");
      }
      return res.status(404).send("비밀번호 다름");
    } else {
      return res.status(401).send("로그인 되어 있지 않음");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 회원 탈퇴
router.delete("/me", isLoggedIn, async (req, res, next) => {
  // DELETE `/user/me
  try {
    if (req.user) {
      await User.update(
        {
          withdraw: true,
        },
        { where: { id: req.user.id } }
      );
      req.logout(() => {
        req.session.destroy();
      });
      res.clearCookie("connect.sid");
      return res.status(201).send("회원탈퇴 완료");
    } else {
      return res.status(401).send("로그인 되어 있지 않음");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
