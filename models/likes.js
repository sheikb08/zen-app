User = require("./user")
Quote = require("./quote")

module.exports = function(sequelize, DataTypes) {
  const Likes = sequelize.define("Likes", {
    reflection: {
      type: DataTypes.STRING(255)
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    quoteId: {
      type: DataTypes.INTEGER,
      references: {
        model: Quote,
        key: 'id'
      }
    }
  });
  return Likes;
};