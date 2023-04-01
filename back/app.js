const express = require("express");
const db = require("./models");
const path = require("path");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");

const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./passport");
const morgan = require("morgan");

const hpp = require("hpp");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

app.use(
  cors({
    origin: process.env.FRONT_END_DOMAIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".postmoa.shop",
    },
  })
);

app.use(passport.initialize()); // passport 초기화
app.use(passport.session());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);

app.listen(4010, () => {
  console.log("서버 실행 중");
});
