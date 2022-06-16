const {
   CartProduct,
   Product,
   ProductStock,
   ProductImage,
} = require("../models");

const createError = require("../utils/createError");

exports.getCartByUserId = async (req, res, next) => {
   try {
      console.log(req.user.id);
      const cart = await CartProduct.findAll({
         where: { userId: req.user.id },
         include: [
            {
               model: Product,
               include: [{ model: ProductStock }, { model: ProductImage }],
            },
         ],
      });
      res.json({ cart });
   } catch (err) {
      next(err);
   }
};

// add one to cart
exports.createCart = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const products = await Product.findOne({
         where: { id: productId },
         include: [{ model: ProductImage }, { model: ProductStock }],
      });
      if (!products) {
         createError("products not found", 400);
      }
      const cartProduct = await CartProduct.create({
         productId,
         userId: req.user.id,
      });
      let cart = {};
      const productCart = JSON.parse(JSON.stringify(cartProduct));
      const product = JSON.parse(JSON.stringify(products));

      console.log(JSON.parse(JSON.stringify(products)));

      cart = productCart;
      cart.Product = product;
      console.log(cart);
      res.status(201).json({ cart });
   } catch (err) {
      next(err);
   }
};

exports.updateCart = async (req, res, next) => {
   try {
      const { amount } = req.body;
      const { id } = req.params;
      const cart = await CartProduct.findOne({ where: { id } });
      if (!cart) {
         createError("cart is not found", 404);
      }
      const cartUpdate = await CartProduct.update(
         { amount },
         { where: { id } }
      );
      res.status(201).json({ cartUpdate });
   } catch (err) {
      next(err);
   }
};

// destroy cart
exports.deleteCart = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const cart = await CartProduct.findOne({ where: { id: productId } });
      if (!cart) {
         createError("cart is not found", 404);
      }
      await cart.destroy();
      res.status(204).json({ cart });
   } catch (err) {
      next(err);
   }
};

// destroy all product
exports.clearCart = async (req, res, next) => {
   try {
      const { id } = req.user;
      const cart = await CartProduct.findAll({
         where: { userId: id },
      });
      if (!cart) {
         createError("cart is not found", 404);
      }
      await CartProduct.destroy({ where: { userId: id } });
      res.status(204).json({ cart });
   } catch (err) {
      next(err);
   }
};

// exports.totalAmount = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const cart = await CartProduct.findAll({
//             where: { userId: id },
//         });
//         if (!cart) {
//             createError("cart is not found", 404);
//         }
//         let total = 0;
//         cart.forEach((item) => {
//             total += item.amount * item.product.price;
//         });
//         res.status(200).json({ total });
//     } catch (err) {
//         next(err);
//     }
// }
