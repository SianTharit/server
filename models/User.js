module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define(
      "User",
      {
         username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
               notEmpty: true,
            },
         },
         firstName: {
            type: DataTypes.STRING,
            validate: {
               notEmpty: true,
            },
         },
         lastName: {
            type: DataTypes.STRING,
            validate: {
               notEmpty: true,
            },
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               notEmpty: true,
               len: [6, 100],
            },
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               isEmail: true,
            },
         },
         phoneNumber: {
            type: DataTypes.STRING,
         },
         address: {
            type: DataTypes.STRING,
         },
         roll: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
         },
      },
      {
         underscored: true,
      }
   );

   User.associate = (models) => {
      User.hasMany(models.Order, {
         foreignKey: {
            name: "userId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
      User.hasMany(models.CartProduct, {
         foreignKey: {
            name: "userId",
            allowNull: false,
         },
         onUpdate: "RESTRICT",
         onDelete: "RESTRICT",
      });
   };
   return User;
};
