const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Comment, Nested_Comment, Image } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router(); // express 라우터 기능 가져오기
const passport = require("passport");
const db = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads"); // 이미지 저장할 폴더가 만들어져 있지 않은 경우 폴더생성
}

const upload = multer({
  // storage : 파일을 저장할 장소 설정
  // diskStorage : 하드 디스크에 저장
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + "_" + new Date().getTime() + ext); // 제로초125345235.png
      // getTime은 파일을 덮어씌우는것을 방지하기 위해 설정한 것일 뿐임
    },
  }),
  // 20MB로 용량 제한(제한 안하면 해커공격에 이용될 수 있음)
  limits: { fileSize: 20 * 1024 * 1024 },
});

// 로그인 정보 유지
router.get("/me", async (req, res, next) => {
  // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id }, // 조건
        // 가져올 속성
        attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // password 제외하고 가져오기
        include: [
          { model: Post, attributes: ["id"] },
          {
            model: Comment,
            attributes: ["id"],
          },
          {
            model: Nested_Comment,
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
    // 매개변수 : passport local.js 에서 done으로 전달된 인자들
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      // 클라이언트 쪽 에러
      console.log(info);
      return res.status(401).send(info.message); // 401 : 허가되지 않음
    }
    // passport 로그인
    // index.js의 serializeUser(user, done) => {...} 실행
    return req.login(user, async (loginErr) => {
      // passport 로그인에서 에러가 날 경우
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id }, // 조건
        // 가져올 속성
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
  })(req, res, next); // 미들웨어 확장
  // passport.authenticate()는 미들웨어를 리턴한다
  // 내부 콜백함수를 실행하려면 미들웨어를 호출해야하기 때문에
  // passport.authenticate()() 형태로 호출을 해야하고
  // req, res, next를 사용하기 위해서 인자로 전달해준다.
  // -> 미들웨어 안에서 미들웨어를 사용하는 형태로 '미들웨어 확장'이라 부른다.
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
  req.logout(() => {
    req.session.destroy();
  });
  res.clearCookie("connect.sid");
  return res.status(200).send("log out");
});

// 회원가입
router.post("/info", isNotLoggedIn, async (req, res, next) => {
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

    res.status(200).send("signup success");
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
            include: [
              { model: User, attributes: ["id"] },
              {
                model: Nested_Comment,
                attributes: ["id"],
                include: [
                  {
                    model: User,
                    attributes: ["id"],
                  },
                ],
              },
            ],
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
  // GET /user/bookmark
  try {
    if (req.user) {
      const comments = await Comment.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Post, attributes: ["id", "title"] }],
      });
      const nestedComments = await Nested_Comment.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Post, attributes: ["id", "title"] }],
      });

      const result = [...comments, ...nestedComments];
      result.sort((a, b) => b.createdAt - a.createdAt);

      return res.status(201).json(result);
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
        where: { UserId: req.user.id },
        order: [["createdAt", "DESC"]],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
          {
            model: Comment,
            include: [
              { model: User, attributes: ["id"] },
              {
                model: Nested_Comment,
                attributes: ["id"],
                include: [{ model: User, attributes: ["id"] }],
              },
            ],
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
router.patch("/", upload.none(), isLoggedIn, async (req, res, next) => {
  // PATCH /user
  try {
    if (req.user) {
      await User.update(
        {
          nickname: req.body.nickname,
          introduce: req.body.introduce,
          password: req.body.password,
          profile_img: req.body.image,
        },
        {
          where: { id: req.user.id },
        }
      );

      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id }, // 조건
        // 가져올 속성
        attributes: { exclude: ["password", "createdAt", "updatedAt"] }, // password 제외하고 가져오기
        include: [
          { model: Post, attributes: ["id"] },
          {
            model: Comment,
            attributes: ["id"],
          },
          {
            model: Nested_Comment,
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
      where: { id: parseInt(req.query.userId) }, // 조건
      // 가져올 속성
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
              include: [
                { model: User, attributes: ["id"] },
                {
                  model: Nested_Comment,
                  attributes: ["id"],
                  include: [
                    {
                      model: User,
                      attributes: ["id"],
                    },
                  ],
                },
              ],
            },
            {
              model: User, // 좋아요 누른 사람
              as: "Likers",
              attributes: ["id"],
            },
            {
              model: User, // 북마크
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

    const nestedComments = await Nested_Comment.findAll({
      limit: 10,
      where: { UserId: parseInt(req.query.userId) },
      include: [{ model: Post, attributes: ["id", "title"] }],
    });

    const fullComments = [...comments, ...nestedComments];
    fullComments.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(201).json({ yourInfo, fullComments });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 비밀번호 유효성 검증
router.post("/password/validate", async (req, res, next) => {
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
router.delete("/", async (req, res, next) => {
  // DELETE `/user
  try {
    if (req.user) {
      await User.destroy({ where: { id: req.user.id } });
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
