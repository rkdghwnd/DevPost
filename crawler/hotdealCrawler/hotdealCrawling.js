const { HotDeal } = require("../models");
const axios = require("axios");
const fs = require("fs");
const fmkorea = require("./fmkorea");
const ruliweb = require("./ruliweb");

const hotdealCrawling = async () => {
  try {
    const fmkoreaPosts = await fmkorea();
    const ruliwebePosts = await ruliweb();
    const allPosts = [...fmkoreaPosts, ...ruliwebePosts];
    allPosts.sort((a, b) => {
      return b.time - a.time;
    });
    await HotDeal.destroy({ truncate: true });

    for (let i = 0; i < allPosts.length; i++) {
      const hotDealPost = await HotDeal.create({
        site_name: allPosts[i].site_name,
        title: allPosts[i].title,
        time: allPosts[i].time,
        link: allPosts[i].link,
        image: allPosts.imageSource || null
      });

      // if (allPosts[i].imageSource) {
      //   let imageExtension = "not extension";
      //   const lastString =
      //     allPosts[i].imageSource.split(".")[
      //       allPosts[i].imageSource.split(".").length - 1
      //     ];
      //   if (lastString.lastIndexOf(".jpg")) {
      //     imageExtension = ".jpg";
      //   } else if (lastString.lastIndexOf(".jpeg")) {
      //     imageExtension = ".jpeg";
      //   } else if (lastString.lastIndexOf(".webp")) {
      //     imageExtension = ".webp";
      //   } else if (lastString.lastIndexOf(".png")) {
      //     imageExtension = ".png";
      //   } else if (lastString.lastIndexOf(".gif")) {
      //     imageExtension = ".gif";
      //   }

      //   const imageName = encodeURIComponent(allPosts[i].imageSource)
      //     .split(".")
      //     .join("")
      //     .split("?")
      //     .join("")
      //     .split("%")
      //     .join("");
      //   const image = await axios.get(allPosts[i].imageSource, {
      //     responseType: "arraybuffer",
      //   });
      //   fs.writeFileSync(`images/${imageName}${imageExtension}`, image.data);
      //   await HotDeal.update(
      //     {
      //       image: `${imageName}${imageExtension}`,
      //     },
      //     { where: { link: allPosts[i].link } }
      //   );
      // }
    }

    console.log("핫딜 크롤링 끝!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = hotdealCrawling;
