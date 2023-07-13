const express = require("express");
const { HotDeal } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// 핫딜 목록 로드
router.get("/", async (req, res, next) => {
  // GET /hotdeal?lastId={lastId || 0}
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.gt]: parseInt(req.query.lastId, 10) }; // id 값이 클수록 이전 post
    }
    const posts = await HotDeal.findAll({
      where,
      limit: 10,
    });

    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
