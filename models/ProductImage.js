module.exports = (sequelize, DataTypes) => {
   const ProductImage = sequelize.define(
      "ProductImage",
      {
         image: {
            type: DataTypes.STRING,
         },
         isHero: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
      },
      {
         underscored: true,
      }
   );

   ProductImage.associate = (models) => {
      ProductImage.belongsTo(models.Product, {
         foreignKey: {
            allowNull: false,
            name: "productId",
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };

   return ProductImage;
};
