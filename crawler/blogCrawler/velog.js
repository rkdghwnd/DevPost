const puppeteer = require("puppeteer");
const axios = require("axios");
const { Blog } = require("../models");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const velog = async () => {
  try {
    const revisionInfo = await browserFetcher.download("756035");
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
      executablePath: "/usr/bin/chromium-browser",
      timeout: 0,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    await page.goto("https://velog.io/");
    await page.waitForSelector("main > div > div");
    const blogPosts = await page.evaluate(() => {
      const list = document.querySelectorAll("main > div > div");
      const posts = [];
      list.forEach((v, i) => {
        const imageTag = v.querySelector(".sc-khQegj img");
        const imageSource = imageTag?.src;
        const title = v.querySelector("h4").textContent.trim();
        const time = v.querySelector("div.sub-info > span").textContent.trim();
        const link = decodeURIComponent(v.querySelector("a").href);

        const now = new Date();
        let formedTime = "";
        if (time.includes("일 전")) {
          formedTime = now.setDate(now.getDate() - Number(time.split("일")[0]));
        } else if (time.includes("어제")) {
          formedTime = now.setDate(now.getDate() - 1);
        } else if (time.includes("시간 전")) {
          formedTime =
            new Date().getTime() -
            1000 * 60 * 60 * parseInt(time.split("시간 전")[0].split("약 ")[1]);
        } else {
          formedTime = new Date(
            time
              .split(" ")
              .map((v, i) => {
                const strArr = v.split("");
                strArr.pop();
                return strArr.join("");
              })
              .join("-")
          ).getTime();
        }

        posts.push({
          blog_name: "velog",
          imageSource,
          title,
          time: formedTime,
          link,
        });
      });
      return posts;
    });
    await page.close();
    await browser.close();
    return blogPosts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = velog;
