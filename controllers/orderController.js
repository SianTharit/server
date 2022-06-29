const fs = require("fs");
const {
   Order,
   CartProduct,
   Product,
   OrderItem,
   ProductImage,
} = require("../models");

const createError = require("../utils/createError");

exports.createOrder = async (req, res, next) => {
   try {
      const { id } = req.user;

      const { totalPrice, orderItems } = req.body;

      if (!totalPrice) {
         createError("totalPrice is required", 400);
      }

      const order = await Order.create({
         totalPrice,
         userId: id,
      });

      if (!order) {
         createError("order not found", 400);
      }

      console.log("after order");

      // const tmp = [
      //    { productId: "1", name: "nike", amount: 2, orderId },
      //    { productId: "2", name: "nikeee", amount: 2, orderId },
      // ];

      const newOrderItems = orderItems.map((el) => {
         return {
            productId: el.productId,
            orderAmount: el.amount,
            orderId: order.id,
         };
      });
      console.log(newOrderItems);

      const orderItem = await OrderItem.bulkCreate([...newOrderItems]);
      if (!orderItem) {
         createError("order item not found", 400);
      }
      res.json({ order, orderItem });
   } catch (err) {
      next(err);
   }
};

exports.getOrder = async (req, res, next) => {
   try {
      const { id } = req.user;
      const order = await Order.findAll({
         where: { userId: id },
         include: {
            model: OrderItem,
            include: { model: Product, include: { model: ProductImage } },
         },
      });
      console.log("order here");
      console.log(order);

      if (!order) {
         createError("order not found", 400);
      }

      res.json({ order });
   } catch (err) {
      next(err);
   }
};
