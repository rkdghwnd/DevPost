const express = require("express");
const { Blog, sequelize } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// 블로그 목록 로드
router.get("/", async (req, res, next) => {
  // GET /blog?page={page || 1}
  try {
    const posts = await Blog.findAll({
      offset: 30 * (parseInt(req.query.page, 10) - 1),
      limit: 30,
    });
    const count = await Blog.count();

    res.status(200).json([posts, count]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 블로그 게시글 개수 가져오기
router.get("/count", async (req, res, next) => {
  // GET /blog/count
  try {
    const count = await Blog.count();
    console.log(count);
    res.status(201).json(count);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
