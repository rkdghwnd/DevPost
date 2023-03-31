module.exports = (sequelize, DataTypes) => {
  const Nested_Comment = sequelize.define(
    "Nested_Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
      target: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
    },
    {
      chaset: "utf8mb4", // 유니코드 설정, 설정해야 한글 사용가능, mb4 : 이모티콘 사용 가능
      collate: "utf8mb4_general_ci", // 한글 저장, mb4 : 이모티콘 사용 가능
    }
  );
  Nested_Comment.associate = (db) => {
    db.Nested_Comment.belongsTo(db.User);
    db.Nested_Comment.belongsTo(db.Post);
    db.Nested_Comment.belongsTo(db.Comment);
  };

  return Nested_Comment;
};
