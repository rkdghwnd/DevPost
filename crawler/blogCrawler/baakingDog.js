const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const baakingDog = async () => {
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

    const blogPosts = [];

    for (let i = 1; i <= 2; i++) {
      const query = i === 1 ? `` : `?page=${i}`;
      await page.goto(`https://blog.encrypted.gg/category${query}`);
      await page.waitForSelector(".list-list");
      const blogPage = await page.evaluate(() => {
        const list = document.querySelectorAll(".list-list > li");
        const posts = [];
        list.forEach((v, i) => {
          const title = v.querySelector("a.list-title").textContent.trim();
          let time = new Date(
            v.querySelector(".list-date").textContent.trim()
          ).getTime();
          if (!time) {
            time = new Date().getTime();
          }
          const link = decodeURIComponent(v.querySelector("a.list-title").href);
          posts.push({
            blog_name: "baakingDog",
            title,
            time,
            link,
          });
        });
        return posts;
      });
      console.log(blogPage);
      blogPosts.push(...blogPage);
    }

    await page.close();
    await browser.close();
    return blogPosts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = baakingDog;
