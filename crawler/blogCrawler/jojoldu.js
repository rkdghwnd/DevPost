const puppeteer = require("puppeteer");
const axios = require("axios");
const { Blog } = require("../models");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const jojoldu = async () => {
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
      const query = i === 1 ? "" : `?page=${i}`;
      await page.goto(`https://jojoldu.tistory.com/category${query}`);
      await page.waitForSelector("div.post-item");
      const blogPage = await page.evaluate(() => {
        const list = document.querySelectorAll("div.post-item");
        const posts = [];
        list.forEach((v, i) => {
          const imageTag = v.querySelector("img");
          const imageSource = imageTag?.src;
          const title = v.querySelector(".title").textContent.trim();
          const time = new Date(
            v.querySelector(".date").textContent.trim()
          ).getTime();
          const link = decodeURIComponent(v.querySelector("a").href);
          posts.push({
            blog_name: "jojoldu",
            imageSource,
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

module.exports = jojoldu;
