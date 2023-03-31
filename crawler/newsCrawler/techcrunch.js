const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const techcrunch = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      executablePath: "/usr/bin/chromium-browser",
      timeout: 30000 * 10,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    await page.goto("https://techcrunch.com/category/apps/", { timeout: 0 });

    const articles = await page.evaluate(() => {
      const list = document.querySelectorAll("article.post-block");
      const posts = [];
      list.forEach((v, i) => {
        const imageTag = v.querySelector("img");
        const imageSource = imageTag?.src.split("?w=")[0];
        const title = v
          .querySelector("a.post-block__title__link")
          .textContent.trim();
        const description = v
          .querySelector("div.post-block__content")
          .textContent.trim();
        const time = v
          .querySelector("article.post-block time")
          .textContent.trim();
        const link = decodeURIComponent(
          v.querySelector("a.post-block__title__link").href
        );

        const formedTime = new Date(time.split("•").join("")).getTime();

        posts.push({
          news_name: "techcrunch",
          imageSource,
          title,
          description,
          time: formedTime,
          link: link.slice(0, link.length - 1),
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

module.exports = techcrunch;
