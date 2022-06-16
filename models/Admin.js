module.exports = (sequelize, DataTypes) => {
   const Admin = sequelize.define(
      "Admin",
      {
         username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
      },
      {
         underscored: true,
      }
   );
   return Admin;
};
