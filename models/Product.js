module.exports = (sequelize, DataTypes) => {
   const Product = sequelize.define(
      "Product",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
         },
         gender: {
            type: DataTypes.ENUM("Men", "Women"),
         },
         ageGroup: {
            type: DataTypes.ENUM("Adult", "Children"),
         },
         description: DataTypes.STRING,
         discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
      },
      {
         underscored: true,
      }
   );

   Product.associate = (models) => {
      Product.hasMany(models.Order, {
         foreignKey: {
            name: "productId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      Product.hasMany(models.ProductStock, {
         foreignKey: {
            name: "productId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      Product.hasMany(models.ProductImage, {
         foreignKey: {
            name: "productId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      Product.hasMany(models.CartProduct, {
         foreignKey: {
            name: "productId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return Product;
};
