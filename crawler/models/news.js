const Sequelize = require("sequelize");

module.exports = class News extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        news_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        time: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
        link: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
