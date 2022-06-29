const {
   sequelize,
   User,
   Product,
   ProductImage,
   ProductStock,
   CartProduct,
} = require("./models");

const bcrypt = require("bcryptjs");

let userData = [
   {
      username: "Barky",
      email: "Barky@gmail.com",
      password: bcrypt.hashSync("123456", 12),
   },
];

// let productData = [
//    {
//       name: "Nike Air Max 270 G",
//       price: "229.00",
//       gender: "Men",
//       ageGroup: "Adult",
//       description:
//          "Look legendary in the Nike Air Max 270 G. The silhouette is a stitch-for-stitch reconstruction of the original big Air icon, with the addition of breathable mesh and innovative traction that performs at the highest level of play.",
//       discount: "0.10",
//    },
// ];

// let ProductImageData = [
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486948/ifhvimosnjmz9cncc8km.webp",
//       productId: 1,
//    },
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486951/ovfnx3npdm3spj1u2pmp.jpg",
//       productId: 1,
//    },
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486946/glfee5byl2funu3whebz.webp",
//       productId: 1,
//    },
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486944/c1j2ei4uwqmudgg3snpu.webp",
//       productId: 1,
//    },
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486942/c3nsuuq7nvqmo4sfi11b.webp",
//       productId: 1,
//    },
//    {
//       image: "https://res.cloudinary.com/dtbxsusa5/image/upload/v1654486940/v0fzqne5rd8a14hd0tsh.webp",
//       productId: 1,
//    },
// ];

// let ProductStockData = [
//    {
//       size: "US 10",
//       amount: 10,
//       productId: 1,
//    },
//    {
//       size: "US 11",
//       amount: 10,
//       productId: 1,
//    },
// ];

// let CartProductData = [
//    {
//       amount: 5,
//       productId: 1,
//       userId: 1,
//    },
// ];

const seedData = async () => {
   try {
      await sequelize.sync({ force: true });
      let user_res = await User.bulkCreate(userData);
      // let product_res = await Product.bulkCreate(productData);
      // let productImage_res = await ProductImage.bulkCreate(ProductImageData);
      // let productStock_res = await ProductStock.bulkCreate(ProductStockData);
      // let cartProduct_res = await CartProduct.bulkCreate(CartProductData);
   } catch (err) {
      console.log(err);
   } finally {
      process.exit(0);
   }
};

seedData();
