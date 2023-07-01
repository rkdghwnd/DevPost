module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(50), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      introduce: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      snsId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      profile_img: {
        type: DataTypes.STRING(200),
        defaultValue: "basic-profile-image.png",
      },
      withdraw: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      chaset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // db.User.hasMany(db.Nested_Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    // 좋아요 기능, through : N : M 관계테이블 이름 설정, as : 관계에 대한 별칭(상대에 대한)
    db.User.belongsToMany(db.Post, { through: "Bookmark", as: "Bookmarked" });
    // 좋아요 기능, through : N : M 관계테이블 이름 설정, as : 관계에 대한 별칭(상대에 대한)
  };

  return User;
};
