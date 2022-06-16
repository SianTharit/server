module.exports = (sequelize, DataTypes) => {
   const ProductStock = sequelize.define(
      "ProductStock",
      {
         size: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
         },
      },
      {
         underscored: true,
      }
   );

   ProductStock.associate = (models) => {
      ProductStock.belongsTo(models.Product, {
         foreignKey: {
            allowNull: false,
            name: "productId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return ProductStock;
};
