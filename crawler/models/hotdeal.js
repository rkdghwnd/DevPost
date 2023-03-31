const Sequelize = require("sequelize");

module.exports = class HotDeal extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        site_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        time: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING(200),
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
