const { Cart, CartItem, Product } = require("../models");
const statusMessage = require("../helpers/status.message");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const userId = req.decoded.id;
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        return statusMessage(res, 404, false, "Product not found");
      }

      let cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        cartItem = await CartItem.create({
          cartId: cart.id,
          productId,
          quantity,
        });
      }

      statusMessage(res, 201, true, "Product added to cart", cartItem);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.decoded.id;

      // Find the user's cart
      const cart = await Cart.findOne({
        where: { userId },
        include: [
          {
            model: CartItem,
            as: "items",
            attributes: ["id", "quantity"],
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "stock", "price"],
              },
            ],
          },
        ],
      });

      if (!cart) {
        return statusMessage(res, 404, false, "Cart not found");
      }

      statusMessage(res, 200, true, "Cart retrieved", cart);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const userId = req.decoded.id;
      const { productId } = req.body;

      const cart = await Cart.findOne({ where: { userId } });

      if (!cart) {
        return statusMessage(res, 404, false, "Cart not found");
      }

      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      if (!cartItem) {
        return statusMessage(res, 404, false, "Product not found in cart");
      }

      await CartItem.destroy({ where: { id: cartItem.id } });

      statusMessage(res, 200, true, "Product removed from cart", {});
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};
