const express = require("express");
const { sequelize, Blog, HotDeal } = require("./models");

const path = require("path");
const blogRouter = require("./routes/blog");
const newsRouter = require("./routes/news");
const hotdealRouter = require("./routes/hotdeal");
const searchRouter = require("./routes/search");

const axios = require("axios");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(morgan("dev"));

const blogCrawling = require("./blogCrawler/blogCrawling");
const newsCrawling = require("./newsCrawler/newsCrawling");
const hotdealCrawling = require("./hotdealCrawler/hotdealCrawling");

sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);

app.use(
  cors({
    origin: `${process.env.FRONT_END_DOMAIN}`,
    credentials: true,
  })
);

fs.readdir("images", (err) => {
  if (err) {
    console.error("images 폴더가 없어 images 폴더를 생성합니다.");
    fs.mkdirSync("images");
  }
});

const crawling = async () => {
  await blogCrawling();
  await newsCrawling();
  await hotdealCrawling();
  setInterval(async () => {
    await blogCrawling();
    await newsCrawling();
    await hotdealCrawling();
  }, 1000 * 60 * 60 * 24);
};
crawling();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/blog", blogRouter);
app.use("/news", newsRouter);
app.use("/hotdeal", hotdealRouter);
app.use("/search", searchRouter);

app.use("/", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("서버 실행 중");
});
