module.exports = function(sequelize, DataTypes) {
  const Checklist = sequelize.define("Checklist", {
    body: {
      type: DataTypes.STRING(255),
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });
  return Checklist;
};
