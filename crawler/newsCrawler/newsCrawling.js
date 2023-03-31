const bloter = require("./bloter");
const itworld = require("./itworld");
const techcrunch = require("./techcrunch");
const techneedle = require("./techneedle");
const zdnet = require("./zdnet");
const { News } = require("../models");
const axios = require("axios");
const fs = require("fs");

const newsCrawling = () => {
  const result = Promise.all([
    bloter(),
    techcrunch(),
    itworld(),
    techneedle(),
    zdnet(),
  ]).then(async (values) => {
    const allPosts = values.flat();
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
        },
      });

      if (v.imageSource) {
        let imageExtension = "not extension";
        if (v.imageSource.includes(".jpg")) {
          imageExtension = ".jpg";
        } else if (v.imageSource.includes(".jpeg")) {
          imageExtension = ".jpeg";
        } else if (v.imageSource.includes(".webp")) {
          imageExtension = ".webp";
        } else if (v.imageSource.includes(".png")) {
          imageExtension = ".png";
        } else if (v.imageSource.lastIndexOf(".gif")) {
          imageExtension = ".gif";
        }

        const imageName = encodeURIComponent(v.imageSource)
          .split(".")
          .join("")
          .split("?")
          .join("")
          .split("%")
          .join("");
        const image = await axios.get(v.imageSource, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(`images/${imageName}${imageExtension}`, image.data);
        await News.update(
          {
            image: `${imageName}${imageExtension}`,
          },
          { where: { link: v.link } }
        );
      }
    });
    console.log("뉴스 크롤링 끝 !");
  });
  result.catch((err) => {
    console.error(err);
  });
};

module.exports = newsCrawling;
