const express = require("express");
const { Blog, News, HotDeal } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// 뉴스, 블로그, 핫딜 검색
router.get("/", async (req, res, next) => {
  // GET /search?keyword=${keyword}
  try {
    const searchBlogResults = await Blog.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${req.query.keyword}%` } }],
      },
      order: [["createdAt", "DESC"]],
    });

    const searchNewsResults = await News.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.keyword}%` } },
          { description: { [Op.like]: `%${req.query.keyword}%` } },
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    const searchHotDealResults = await HotDeal.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${req.query.keyword}%` } }],
      },
      order: [["createdAt", "DESC"]],
    });

    const result = [searchBlogResults, searchNewsResults, searchHotDealResults];
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
