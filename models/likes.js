module.exports = function(sequelize, DataTypes) {
  const Likes = sequelize.define("Likes", {
    reflection: {
      type: DataTypes.STRING(255)
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  // User is One-To-Many to Likes
  // - a User has many Likes
  // - a Likes belongs to one User
  User.hasMany(Likes);
  Likes.belongsTo(User);

  // Quote is One-To-Many to Likes
  // - a Quote has many Likes
  // - a Likes belongs to one Quote
  Quote.hasMany(Likes);
  Likes.belongsTo(Quote);

  return Likes;
};
