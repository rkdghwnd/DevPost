const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const ruliweb = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      executablePath: "/usr/bin/chromium-browser",
      timeout: 0,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    await page.goto("https://bbs.ruliweb.com/market/board/1020?&cate=11", {
      timeout: 0,
    });

    const articles = await page.evaluate(() => {
      const list = document.querySelectorAll(
        ".table_body.blocktarget.default_list"
      );
      const posts = [];
      for (let i = 0; i < list.length; i++) {
        const title = list[i]
          .querySelector("a.subject_link")
          .textContent.trim();
        let time = list[i].querySelector(".time").textContent.split(" ")[2];
        const link = decodeURIComponent(list[i].querySelector("a.deco").href);
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
          site_name: "루리웹",
          title,
          time: new Date(time).getTime(),
          link,
        });
      }
      console.log(list);
      return posts;
    });

    // await page.close();
    // await browser.close();
    console.log(articles);
    return articles;
  } catch (err) {
    console.error(err);
  }
};

module.exports = ruliweb;
