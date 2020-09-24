// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model. Sequelize will create an incrementing id as well as a created_at column.
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name cannot contain numbers."
        }
      }
    },
    last_name: {
      type: DataTypes.STRING(100),
      //user does not have to input a last name.
      allowNull: true,
      validate: {
        isAlpha: {
          msg: "Name cannot contain numbers."
        }
      }
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address."
        }
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  // Default Scope defined here not to include password when returning res.json, and to exclude hidden users.
  User.addScope("defaultScope", {
    attributes: { exclude: ["password"] },
    where: { hidden: false }
  });
  // Additional Scope methods to return passwords and to view Hidden.
  // Scopes can be applied in the following manner: `await Project.scope('defaultScope', 'viewHidden').findAll();`
  User.addScope("withPassword", {
    withPassword: { attributes: {} }
  });
  User.addScope("viewHidden", {
    where: { hidden: true }
  });

  return User;
};
