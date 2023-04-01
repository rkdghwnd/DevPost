const jojoldu = require("./jojoldu");
const popeMachine = require("./popeMachine");
const baakingDog = require("./baakingDog");
const outsidersDev = require("./outsidersDev");
const velopert = require("./velopert");
const velog = require("./velog");
const { Blog } = require("../models");
const axios = require("axios");
const fs = require("fs");

const blogCrawling = async () => {
  try {
    const jojolduPosts = await jojoldu();
    const popeMachinePosts = await popeMachine();
    const baakingDogPosts = await baakingDog();
    const outsidersDevPosts = await outsidersDev();
    const velopertPosts = await velopert();
    const velogPosts = await velog();

    const allPosts = [
      ...jojolduPosts,
      ...popeMachinePosts,
      ...baakingDogPosts,
      ...outsidersDevPosts,
      ...velopertPosts,
      ...velogPosts,
    ];
    allPosts.sort((a, b) => {
      return b.time - a.time;
    });
    await Blog.destroy({ truncate: true });
    allPosts.forEach(async (v, i) => {
      const blogPost = await Blog.findOrCreate({
        where: {
          link: v.link,
        },
        defaults: {
          blog_name: v.blog_name,
          title: v.title,
          time: v.time,
          link: v.link,
        },
      });

      if (v.imageSource) {
        const imageName = encodeURIComponent(v.imageSource)
          .split(".")
          .join("")
          .split("?")
          .join("")
          .split("%")
          .join("");
        const imageExtension =
          v.imageSource?.split(".")[v.imageSource?.split(".").length - 1];
        const image = await axios.get(v.imageSource, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(`images/${imageName}-.${imageExtension}`, image.data);
        await Blog.update(
          {
            image: `${imageName}-.${imageExtension}`,
          },
          { where: { link: v.link } }
        );
      }
    });
    console.log("블로그 크롤링 끝!");
  } catch (err) {
    console.error(err);
  }

  // const result = Promise.all([
  //   jojoldu(),
  //   popeMachine(),
  //   baakingDog(),
  //   outsidersDev(),
  //   velopert(),
  //   velog(),
  // ])
  //   .then(async (values) => {
  //     const allPosts = values.flat();
  //     allPosts.sort((a, b) => {
  //       return b.time - a.time;
  //     });
  //     await Blog.destroy({ truncate: true });
  //     allPosts.forEach(async (v, i) => {
  //       const blogPost = await Blog.findOrCreate({
  //         where: {
  //           link: v.link,
  //         },
  //         defaults: {
  //           blog_name: v.blog_name,
  //           title: v.title,
  //           time: v.time,
  //           link: v.link,
  //         },
  //       });

  //       if (v.imageSource) {
  //         const imageName = encodeURIComponent(v.imageSource)
  //           .split(".")
  //           .join("")
  //           .split("?")
  //           .join("")
  //           .split("%")
  //           .join("");
  //         const imageExtension =
  //           v.imageSource?.split(".")[v.imageSource?.split(".").length - 1];
  //         const image = await axios.get(v.imageSource, {
  //           responseType: "arraybuffer",
  //         });
  //         fs.writeFileSync(
  //           `images/${imageName}-.${imageExtension}`,
  //           image.data
  //         );
  //         await Blog.update(
  //           {
  //             image: `${imageName}-.${imageExtension}`,
  //           },
  //           { where: { link: v.link } }
  //         );
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

module.exports = blogCrawling;
