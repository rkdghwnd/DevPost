const express = require("express");
const { HotDeal } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /hotdeal?lastId={lastId || 0}
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.gt]: parseInt(req.query.lastId, 10) }; // lastId 보다 작은
    }
    const posts = await HotDeal.findAll({
      where,
      limit: 10,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
