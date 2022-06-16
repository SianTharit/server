const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/createError");
const { Product, ProductImage, ProductStock, sequelize } = require("../models");
const { Op } = require("sequelize");

// get All products with images
exports.getAllProducts = async (req, res, next) => {
   try {
      const product = await Product.findAll({
         include: [{ model: ProductImage }, { model: ProductStock }],
      });

      res.json({ product });
   } catch (err) {
      next(err);
   }
};

exports.getSearch = async (req, res, next) => {
   try {
      const product = await Product.findAll({
         where: { name: { [Op.like]: "%nike%" } },
      });
      res.json({ product });
   } catch (err) {
      next(err);
   }
};

exports.getProductById = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const product = await Product.findOne({
         where: {
            id: productId,
         },
         include: [{ model: ProductImage }, { model: ProductStock }],
      });
      res.json({ product });
   } catch (err) {
      next(err);
   }
};

exports.updateProduct = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const { price, discount, name } = req.body;
      const product = await Product.findOne({
         where: {
            id: productId,
         },
      });

      if (!product) {
         createError("product not found", 400);
      }

      const productUpdate = await Product.update(
         {
            price,
            discount,
            name,
         },
         { where: { id: productId } }
      );
      res.status(200).json({ productUpdate });
   } catch (err) {
      next(err);
   }
};

exports.getProductsSale = async (req, res, next) => {
   try {
      const products = await Product.findAll({
         where: {
            discount: {
               [Op.gt]: 0,
            },
         },
         include: [{ model: ProductImage }, { model: ProductStock }],
      });
      res.json({ products });
   } catch (err) {
      next(err);
   }
};

// create Product with description
exports.createProduct = async (req, res, next) => {
   try {
      const {
         name,
         price,
         gender,
         description,
         ageGroup,
         discount,
         amount,
         size,
      } = req.body;
      console.log(name);
      if (!name) {
         createError("name is required", 400);
      }
      if (!price) {
         createError("price is required", 400);
      }
      if (!description) {
         createError("description is required", 400);
      }
      if (!amount) {
         createError("amount is required", 400);
      }
      if (!size) {
         createError("size is required", 400);
      }
      const product = await Product.create({
         name,
         price,
         gender,
         description,
         ageGroup,
         discount,
      });

      const stock = await ProductStock.create({
         amount,
         size,
         productId: product.id,
      });
      console.log(product.id);

      // let photo = [{productId: product.id , image: "https://res.cloudinary.com/dzqbzqjqw/image/upload/v1599098981/product-image-1_qjqjqj.jpg"}];
      let photo = [];
      // let images = [];
      console.log(req.files);
      if (req.files) {
         for (const file of req.files) {
            // const obj = { productId: product.id };
            const result = await cloudinary.upload(file.path);
            // obj.image = result.secure_url;
            photo = [
               ...photo,
               { productId: product.id, image: result.secure_url },
            ];
            // console.log(product.id, result.secure_url);
            // images.push(images.result.secure_url);
         }
      }
      console.log(photo);

      // await t.commit();
      const multi = await ProductImage.bulkCreate(photo);

      res.json({ product, multi, stock });
   } catch (err) {
      // await t.rollback;
      next(err);
   }
};

// create Stock && size
exports.createStock = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const { size, amount } = req.body;
      if (!size) {
         createError("size is required", 400);
      }
      const stock = await ProductStock.create({
         size,
         amount,
         productId,
      });
      res.json({ stock });
   } catch (err) {
      next(err);
   }
};

// create Single Image to Product
exports.addImage = async (req, res, next) => {
   try {
      const { productId } = req.params;
      let images;
      console.log(req.file);
      if (req.file) {
         const result = await cloudinary.upload(req.file.path);
         console.log(result);
         images = result.url;
      }
      const adding = await ProductImage.create({
         productId: productId,
         image: images,
      });
      res.status(201).json({
         adding,
      });
   } catch (err) {
      next(err);
   } finally {
      if (req.files) {
         fs.unlinkSync(req.files.path);
      }
   }
};

// create multiple images
exports.multiImage = async (req, res, next) => {
   try {
      const { productId } = req.params;

      let images = [];
      if (req.files) {
         for (const file of req.files) {
            const obj = { productId };
            const result = await cloudinary.upload(file.path);
            obj.image = result.secure_url;
            images.push(obj);
         }
      }
      console.log(images);
      const multi = await ProductImage.bulkCreate(images);
      res.status(201).json({
         multi,
      });
   } catch (err) {
      next(err);
   } finally {
      if (req.files) {
         for (const file of req.files) {
            console.log(file);
            fs.unlinkSync(file.path);
         }
      }
   }
};

// delete Products
exports.deleteProduct = async (req, res, next) => {
   try {
      const { productId } = req.params;
      const product = await Product.findOne({
         where: { id: productId },
         include: [{ model: ProductStock }, { model: ProductImage }],
      });
      // console.log(product);
      if (!product) {
         createError("product not found", 400);
      }
      await ProductStock.destroy({ where: { productId } });
      await ProductImage.destroy({ where: { productId } });

      // careful async ซ้อน async มันจะแตก
      // product.ProductImages.forEach(async (el) => {
      //    if (el.image) {
      //       const splited = el.image.split("/");
      //       const publicId = splited[splited.length - 1].split(".")[0];
      //       await cloudinary.destroy(publicId);
      //    }
      // });

      for (const el of product.ProductImages) {
         if (el.image) {
            const splited = el.image.split("/");
            const publicId = splited[splited.length - 1].split(".")[0];
            await cloudinary.destroy(publicId);
         }
      }

      await Product.destroy({ where: { id: productId } });

      res.status(204).json();
   } catch (err) {
      next(err);
   }
};
