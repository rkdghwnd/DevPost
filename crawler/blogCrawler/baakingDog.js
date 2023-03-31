const puppeteer = require("puppeteer");
const axios = require("axios");
const { Blog } = require("../models");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const baakingDog = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.STATUS === "production",
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    );
    await page.goto("https://blog.encrypted.gg/category");
    await page.waitForSelector(".list-list");
    const blogPosts = await page.evaluate(() => {
      const list = document.querySelectorAll(".list-list > li");
      const posts = [];
      list.forEach((v, i) => {
        const title = v.querySelector("a.list-title").textContent.trim();
        const time = new Date(
          v.querySelector(".list-date").textContent.trim()
        ).getTime();
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
    await page.close();
    await browser.close();
    return blogPosts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = baakingDog;
