const { Transaction, sequelize } = require("../models");
const statusMessage = require("../helpers/status.message");

module.exports = {
  processPayment: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const userId = req.decoded.id;
      const { transactionId, paymentMethod } = req.body;

      const transactionRecord = await Transaction.findOne({
        where: { id: transactionId, userId },
      });

      if (!transactionRecord) {
        return statusMessage(res, 404, false, "Transaction not found");
      }

      transactionRecord.paymentStatus = "paid";
      transactionRecord.paymentMethod = paymentMethod;
      await transactionRecord.save({ transaction });

      await transaction.commit();
      statusMessage(
        res,
        200,
        true,
        "Payment processed successfully",
        transactionRecord
      );
    } catch (error) {
      await transaction.rollback();
      statusMessage(res, 500, false, error.message);
    }
  },
};
