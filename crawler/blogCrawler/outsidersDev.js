const puppeteer = require("puppeteer");
const axios = require("axios");
const { Blog } = require("../models");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const outsidersDev = async () => {
  try {
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
    await page.goto("https://blog.outsider.ne.kr/category");
    await page.waitForSelector(".post");
    const blogPosts = await page.evaluate(() => {
      const list = document.querySelectorAll(".post");
      const posts = [];
      list.forEach((v, i) => {
        const title = v.querySelector("a").textContent.trim();
        const time = new Date(
          v.querySelector("dd.postmetadata").textContent.split(" | ")[0].trim()
        ).getTime();
        const link = decodeURIComponent(v.querySelector("a").href);
        posts.push({
          blog_name: "outsider'sDev",
          title,
          time,
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

module.exports = outsidersDev;
