"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasOne(models.Store);
      Product.belongsTo(models.Store);

      // Product has many CartItems
      Product.hasMany(models.CartItem);

      // Product has many TransactionItems
      // Product.hasMany(models.TransactionItem);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
