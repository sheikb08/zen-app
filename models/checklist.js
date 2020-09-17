module.exports = function(sequelize, DataTypes) {
  const Checklist = sequelize.define("Checklist", {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    }
  });
  return Checklist;
};
