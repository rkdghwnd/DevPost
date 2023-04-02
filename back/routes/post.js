const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { User, Comment, Post, Image, Nested_Comment } = require("../models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads"); // 이미지 저장할 폴더가 만들어져 있지 않은 경우 폴더생성
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "post-moa-s3",
    key(req, file, cb) {
      cb(null, `original/${Data.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// upload.none() -> 이미지가 없고 다른것(텍스트 등)이 있다
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id, // passport deserialize 로 부터 받음
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        // Image.create({}) 가 promise 객체이기 때문에 Promise.all 사용 가능
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images); // foreign key 설정
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      order: [
        [{ model: Comment }, "createdAt", "ASC"],
        [{ model: Comment }, { model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        {
          model: Image,
        },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Nested_Comment,
              include: [
                { model: User, attributes: ["id", "nickname", "profile_img"] },
              ],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        { model: User, as: "Bookmarkers", attributes: ["id"] },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"), // 이미지를 저장소에 업로드
  async (req, res, next) => {
    // POST /post/images
    res.json(req.files.map((y) => y.location));
  }
);

// 게시글 불러오기
router.get("/free", async (req, res, next) => {
  // /post/free?postId=${postId}
  try {
    const previousViews = await Post.findOne({
      where: { id: parseInt(req.query.postId) },
      attributes: ["views"],
    });

    await Post.update(
      { views: previousViews.dataValues.views + 1 },
      {
        where: { id: parseInt(req.query.postId) },
      }
    );

    const post = await Post.findOne({
      where: { id: parseInt(req.query.postId) },
      order: [
        [{ model: Comment }, "createdAt", "ASC"],
        [{ model: Comment }, { model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        { model: Image, attributes: ["id", "src"] },
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
        {
          model: Comment,
          order: [[{ model: Nested_Comment }, "id", "ASC"]],
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profile_img"],
            },
            {
              model: Nested_Comment,
              include: [
                {
                  model: User,
                  attributes: ["id", "nickname", "profile_img"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
        { model: User, as: "Bookmarkers", attributes: ["id"] },
      ],
    });
    if (!post) {
      res.status(404).send("게시글이 존재하지 않습니다.");
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제
router.delete("/:postId", isLoggedIn, async (req, res) => {
  //DELETE /post
  try {
    await Comment.destroy({
      where: { PostId: parseInt(req.params.postId) },
    });
    await Nested_Comment.destroy({
      where: { PostId: parseInt(req.params.postId) },
    });
    await Post.destroy({
      // UserId를 추가한 이유는 보안(다른사람이 삭제하지 못하게 하기 위해)
      where: { id: parseInt(req.params.postId), UserId: req.user.id },
    });

    res.json({ PostId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정
// upload.none() -> 이미지가 없고 다른것(텍스트 등)이 있다
router.patch("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // PATCH /post
  try {
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.body.postId, UserId: req.user.id },
      }
    );
    const post = await Post.findOne({
      where: { id: req.body.postId, UserId: req.user.id },
    });

    await Image.destroy({
      where: { PostId: req.body.postId },
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        // Image.create({}) 가 promise 객체이기 때문에 Promise.all 사용 가능
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images); // foreign key 설정
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      order: [
        [{ model: Comment }, "createdAt", "ASC"],
        [{ model: Comment }, { model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        {
          model: Image,
        },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Nested_Comment,
              include: [
                { model: User, attributes: ["id", "nickname", "profile_img"] },
              ],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        { model: User, as: "Bookmarkers", attributes: ["id"] },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 댓글 추가
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // POST /post/:postId/comment
  try {
    // 존재하는 게시글인지 검사(보안)
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    // console.log("컨텐츠", req.body.content);
    await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id, // passport deserialize 로 부터 받음
    });

    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [
        ["createdAt", "ASC"],
        [{ model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
        {
          model: Nested_Comment,
          include: [
            { model: User, attributes: ["id", "nickname", "profile_img"] },
          ],
        },
      ],
    });

    res.status(201).json(fullComments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:postId/comment/:commentId", isLoggedIn, async (req, res) => {
  //DELETE /post/:postId/comment
  try {
    await Comment.destroy({
      // UserId를 추가한 이유는 보안(다른사람이 삭제하지 못하게 하기 위해)
      where: {
        id: parseInt(req.params.commentId),
        PostId: parseInt(req.params.postId),
        UserId: req.user.id,
      },
    });

    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [
        ["createdAt", "ASC"],
        [{ model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        { model: User, attributes: ["id", "nickname", "profile_img"] },
        {
          model: Nested_Comment,
          include: [
            { model: User, attributes: ["id", "nickname", "profile_img"] },
          ],
        },
      ],
    });

    res.status(200).json(fullComments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/comment/:commentId", isLoggedIn, async (req, res) => {
  //DELETE /post/:postId/comment
  try {
    await Comment.update(
      {
        content: req.body.content,
      },
      {
        // UserId를 추가한 이유는 보안(다른사람이 삭제하지 못하게 하기 위해)
        where: {
          id: parseInt(req.params.commentId),
          PostId: parseInt(req.params.postId),
          UserId: req.user.id,
        },
      }
    );
    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [
        ["createdAt", "ASC"],
        [{ model: Nested_Comment }, "createdAt", "ASC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
        {
          model: Nested_Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profile_img"],
            },
          ],
        },
      ],
    });

    res.status(201).json(fullComments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 대댓글 추가
router.post(
  "/:postId/comment/:commentId/nested_comment",
  isLoggedIn,
  async (req, res, next) => {
    // POST /post/:postId/comment/:commentId/nested_comment
    try {
      // 존재하는 게시글인지 검사(보안)
      const post = await Post.findOne({
        where: { id: parseInt(req.params.postId) },
      });

      if (!post) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }

      const comment = await Comment.findOne({
        where: { id: parseInt(req.params.commentId) },
      });
      if (!comment) {
        return res.status(403).send("존재하지 않는 댓글입니다.");
      }

      const nestedComment = await Nested_Comment.create({
        content: req.body.content,
        target: req.body.target,
        PostId: parseInt(req.params.postId),
        UserId: req.user.id,
      });
      console.log(nestedComment);
      await comment.addNested_Comments(nestedComment.id);

      const fullComments = await Comment.findAll({
        where: { PostId: parseInt(req.params.postId) },
        order: [
          ["createdAt", "ASC"],
          [{ model: Nested_Comment }, "createdAt", "ASC"],
        ],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
          {
            model: Nested_Comment,
            include: [
              { model: User, attributes: ["id", "nickname", "profile_img"] },
            ],
          },
        ],
      });

      res.status(201).json(fullComments);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// 대댓글 삭제
router.delete(
  "/:postId/comment/:commentId/nested_comment/:nestedCommentId",
  isLoggedIn,
  async (req, res) => {
    //DELETE /post/:postId/comment/:commentId/nested_comment/:nestedCommentId
    try {
      await Nested_Comment.destroy({
        // UserId를 추가한 이유는 보안(다른사람이 삭제하지 못하게 하기 위해)
        where: {
          id: parseInt(req.params.nestedCommentId),
          CommentId: parseInt(req.params.commentId),
          PostId: parseInt(req.params.postId),
          UserId: req.user.id,
        },
      });

      const fullComments = await Comment.findAll({
        where: { PostId: parseInt(req.params.postId) },
        order: [
          ["createdAt", "ASC"],
          [{ model: Nested_Comment }, "createdAt", "ASC"],
        ],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
          {
            model: Nested_Comment,
            include: [
              { model: User, attributes: ["id", "nickname", "profile_img"] },
            ],
          },
        ],
      });

      res.status(201).json(fullComments);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 대댓글 수정
router.patch(
  "/:postId/comment/:commentId/nested_comment/:nestedCommentId",
  isLoggedIn,
  async (req, res) => {
    //DELETE /post/:postId/comment
    try {
      await Nested_Comment.update(
        {
          content: req.body.content,
        },
        {
          // UserId를 추가한 이유는 보안(다른사람이 삭제하지 못하게 하기 위해)
          where: {
            id: parseInt(req.params.nestedCommentId),
            PostId: parseInt(req.params.postId),
            UserId: req.user.id,
            CommentId: parseInt(req.params.commentId),
          },
        }
      );

      const fullComments = await Comment.findAll({
        where: { PostId: parseInt(req.params.postId) },
        order: [
          ["createdAt", "ASC"],
          [{ model: Nested_Comment }, "createdAt", "ASC"],
        ],
        include: [
          {
            model: User,
            attributes: ["id", "nickname", "profile_img"],
          },
          {
            model: Nested_Comment,
            include: [
              {
                model: User,
                attributes: ["id", "nickname", "profile_img"],
              },
            ],
          },
        ],
      });

      res.status(201).json(fullComments);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 좋아요 추가
router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id); // 시퀄라이즈 관계 메서드

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요 삭제
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id); // 시퀄라이즈 관계 메서드

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 북마크 추가
router.patch("/:postId/bookmark", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addBookmarkers(req.user.id); // 시퀄라이즈 관계 메서드

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 북마크 삭제
router.delete("/:postId/bookmark", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeBookmarkers(req.user.id); // 시퀄라이즈 관계 메서드

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
