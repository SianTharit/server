const fs = require("fs");
const { Order, CartProduct, Product } = require("../models");

const createError = require("../utils/createError");

exports.createOrder = async (req, res, next) => {
   try {
      const { id } = req.user;
      const { productId } = req.params;
      const { totalPrice } = req.body;
      const order = await Order.create({
         totalPrice,
      });
      // let slip;
      // console.log(req.file);
      // if (req.file) {
      //    const result = await cloundinary.upload(req.file.path);
      //    console.log(result);
      //    slip = result.secure_url;
      // }
      // const addSlip = await Order.create({
      //    paymentStatus,
      //    slip,
      //    productId,
      // });
      res.json(order);
   } catch (err) {
      next(err);
   }
};
