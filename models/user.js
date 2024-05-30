"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Store);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: {
        type: DataTypes.STRING,
        validate: {
          isUnique: async (value) => {
            const user = await User.findOne({ where: { userName: value } });

            if (user) throw new Error("Username is already used!");
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "email format wrong!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          checkPassword: (value) => {
            const regexPassword =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            if (!regexPassword.test(String(value))) {
              throw new Error(
                "password at least six characters, at least one letter, one number and one symbol "
              );
            }
          },
        },
      },
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  });

  return User;
};
