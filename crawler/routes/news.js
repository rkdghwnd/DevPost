const express = require("express");
const { News } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /news?page={page || 1}
  try {
    const posts = await News.findAll({
      offset: 10 * (parseInt(req.query.page, 10) - 1),
      limit: 10, // 개수 제한
    });
    const count = await News.count();

    res.status(200).json([posts, count]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
