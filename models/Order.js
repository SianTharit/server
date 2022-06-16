module.exports = (sequelize, DataTypes) => {
   const Order = sequelize.define(
      "Order",
      {
         paymentStatus: {
            type: DataTypes.ENUM("PENDING, PAID, CANCELLED"),
            allowNull: false,
            defaultValues: "PENDING",
         },
         totalPrice: {
            type: DataTypes.DECIMAL.UNSIGNED,
         },
      },
      {
         underscored: true,
         paranoid: true,
      }
   );

   Order.associated = (models) => {
      Order.hasMany(models.OrderItem, {
         foreignKey: {
            name: "orderId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   Order.associate = (models) => {
      Order.belongsTo(models.Product, {
         foreignKey: {
            allowNull: false,
            name: "productId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return Order;
};
