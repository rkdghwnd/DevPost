const express = require("express");
const { Post, User, Image, Comment } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

// 자유게시판 글목록 로드
router.get("/free", async (req, res, next) => {
  // GET /free?page={data || 1}
  try {
    const count = await Post.count();
    const posts = await Post.findAll({
      offset: 30 * (parseInt(req.query.page, 10) - 1),
      limit: 30,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "ASC"],
      ],
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
          include: [{ model: User, attributes: ["id"] }],
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
    res.status(200).json([posts, count]);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  // GET /posts/search?keyword=${keyword}
  try {
    const postSearchResults = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.keyword}%` } },
          { content: { [Op.like]: `%${req.query.keyword}%` } },
        ],
      },
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "ASC"],
      ],
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
          include: [{ model: User, attributes: ["id"] }],
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

    const userSearchResults = await User.findAll({
      where: { nickname: { [Op.like]: `%${req.query.keyword}%` } },
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
              include: [{ model: User, attributes: ["id"] }],
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
        },
      ],
    });

    const jsonUser = JSON.parse(JSON.stringify(userSearchResults));
    let result = JSON.parse(JSON.stringify(postSearchResults));
    for (let i = 0; i < jsonUser.length; ++i) {
      result = result.concat(jsonUser[i].Posts);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
