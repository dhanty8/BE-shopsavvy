"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionItem.belongsTo(models.Transaction, {
        foreignKey: "transactioId",
        as: "cart",
      });
    }
  }
  TransactionItem.init(
    {
      transactioId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionItem",
    }
  );
  return TransactionItem;
};
