const { HotDeal } = require("../models");
const axios = require("axios");
const fs = require("fs");
const fmkorea = require("./fmkorea");
const ruliweb = require("./ruliweb");

const hotdealCrawling = () => {
  const result = Promise.all([fmkorea(), ruliweb()]).then(async (values) => {
    const allPosts = values.flat();
    allPosts.sort((a, b) => {
      return b.time - a.time;
    });
    await HotDeal.destroy({ truncate: true });

    allPosts.forEach(async (v, i) => {
      const newsPost = await HotDeal.findOrCreate({
        where: {
          link: v.link,
        },
        defaults: {
          site_name: v.site_name,
          title: v.title,
          time: v.time,
          link: v.link,
        },
      });

      if (v.imageSource) {
        let imageExtension = "not extension";
        const lastString =
          v.imageSource.split(".")[v.imageSource.split(".").length - 1];
        if (lastString.lastIndexOf(".jpg")) {
          imageExtension = ".jpg";
        } else if (lastString.lastIndexOf(".jpeg")) {
          imageExtension = ".jpeg";
        } else if (lastString.lastIndexOf(".webp")) {
          imageExtension = ".webp";
        } else if (lastString.lastIndexOf(".png")) {
          imageExtension = ".png";
        } else if (lastString.lastIndexOf(".gif")) {
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
        await HotDeal.update(
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

module.exports = hotdealCrawling;
