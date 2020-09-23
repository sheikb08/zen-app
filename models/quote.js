module.exports = function(sequelize, DataTypes) {
  const Quote = sequelize.define("Checklist", {
    quote: {
      type: DataTypes.String(255),
      allowNull: false
    },
    quote_author: {
      type: DataTypes.String(255),
      allowNull: false
    },
    image_url: {
      type: DataTypes.String(255),
      allowNull: false
    }
  });
  return Quote;
};
