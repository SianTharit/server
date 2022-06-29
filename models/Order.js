module.exports = (sequelize, DataTypes) => {
   const Order = sequelize.define(
      "Order",
      {
         totalPrice: {
            type: DataTypes.DECIMAL.UNSIGNED,
         },
      },
      {
         underscored: true,
      }
   );

   Order.associate = (models) => {
      Order.hasMany(models.OrderItem, {
         foreignKey: {
            name: "orderId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      Order.belongsTo(models.User, {
         foreignKey: {
            allowNull: false,
            name: "userId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return Order;
};
