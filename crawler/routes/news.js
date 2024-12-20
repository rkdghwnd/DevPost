const express = require("express");
const { News } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// 뉴스 목록 로드
router.get("/", async (req, res, next) => {
  // GET /news?page={page || 1}
  try {
    const posts = await News.findAll({
      offset: 30 * (parseInt(req.query.page, 10) - 1),
      limit: 30, // 개수 제한
    });
    const count = await News.count();

    res.status(200).json([posts, count]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 블로그 게시글 개수 가져오기
router.get("/count", async (req, res, next) => {
  // GET /news/count
  try {
    const count = await News.count();
    console.log(count);
    res.status(201).json(count);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
