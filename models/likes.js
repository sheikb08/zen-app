module.exports = function (sequelize, DataTypes) {
    const Likes = sequelize.define("Likes", {
        quote: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        quote_author: {
            type: DataTypes.STRING(100)
        },
        reflection: {
            type: DataTypes.STRING(255)
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        }
    });
    return Likes;
};