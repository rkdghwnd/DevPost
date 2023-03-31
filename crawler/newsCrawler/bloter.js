const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const bloter = async () => {
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
    await page.goto(
      "https://www.bloter.net/news/articleList.html?sc_section_code=S1N4&view_type=sm",
      { timeout: 0 }
    );
    const articles = await page.evaluate(() => {
      const list = document.querySelectorAll("ul.type2 > li");
      const posts = [];
      list.forEach((v, i) => {
        const imageTag = v.querySelector("img");
        const imageSource = imageTag?.src;
        const title = v.querySelector("h2.titles").textContent.trim();
        const description = v.querySelector("p.lead > a").textContent.trim();
        const time = v
          .querySelector("span.byline > em:last-child")
          .textContent.trim();
        const link = decodeURIComponent(v.querySelector("a").href);

        const formedTime = new Date(time).getTime();

        posts.push({
          news_name: "bloter",
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

module.exports = bloter;
