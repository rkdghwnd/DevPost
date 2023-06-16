const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const techneedle = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      args: [
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--no-zygote",
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    const articles = [];
    for (let i = 1; i <= 2; i++) {
      const query = i === 1 ? "" : `page/${i}`;
      await page.goto(`https://techneedle.com/${query}`);

      const newsPage = await page.evaluate(() => {
        const posts = [];
        const list = document.querySelectorAll("#post-wrapper > article");
        list.forEach((v, i) => {
          const imageTag = v.querySelector("img");
          const imageSource = imageTag?.src.split("?fit")[0];
          const title = v.querySelector(".entry-title > a").textContent.trim();
          const description = v.querySelector("p").textContent.trim();
          const time = v.querySelector("time.entry-date").textContent.trim();
          const link = decodeURIComponent(
            v.querySelector(".entry-title > a").href
          );

          const formedTime = new Date(time).getTime();

          posts.push({
            news_name: "techneedle",
            imageSource,
            title,
            description,
            time: formedTime,
            link,
          });
        });
        return posts;
      });
      articles.push(...newsPage);
    }

    await page.close();
    await browser.close();
    console.log(articles);
    return articles;
  } catch (err) {
    console.error(err);
  }
};

module.exports = techneedle;
