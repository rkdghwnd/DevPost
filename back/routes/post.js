const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const { User, Comment, Post, Image } = require("../models");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  // 20MB로 용량 제한
  limits: { fileSize: 20 * 1024 * 1024 },
});

// upload.none() -> 이미지가 없고 다른것(텍스트 등)이 있다
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리는 경우
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images); // foreign key 설정
      } else {
        // 이미지를 하나만 올리는 경우
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const newPost = await Post.findOne({
      where: { id: post.id },
      order: [[{ model: Comment }, "createdAt", "ASC"]],
      include: [
        {
          model: User, // 게시글 작성자
        },
        {
          model: Image,
        },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        { model: User, as: "Bookmarkers", attributes: ["id"] },
      ],
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"), // 이미지(여러개)를 저장소에 업로드한다.
  async (req, res, next) => {
    // POST /post/images
    // console.log(req.files); // 업로드한 이미지에 대한 정보
    res.json(req.files.map((y) => y.filename));
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
      order: [[{ model: Comment }, "createdAt", "ASC"]],
      include: [
        { model: Image, attributes: ["id", "src"] },
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "profile_img"],
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
    const comments = [];
    const nested_comments = [];
    post.toJSON().Comments.forEach((comment) => {
      if (comment.CommentId) {
        nested_comments.push(comment);
      } else {
        comments.push(comment);
      }
    });

    comments.sort(
      (a, b) =>
        new Date(String(a.createdAt)).getTime() -
        new Date(String(b.createdAt)).getTime()
    );
    nested_comments.sort(
      (a, b) =>
        new Date(String(b.createdAt)).getTime() -
        new Date(String(a.createdAt)).getTime()
    );

    comments.slice().forEach((comment, i) => {
      nested_comments.forEach((nestedComment, j) => {
        if (comment.id === nestedComment.CommentId) {
          comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
        }
      });
    });

    const result = post.toJSON();
    result.Comments = comments;

    console.log(result);
    res.status(200).json(result);
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
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const currentPost = await Post.findOne({
      where: { id: post.id },
      order: [[{ model: Comment }, "createdAt", "ASC"]],
      include: [
        {
          model: User, // 게시글 작성자
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        { model: User, as: "Bookmarkers", attributes: ["id"] },
      ],
    });

    res.status(201).json(currentPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 댓글 추가
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // POST /post/:postId/comment
  try {
    // 존재하는 게시글인지 검사
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });

    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
      ],
    });

    const comments = [];
    const nested_comments = [];

    const jsonComments = fullComments.map((comment) => comment.toJSON());
    jsonComments.forEach((comment) => {
      if (comment.CommentId) {
        nested_comments.push(comment);
      } else {
        comments.push(comment);
      }
    });

    comments.sort(
      (a, b) =>
        new Date(String(a.createdAt)).getTime() -
        new Date(String(b.createdAt)).getTime()
    );
    nested_comments.sort(
      (a, b) =>
        new Date(String(b.createdAt)).getTime() -
        new Date(String(a.createdAt)).getTime()
    );

    comments.slice().forEach((comment, i) => {
      nested_comments.forEach((nestedComment, j) => {
        if (comment.id === nestedComment.CommentId) {
          comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
        }
      });
    });

    res.status(201).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 댓글 삭제
router.delete("/:postId/comment/:commentId", isLoggedIn, async (req, res) => {
  //DELETE /post/:postId/comment/:commentId
  try {
    await Comment.destroy({
      where: {
        id: parseInt(req.params.commentId),
        PostId: parseInt(req.params.postId),
        UserId: req.user.id,
      },
    });

    await Comment.destroy({
      where: {
        PostId: parseInt(req.params.postId),
        CommentId: parseInt(req.params.commentId),
      },
    });

    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [["createdAt", "ASC"]],
      include: [{ model: User, attributes: ["id", "nickname", "profile_img"] }],
    });

    const comments = [];
    const nested_comments = [];

    const jsonComments = fullComments.map((comment) => comment.toJSON());
    jsonComments.forEach((comment) => {
      if (comment.CommentId) {
        nested_comments.push(comment);
      } else {
        comments.push(comment);
      }
    });

    comments.sort(
      (a, b) =>
        new Date(String(a.createdAt)).getTime() -
        new Date(String(b.createdAt)).getTime()
    );
    nested_comments.sort(
      (a, b) =>
        new Date(String(b.createdAt)).getTime() -
        new Date(String(a.createdAt)).getTime()
    );

    comments.slice().forEach((comment, i) => {
      nested_comments.forEach((nestedComment, j) => {
        if (comment.id === nestedComment.CommentId) {
          comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
        }
      });
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 수정
router.patch("/:postId/comment/:commentId", isLoggedIn, async (req, res) => {
  //DELETE /post/:postId/comment
  try {
    await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: parseInt(req.params.commentId),
          PostId: parseInt(req.params.postId),
          UserId: req.user.id,
        },
      }
    );
    const fullComments = await Comment.findAll({
      where: { PostId: parseInt(req.params.postId) },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profile_img"],
        },
      ],
    });

    const comments = [];
    const nested_comments = [];

    const jsonComments = fullComments.map((comment) => comment.toJSON());
    jsonComments.forEach((comment) => {
      if (comment.CommentId) {
        nested_comments.push(comment);
      } else {
        comments.push(comment);
      }
    });

    comments.sort(
      (a, b) =>
        new Date(String(a.createdAt)).getTime() -
        new Date(String(b.createdAt)).getTime()
    );
    nested_comments.sort(
      (a, b) =>
        new Date(String(b.createdAt)).getTime() -
        new Date(String(a.createdAt)).getTime()
    );

    comments.slice().forEach((comment, i) => {
      nested_comments.forEach((nestedComment, j) => {
        if (comment.id === nestedComment.CommentId) {
          comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
        }
      });
    });

    res.status(200).json(comments);
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
      // 존재하는 게시글인지 검사
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

      const nestedComment = await Comment.create({
        content: req.body.content,
        target: req.body.target,
        PostId: parseInt(req.params.postId),
        UserId: req.user.id,
        CommentId: parseInt(req.params.commentId),
      });

      const fullComments = await Comment.findAll({
        where: { PostId: parseInt(req.params.postId) },
        order: [
          ["createdAt", "ASC"],
          // [{ model: Nested_Comment }, "createdAt", "ASC"],
        ],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
        ],
      });

      const comments = [];
      const nested_comments = [];

      const jsonComments = fullComments.map((comment) => comment.toJSON());
      jsonComments.forEach((comment) => {
        if (comment.CommentId) {
          nested_comments.push(comment);
        } else {
          comments.push(comment);
        }
      });

      comments.sort(
        (a, b) =>
          new Date(String(a.createdAt)).getTime() -
          new Date(String(b.createdAt)).getTime()
      );
      nested_comments.sort(
        (a, b) =>
          new Date(String(b.createdAt)).getTime() -
          new Date(String(a.createdAt)).getTime()
      );

      comments.slice().forEach((comment, i) => {
        nested_comments.forEach((nestedComment, j) => {
          if (comment.id === nestedComment.CommentId) {
            comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
          }
        });
      });

      res.status(200).json(comments);
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
      await Comment.destroy({
        where: {
          id: parseInt(req.params.nestedCommentId),
          CommentId: parseInt(req.params.commentId),
          PostId: parseInt(req.params.postId),
          UserId: req.user.id,
        },
      });

      const fullComments = await Comment.findAll({
        where: { PostId: parseInt(req.params.postId) },
        order: [["createdAt", "ASC"]],
        include: [
          { model: User, attributes: ["id", "nickname", "profile_img"] },
        ],
      });

      const comments = [];
      const nested_comments = [];

      const jsonComments = fullComments.map((comment) => comment.toJSON());
      jsonComments.forEach((comment) => {
        if (comment.CommentId) {
          nested_comments.push(comment);
        } else {
          comments.push(comment);
        }
      });

      comments.sort(
        (a, b) =>
          new Date(String(a.createdAt)).getTime() -
          new Date(String(b.createdAt)).getTime()
      );
      nested_comments.sort(
        (a, b) =>
          new Date(String(b.createdAt)).getTime() -
          new Date(String(a.createdAt)).getTime()
      );

      comments.slice().forEach((comment, i) => {
        nested_comments.forEach((nestedComment, j) => {
          if (comment.id === nestedComment.CommentId) {
            comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
          }
        });
      });

      res.status(200).json(comments);
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
    //DELETE /post/:postId/comment/:commentId/nested_comment/:nestedCommentId
    try {
      await Comment.update(
        {
          content: req.body.content,
        },
        {
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
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: User,
            attributes: ["id", "nickname", "profile_img"],
          },
        ],
      });

      const comments = [];
      const nested_comments = [];

      const jsonComments = fullComments.map((comment) => comment.toJSON());
      jsonComments.forEach((comment) => {
        if (comment.CommentId) {
          nested_comments.push(comment);
        } else {
          comments.push(comment);
        }
      });

      comments.sort(
        (a, b) =>
          new Date(String(a.createdAt)).getTime() -
          new Date(String(b.createdAt)).getTime()
      );
      nested_comments.sort(
        (a, b) =>
          new Date(String(b.createdAt)).getTime() -
          new Date(String(a.createdAt)).getTime()
      );

      comments.slice().forEach((comment, i) => {
        nested_comments.forEach((nestedComment, j) => {
          if (comment.id === nestedComment.CommentId) {
            comments.splice(comments.indexOf(comment) + 1, 0, nestedComment);
          }
        });
      });

      res.status(200).json(comments);
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
    await post.addLikers(req.user.id);

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요 취소
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);

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
    await post.addBookmarkers(req.user.id);

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 북마크 취소
router.delete("/:postId/bookmark", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeBookmarkers(req.user.id);

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
