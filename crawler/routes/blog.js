const express = require("express");
const { Blog, sequelize } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// router.get("/", async (req, res, next) => {
//   // GET /blog?lastId={lastId || 0}
//   try {
//     const where = {};
//     if (parseInt(req.query.lastId, 10)) {
//       // 초기 로딩이 아닐 때
//       where.id = { [Op.gt]: parseInt(req.query.lastId, 10) }; // lastId 보다 작은
//     }
//     const posts = await Blog.findAll({
//       where,
//       limit: 10, // 개수 제한
//     });

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
router.get("/", async (req, res, next) => {
  // GET /blog?page={page || 1}
  try {
    const posts = await Blog.findAll({
      offset: 10 * (parseInt(req.query.page, 10) - 1),
      limit: 10, // 개수 제한,
    });
    const count = await Blog.count();

    res.status(200).json([posts, count]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
