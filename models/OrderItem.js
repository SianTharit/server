module.exports = (sequelize, DataTypes) => {
   const OrderItem = sequelize.define(
      "OrderItem",
      {
         orderAmount: {
            type: DataTypes.INTEGER.UNSIGNED,
            validate: {
               notEmpty: true,
            },
         },
      },
      {
         underscored: true,
         paranoid: true,
      }
   );

   OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.User, {
         foreignKey: {
            allowNull: false,
            name: "userId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      OrderItem.belongsTo(models.Order, {
         foreignKey: {
            allowNull: false,
            name: "orderId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return OrderItem;
};
