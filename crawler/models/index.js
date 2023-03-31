const Sequelize = require("sequelize");
const Blog = require("./blog");
const News = require("./news");
const HotDeal = require("./hotdeal");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Blog = Blog;
db.HotDeal = HotDeal;
db.News = News;

Blog.init(sequelize);
News.init(sequelize);
HotDeal.init(sequelize);

module.exports = db;
