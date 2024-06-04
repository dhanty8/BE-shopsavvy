const {
  Transaction,
  TransactionItem,
  Cart,
  CartItem,
  Product,
  sequelize,
} = require("../models");
const statusMessage = require("../helpers/status.message");

module.exports = {
  createTransaction: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const userId = req.decoded.id;

      const cart = await Cart.findOne({
        where: { userId },
        include: [{ model: CartItem, as: "items" }],
      });

      if (!cart || cart.items.length === 0) {
        return statusMessage(res, 404, false, "Cart is empty or not found");
      }

      let totalPrice = 0;

      const newTransaction = await Transaction.create(
        { userId, status: "pending", paymentStatus: "unpaid" },
        { transaction }
      );
      await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findOne({
            where: { id: item.productId },
          });

          if (!product) {
            throw new Error(`Product with id ${item.productId} not found`);
          }

          totalPrice += product.price * item.quantity;

          return TransactionItem.create(
            {
              transactioId: newTransaction.id,
              productId: item.productId,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
              storeId: product.storeId,
            },
            { transaction }
          );
        })
      );

      newTransaction.totalPrice = totalPrice;
      await newTransaction.save({ transaction });

      await transaction.commit();

      await CartItem.destroy({ where: { cartId: cart.id } });

      statusMessage(
        res,
        201,
        true,
        "Transaction created successfully",
        newTransaction
      );
    } catch (error) {
      await transaction.rollback();
      statusMessage(res, 500, false, error.message);
    }
  },

  getUserTransactions: async (req, res) => {
    try {
      const userId = req.decoded.id;

      const transactions = await Transaction.findAll({
        where: { userId },
        include: [{ model: TransactionItem, as: "items" }],
      });

      statusMessage(
        res,
        200,
        true,
        "Transactions retrieved successfully",
        transactions
      );
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },

  getTransactionDetails: async (req, res) => {
    try {
      const transactionId = req.params.id;

      const transaction = await Transaction.findOne({
        where: { id: transactionId },
        include: [{ model: TransactionItem, as: "items" }],
      });

      if (!transaction) {
        return statusMessage(res, 404, false, "Transaction not found");
      }

      statusMessage(
        res,
        200,
        true,
        "Transaction details retrieved successfully",
        transaction
      );
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};
