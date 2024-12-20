const { News } = require("../models");
const axios = require("axios");
const fs = require("fs");
const bloter = require("./bloter");
const itworld = require("./itworld");
const techneedle = require("./techneedle");
const zdnet = require("./zdnet");

const newsCrawling = async () => {
  try {
    const bloterPosts = await bloter();
    // const itworldPosts = await itworld();
    const techneedlePosts = await techneedle();
    const zdnetPosts = await zdnet();

    const allPosts = [
      ...bloterPosts,
      // ...itworldPosts,
      ...techneedlePosts,
      ...zdnetPosts,
    ];
    allPosts.sort((a, b) => {
      return b.time - a.time;
    });
    await News.destroy({ truncate: true });
    allPosts.forEach(async (v, i) => {
      const newsPost = await News.findOrCreate({
        where: {
          link: v.link,
        },
        defaults: {
          news_name: v.news_name,
          description: v?.description?.slice(0, 200),
          title: v.title,
          time: v.time,
          link: v.link,
          image:v.imageSource || null
        },
      });

      // if (
      //   v.imageSource &&
      //   v.imageSource !== "https://zdnet.co.kr/images/default.png?ver=20220905"
      // ) {
      //   let imageExtension = "not extension";
      //   if (v.imageSource.includes(".jpg")) {
      //     imageExtension = ".jpg";
      //   } else if (v.imageSource.includes(".jpeg")) {
      //     imageExtension = ".jpeg";
      //   } else if (v.imageSource.includes(".webp")) {
      //     imageExtension = ".webp";
      //   } else if (v.imageSource.includes(".png")) {
      //     imageExtension = ".png";
      //   } else if (v.imageSource.lastIndexOf(".gif")) {
      //     imageExtension = ".gif";
      //   }

      //   const imageName = encodeURIComponent(v.imageSource)
      //     .split(".")
      //     .join("")
      //     .split("?")
      //     .join("")
      //     .split("%")
      //     .join("");

      //   const image = await axios.get(v.imageSource, {
      //     responseType: "arraybuffer",
      //     timeout:3000 * 10
      //   });
      //   fs.writeFileSync(`images/${imageName}${imageExtension}`, image.data);
      //   await News.update(
      //     {
      //       image: `${imageName}${imageExtension}`,
      //     },
      //     { where: { link: v.link } }
      //   );
      // }
    });
    console.log("뉴스 크롤링 끝 !");
  } catch (err) {
    console.error(err);
  }
};

module.exports = newsCrawling;
