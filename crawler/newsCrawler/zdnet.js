const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const zdnet = async () => {
  try {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download("756035");
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      executablePath: "/usr/bin/chromium-browser",
      timeout: 30000 * 10,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    await page.goto("https://zdnet.co.kr/news/?lstcode=0020&page=1", {
      timeout: 0,
    });
    const articles = await page.evaluate(() => {
      const topList = document.querySelectorAll("div.top_news");
      const posts = [];
      topList.forEach((v, i) => {
        const imageTag = v.querySelector(".img > img");
        const imageSource = imageTag?.src;
        const title = v.querySelector(".txt > h2").textContent.trim();
        const time = v
          .querySelector(".txt > p")
          .textContent.split(" 기자 ")[1]
          .trim();
        const link = decodeURIComponent(v.querySelector("a.itemLink").href);

        let formedTime = "";
        if (time.includes("분 전")) {
          formedTime =
            new Date().getTime() - 1000 * 60 * parseInt(time.split("분 전")[0]);
        } else if (time.includes("시간 전")) {
          formedTime =
            new Date().getTime() -
            1000 * 60 * 60 * parseInt(time.split("시간 전")[0]);
        } else {
          formedTime = new Date(time).getTime();
        }

        posts.push({
          news_name: "zdnet",
          imageSource,
          title,
          time: formedTime,
          link,
        });
      });

      const subList = document.querySelectorAll(".sub_news");
      subList.forEach((v, i) => {
        const imageTag = v.querySelector(".img > img");
        const imageSource = imageTag?.src;
        const title = v.querySelector(".txt > h2").textContent.trim();
        const time = v
          .querySelector(".txt > p")
          .textContent.split(" 기자 ")[1]
          .trim();
        const link = decodeURIComponent(v.querySelector("a.itemLink").href);

        let formedTime = "";
        if (time.includes("분 전")) {
          formedTime =
            new Date().getTime() - 1000 * 60 * parseInt(time.split("분 전")[0]);
        } else if (time.includes("시간 전")) {
          formedTime =
            new Date().getTime() -
            1000 * 60 * 60 * parseInt(time.split("시간 전")[0]);
        } else {
          formedTime = new Date(time).getTime();
        }

        posts.push({
          news_name: "zdnet",
          imageSource,
          title,
          time: formedTime,
          link,
        });
      });

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

module.exports = zdnet;
