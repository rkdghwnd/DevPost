const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const fmkorea = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      args: ["--window-size=1920,1080"],
      executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(
      "https://www.fmkorea.com/index.php?mid=hotdeal&category=1254381811",
      { timeout: 0 }
    );
    const articles = await page.evaluate(async () => {
      window.scrollBy(0, 1000);
      await new Promise((page) => setTimeout(page, 1000));
      const list = document.querySelectorAll(".fm_best_widget > ul > li.li");
      const posts = [];
      list.forEach((v, i) => {
        const imageTag = v.querySelector("img.thumb");
        const imageSource = imageTag?.src;
        const title = v
          .querySelector("h3.title > a")
          .textContent.split("\t")
          .join("")
          .trim();
        const price = v
          .querySelector(".hotdeal_info")
          .textContent.split("\t")
          .join("")
          .split("/")[1]
          .slice(4);
        let time = v
          .querySelector("div.li > div:last-child > span:nth-child(2)")
          .textContent.trim();

        const link = decodeURIComponent(v.querySelector("a").href);

        if (time.includes(":")) {
          const timeArr = time.split(":");
          const hour = timeArr[0];
          const minute = timeArr[1];
          time = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            hour,
            minute
          );
        }
        posts.push({
          site_name: "에펨코리아",
          imageSource,
          title: `${title} (${price})`,
          time: new Date(time).getTime(),
          link,
        });
      });
      return posts;
    });

    await page.close();
    await browser.close();
    console.log(articles);
    return articles;
  } catch (err) {
    console.error(err);
  }
};

module.exports = fmkorea;
