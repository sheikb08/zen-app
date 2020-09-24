module.exports = function(sequelize, DataTypes) {
  const Quote = sequelize.define("Quote", {
    quote_body: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    quote_author: {
      type: DataTypes.STRING(255),
      defaultValue: "Anonymous"
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });
  return Quote;
};
