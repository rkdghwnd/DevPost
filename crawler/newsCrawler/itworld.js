const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const itworld = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      executablePath: "/usr/bin/chromium-browser",
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36",
      { timeout: 0 }
    );
    await page.goto("https://www.itworld.co.kr/news/?page=1");
    const articles = await page.evaluate(() => {
      const list = document.querySelectorAll(
        ".card.mb-4.pb-4.card-article.border-0.border-bottom"
      );
      const posts = [];
      list.forEach((v, i) => {
        const imageTag = v.querySelector("img");
        const imageSource = imageTag?.src;
        const title = v.querySelector(".card-title > a").textContent.trim();
        const description = v
          .querySelector("p.card-text.crop-text-2")
          .textContent.split("\n")
          .join("")
          .trim();
        const time = v.querySelector("small.font-color-5").textContent.trim();
        const link = decodeURIComponent(v.querySelector("a").href);

        const oneDay = 1000 * 60 * 60 * 24;
        const now = new Date();
        let formedTime = "";
        if (time.includes("분")) {
          formedTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            time.slice(0, 2),
            time.slice(4, 6)
          ).getTime();
        } else if (time.includes("일 전")) {
          formedTime =
            now.getTime() - oneDay * parseInt(time.split("일 전")[0]);
        } else {
          formedTime = new Date(time).getTime();
        }

        posts.push({
          news_name: "itworld",
          imageSource,
          title,
          description,
          time: formedTime,
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

module.exports = itworld;
