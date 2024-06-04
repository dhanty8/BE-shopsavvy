"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
      Transaction.hasMany(models.TransactionItem, {
        foreignKey: "transactioId",
        as: "items",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "completed", "cancelled"]],
        },
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unpaid",
        validate: {
          isIn: [["unpaid", "paid", "failed"]],
        },
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
