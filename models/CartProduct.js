module.exports = (sequelize, DataTypes) => {
   const CartProduct = sequelize.define(
      "CartProduct",
      {
         amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1,
         },
      },
      {
         underscored: true,
      }
   );

   CartProduct.associate = (models) => {
      CartProduct.belongsTo(models.User, {
         foreignKey: {
            allowNull: false,
            name: "userId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      CartProduct.belongsTo(models.Product, {
         foreignKey: {
            allowNull: false,
            name: "productId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };
   return CartProduct;
};
