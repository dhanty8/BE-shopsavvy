const { Product, Store } = require("../models");
const { Op } = require("sequelize");

const statusMessage = require("../helpers/status.message");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const userId = req.decoded.id;
      const store = await Store.findOne({ where: { userId } });

      const payload = { storeId: store.id, ...req.body };

      const product = await Product.create(payload);

      statusMessage(res, 201, true, "Product created!", product);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  getProducts: async (req, res) => {
    try {
      const product = await Product.findAll();

      statusMessage(res, 201, true, "Get Products!", product);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findOne({ where: { id: { [Op.eq]: id } } });

      statusMessage(res, 201, true, "Get Products!", product);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.decoded.id;

      // Find the store that belongs to the user
      const store = await Store.findOne({ where: { userId } });

      if (!store) {
        return statusMessage(res, 404, false, "Store not found");
      }

      // Find the product and ensure it belongs to the user's store
      const product = await Product.findOne({
        where: { id: productId, storeId: store.id },
      });

      if (!product) {
        return statusMessage(
          res,
          404,
          false,
          "Product not found or not authorized to delete"
        );
      }

      // Delete the product
      await Product.destroy({ where: { id: productId } });

      statusMessage(res, 200, true, "Delete product successful!", {});
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};
